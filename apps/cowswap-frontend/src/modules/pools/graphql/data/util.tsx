import { SupportedChainId } from "common/constants/chains";

const GQL_CHAINS: number[] = [
    SupportedChainId.MAINNET,
    SupportedChainId.OPTIMISM,
    SupportedChainId.POLYGON,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.CELO,
    SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
  ]

  export function isGqlSupportedChain(chainId: number | undefined): chainId is SupportedChainId {
    return !!chainId && GQL_CHAINS.includes(chainId)
  }