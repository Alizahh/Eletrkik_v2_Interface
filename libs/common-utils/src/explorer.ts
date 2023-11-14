import { SupportedChainId as ChainId, UID } from 'test-cow-v2'

import { isLocal, isDev, isPr, isStaging, isBarn } from './environments'

//Elektrikv2Changed
function _getExplorerUrlByEnvironment() {
  let baseUrl: string | undefined
  if (isLocal || isDev || isPr) {
    baseUrl = process.env.REACT_APP_EXPLORER_URL_DEV || 'https://analytics.elektrik.network/#/'
  } else if (isStaging) {
    baseUrl = process.env.REACT_APP_EXPLORER_URL_STAGING || 'https://analytics.elektrik.network/#/'
  } else if (isBarn) {
    baseUrl = process.env.REACT_APP_EXPLORER_URL_BARN || 'https://analytics.elektrik.network/#/'
  } else {
    // Production by default
    baseUrl = process.env.REACT_APP_EXPLORER_URL_PROD || 'https://analytics.elektrik.network/#/'
  }

  return {
    [ChainId.MAINNET]: baseUrl,
    [ChainId.GOERLI]: `${baseUrl}/goerli`,
    [ChainId.GNOSIS_CHAIN]: `${baseUrl}/gc`,
    //ElektrikV2Changed
    [ChainId.LIGHTLINK_PEGASUS_TESTNET]: '',
    [ChainId.LIGHTLINK_PHOENIX_MAINNET]: '',
  }
}

const EXPLORER_BASE_URL: Partial<Record<ChainId, string>> = _getExplorerUrlByEnvironment()

export function getExplorerBaseUrl(chainId: ChainId): string {
  const baseUrl = EXPLORER_BASE_URL[chainId]

  if (!baseUrl) {
    throw new Error('Unsupported Network. The operator API is not deployed in the Network ' + chainId)
  } else {
    return baseUrl
  }
}

export function getExplorerOrderLink(chainId: ChainId, orderId: UID): string {
  const baseUrl = getExplorerBaseUrl(chainId)

  return baseUrl + `/orders/${orderId}`
}

export function getExplorerAddressLink(chainId: ChainId, address: string): string {
  const baseUrl = getExplorerBaseUrl(chainId)

  return baseUrl + `/address/${address}`
}

enum Explorers {
  Explorer = 'Explorer',
  Blockscout = 'Blockscout',
  Etherscan = 'Etherscan',
}

// Used for GA ExternalLink detection
export function detectExplorer(href: string) {
  if (href.includes('explorer')) {
    return Explorers.Explorer
  } else if (href.includes('blockscout')) {
    return Explorers.Blockscout
  } else if (href.includes('etherscan')) {
    return Explorers.Etherscan
  } else {
    return undefined
  }
}
