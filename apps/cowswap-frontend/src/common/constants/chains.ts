export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
  SEPOLIA = 11155111,

  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,

  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,

  CELO = 42220,
  CELO_ALFAJORES = 44787,

  BNB = 56,
  //changes
  LIGHTLINK_PHOENIX_MAINNET = 1890,
  LIGHTLINK_PEGASUS_TESTNET = 1891,
}
export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.GOERLI,
  SupportedChainId.SEPOLIA,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.CELO,
  SupportedChainId.CELO_ALFAJORES,
  SupportedChainId.BNB,
] as const
export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]
export const L2_CHAIN_IDS = [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_GOERLI,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISM_GOERLI,
  //Change
  SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
  SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

export function isSupportedChain(chainId: number | null | undefined): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId]
}