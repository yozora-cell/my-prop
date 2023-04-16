import { useEffect, useState, useCallback } from "react";
import {
  openSemaphoreSignaturePopup,
  usePassportPopupMessages,
} from "./PassportPopup2";
import { PASSPORT_URL } from "../constants/constants";
import PopModal from "./PopModal";

interface IAppProps {
}

export function usePassportPopupSetup() {
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

    if (paramsProofUrl != null) {
      window.location.href = decodeURIComponent(paramsProofUrl);
    } else if (paramsProof != null) {
      window.opener.postMessage({ encodedPCD: paramsProof }, "*");
      window.close();
    } else if (paramsEncodingPendingPCD != null) {
      window.opener.postMessage(
        { encodedPendingPCD: paramsEncodingPendingPCD },
        "*"
      );
      window.close();
    }
  }, []);

  return error;
}

const WalletButton: React.FunctionComponent<IAppProps> = (props) => {

  const [rendered] = useState("");
  const [messageToSign] = useState<string>(
    `I want to authenticate with zupass.org.`
  );
  const [serverProving] = useState(false);

  const result = usePassportPopupSetup();
  const [pcdStr, pendingPCDStr] = usePassportPopupMessages();
  const [claim, setClaim] = useState<string>("");
  const [proof, setProof] = useState<string[]>([]);
  useEffect(() => {
    if (pcdStr) {
      const pcd = JSON.parse(pcdStr);
      const pcdData = JSON.parse(pcd.pcd);
      setClaim(pcdData.claim.signedMessage);
      setProof(pcdData.proof);
      setShowModal(
        !!pcdData.claim.signedMessage && !!pcd.proof && pcdData.proof.length > 0
      );
    }
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
          openSemaphoreSignaturePopup(
            PASSPORT_URL,
            window.location.origin,
            messageToSign,
            serverProving
          );
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
