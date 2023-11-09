import { SupportedChainId } from 'test-cow-v2'

const chainNameToIdMap: { [key: string]: SupportedChainId } = {
  mainnet: SupportedChainId.MAINNET,
  gnosis_chain: SupportedChainId.GNOSIS_CHAIN,
  goerli: SupportedChainId.GOERLI,
  pegasus: SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
  phoenix: SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
}

export function getCurrentChainIdFromUrl(): SupportedChainId {
  // Trying to get chainId from URL (#/100/swap)
  // eslint-disable-next-line no-restricted-globals
  const { location } = window
  const urlChainIdMatch = location.hash.match(/^#\/(\d{1,9})\D/)
  const searchParams = new URLSearchParams(location.hash.split('?')[1])
  const chainQueryParam = searchParams.get('chain')

  const chainId = +(urlChainIdMatch?.[1] || chainNameToIdMap[chainQueryParam || ''] || '')

  if (chainId && chainId in SupportedChainId) return chainId

  return SupportedChainId.MAINNET
}
