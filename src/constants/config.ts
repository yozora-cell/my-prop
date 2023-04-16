import { MetamaskConnector, CoinbaseWalletConnector, BSC, BSCTestnet, Mainnet } from "@usedapp/core"

export const BASE_URL = ""

export const CONTRACT_ADDRESS = ""

export const DAPP_CONFIG = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: process.env.REACT_APP_PROVIDER_TEST,
    [BSC.chainId]: process.env.REACT_APP_PROVIDER_MAINNET,
    [Mainnet.chainId]: "https://eth-mainnet.g.alchemy.com/v2/rbeUGLWOu1aehsuKbaNw_yhVKFXXdwbp",
  },
  metamask: new MetamaskConnector(),
  coinbase: new CoinbaseWalletConnector(),
}
