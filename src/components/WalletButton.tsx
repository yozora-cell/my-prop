import { useEffect, useState, useImperativeHandle, useCallback } from "react";
import { shortenAddress, useEthers } from "@usedapp/core";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import React from "react";
import { notification } from "./Notiofication";
import { ethers } from "ethers";
import {
  openSemaphoreSignaturePopup,
  usePassportPopupMessages,
} from "./PassportPopup2";
import { PASSPORT_URL } from "../constants/constants";
import PopModal from "./PopModal";

interface IAppProps {
  clearData: () => void;
  onRef: any;
  provider: ethers.providers.Web3Provider;
}

export function usePassportPopupSetup() {
  // Usually this page redirects immediately. If not, show an error.
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.opener == null) {
      setError("Not a popup window");
      return;
    }

    const search = window.location.search;
    const params = new URLSearchParams(search);

    const paramsProofUrl = params.get("proofUrl");
    const paramsProof = params.get("proof");
    const paramsEncodingPendingPCD = params.get("encodedPendingPCD");

    // First, this page is window.open()-ed. Redirect to the Passport app.
    console.log("paramsProofUrl", paramsProofUrl)
    console.log("paramsProof", paramsProof)
    console.log("paramsEncodingPendingPCD", paramsEncodingPendingPCD)
    if (paramsProofUrl != null) {
      console.log("paramsProofUrl", paramsProofUrl)
      window.location.href = decodeURIComponent(paramsProofUrl);
    } else if (paramsProof != null) {
      // Later, the Passport redirects back with a proof. Send it to our parent.
      window.opener.postMessage({ encodedPCD: paramsProof }, "*");
      window.close();
    } else if (paramsEncodingPendingPCD != null) {
      // Later, the Passport redirects back with a encodedPendingPCD. Send it to our parent.
      window.opener.postMessage(
        { encodedPendingPCD: paramsEncodingPendingPCD },
        "*"
      );
      window.close();
    }
  }, []);

  return error;
}

// @ts-ignore
let myWeb3Modal: Web3Modal = null;
const WalletButton: React.FunctionComponent<IAppProps> = (props) => {
  const { account, chainId } = useEthers();

  const [rendered, setRendered] = useState("");

  const { activate, deactivate } = useEthers();

  const { switchNetwork, error } = useEthers();

  const [switching, setSwitching] = useState(false);

  const [adding, setAdding] = useState(false);

  // const { ens } = useLookupAddress(account);

  useImperativeHandle(props.onRef, () => {
    return {
      handleConnect: activateProvider,
    };
  });

  useEffect(() => {
    if (error && account) {
      console.log(error);
      return;
    }
  }, [error, account]);

  useEffect(() => {
    if (account) {
      setRendered(shortenAddress(account));
      // if (ens) {
      //     setRendered(ens);
      // }
      props.provider
        .lookupAddress(account)
        .then((name: any) => {
          if (name) {
            setRendered(name);
          }
        })
        .catch((error: any) => {
          console.log(error);
          // setRendered(account);
        });
    } else {
      setRendered("");
    }
  }, [account, chainId, setRendered, props.provider]);

  // useEffect(() => {
  //     if (account && chainId !== 56) {
  //         if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  //             notification('Please switch to BSC network');
  //             return
  //         }
  //         if (!switching) {
  //             setSwitching(true);
  //             switchNetwork(56).catch(async switchError => {
  //                 console.log(switchError);
  //                 if (switchError.code === 4902 || (switchError.data && switchError.data.originalError.code === 4902)) {
  //                     if (!adding) {
  //                         setAdding(true);
  //                         const provider: any = await detectEthereumProvider()
  //                         await provider.request({
  //                             method: 'wallet_addEthereumChain',
  //                             params: [
  //                                 {
  //                                     chainId: 56,
  //                                     chainName: 'Binance Smart Chain',
  //                                     rpcUrls: [process.env.REACT_APP_PROVIDER_MAINNET],
  //                                 },
  //                             ],
  //                         }).then(() => {
  //                             notification('Add BSC network successfully');
  //                         })
  //                             .catch((e: any) => {
  //                                 console.log(e);
  //                                 notification('Add BSC network error. Please try again');
  //                             }).finally(() => {
  //                                 setAdding(false);
  //                             })
  //                     }
  //                 } else {
  //                     notification('Please switch to BSC network');
  //                 }
  //             }).finally(() => {
  //                 setSwitching(false);
  //             });
  //         }
  //     }
  // }, [account, chainId, switchNetwork]);

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // bridge: 'https://bridge.walletconnect.org',
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          },
          network: "binance",
          infuraId: "a18ede7fe1f943ed822265c659fda79d",
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: "binance",
      cacheProvider: false,
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      myWeb3Modal = web3Modal;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDisconnect = async () => {
    myWeb3Modal && (await myWeb3Modal.clearCachedProvider());
    localStorage.removeItem("walletconnect");
    deactivate();
    props.clearData();
  };

  const [messageToSign, setMessageToSign] = useState<string>(
    `I want to authenticate with zupass.org.`
    );
  const [serverProving, setServerProving] = useState(false);

  const result = usePassportPopupSetup();
  const [pcdStr, pendingPCDStr] = usePassportPopupMessages();
  const [claim, setClaim] = useState<string>("");
  const [proof, setProof] = useState<string[]>([]);
  useEffect(() => {
    if (!result) console.log("result is null");
    console.log("result", result);
    if (messageToSign) console.log("messageToSign", messageToSign);
    if (serverProving) console.log("serverProving", serverProving);
    if (pcdStr) {
      console.log("pcdStr", pcdStr);

      //解析json字符串
      const pcd = JSON.parse(pcdStr);
      //   console.log("pcd", pcd);

      const pcdData = JSON.parse(pcd.pcd);
      //   console.log("claimString", pcdData.claim);
      setClaim(pcdData.claim.signedMessage);

      //   console.log("proofString", pcdData.proof);
      setProof(pcdData.proof);
      setShowModal(
        !!pcdData.claim.signedMessage && !!pcd.proof && pcdData.proof.length > 0
      );
    }
    if (pendingPCDStr) console.log("pendingPCDStr", pendingPCDStr);
  }, [result, messageToSign, serverProving, pcdStr, pendingPCDStr]);

  const [showModal, setShowModal] = useState(false);
  const changeInfoModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (claim && proof && proof.length > 0) {
      console.log("claim", claim);
      console.log("proof", proof);
      setShowModal(true);
    }
  }, [claim, proof])
  return (
    <>
      <button
        onClick={useCallback(() => {
          // eslint-disable-next-line no-lone-blocks
          {
            if (!account) {
              openSemaphoreSignaturePopup(
                PASSPORT_URL,
                window.location.origin + "/popup",
                messageToSign,
                serverProving
              );
            } else {
              handleDisconnect();
            }
          }
        }, [messageToSign, serverProving])}
        className="w-full min-w-[5.125rem] lg:min-w-button bg-zuzalu order-0 border-2 flex justify-center items-center outline-none py-2 font-poppins font-bold text-sm lg:text-lg rounded-xl leading-[24px] hover:bg-gray-50 transition-all"
      >
        {rendered === "" && "ZUZALU PASS"}
        {rendered !== "" && rendered}
      </button>
      <PopModal
        showModal={showModal}
        changeInfoModal={changeInfoModal}
        claim={claim}
        proof={proof}
      />
    </>
  );
};

export default WalletButton;
