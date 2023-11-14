import { SupportedChainId } from 'test-cow-v2'

export enum Chain {
  Ethereum = 'ETHEREUM',
  LightlinkPegasusTestnet = 'LIGHTLINK_PEGASUS_TESTNET',
  LightlinkPhoenixMainnet = 'LIGHTLINK_PHOENIX_MAINNET',
}

const GQL_CHAINS: number[] = [
  // SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
  // SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
]

export const CHAIN_ID_TO_BACKEND_NAME: { [key: number]: Chain } = {
  //Changes
  [SupportedChainId.LIGHTLINK_PEGASUS_TESTNET]: Chain.LightlinkPegasusTestnet,
  [SupportedChainId.LIGHTLINK_PHOENIX_MAINNET]: Chain.LightlinkPhoenixMainnet,
}
export function chainIdToBackendName(chainId: number | undefined) {
  return chainId && CHAIN_ID_TO_BACKEND_NAME[chainId]
    ? CHAIN_ID_TO_BACKEND_NAME[chainId]
    : CHAIN_ID_TO_BACKEND_NAME[SupportedChainId.MAINNET]
}

export function isGqlSupportedChain(chainId: number | undefined): chainId is SupportedChainId {
  return !!chainId && GQL_CHAINS.includes(chainId)
}


export const CHAIN_NAME_TO_CHAIN_ID: { [key in Chain]: SupportedChainId } = {
  [Chain.Ethereum]: SupportedChainId.MAINNET,

  //change
  [Chain.LightlinkPegasusTestnet]: SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
  [Chain.LightlinkPhoenixMainnet]: SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
}
//Elektrikv2Changed
