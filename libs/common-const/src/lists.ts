import { SupportedChainId as ChainId } from 'test-cow-v2'

import { RAW_CODE_LINK } from './common'

export type NetworkLists = {
  [chain in ChainId]: string[]
}

//Elektrikv2Changed
const COW_DAO_LIST = 'https://files.cow.fi/tokens/CowSwap.json'
const COW_COINGECKO_LIST = 'https://files.cow.fi/tokens/CoinGecko.json'

const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
const AAVE_LIST = 'tokenlist.aave.eth'
const SYNTHETIX_LIST = 'synths.snx.eth'
const WRAPPED_LIST = 'wrapped.tokensoft.eth'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
const OPYN_LIST = 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-squeeth-tokenlist.json'
const ROLL_LIST = 'https://app.tryroll.com/tokens.json'
// const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const CMC_ALL_LIST = 'defi.cmc.eth'
const CMC_STABLECOIN = 'stablecoin.cmc.eth'
const KLEROS_LIST = 't2crtokens.eth'
const BA_LIST = ''

// Goerli Default
const GOERLI_LIST = RAW_CODE_LINK + '/develop/apps/cowswap-frontend/src/tokens/goerli-token-list.json'

// XDAI Default
const HONEY_SWAP_XDAI = 'https://tokens.honeyswap.org'
export const LIGHTLINK_PEGASUS_LIST = 'https://ipfs.io/ipfs/QmPe2bcHw93cSFg5ogdGBakK6yBBgREd6hmr594dphz2Pe/'
export const LIGHTLINK_PHOENIX_LIST = 'https://ipfs.io/ipfs/QmdtsuxFmKNV6sKqgvLNGpjViz5FwpZjV7zTfAQhFa1upk/'

export const UNSUPPORTED_LIST_URLS: NetworkLists = {
  [ChainId.MAINNET]: [BA_LIST],
  [ChainId.GOERLI]: [BA_LIST],
  [ChainId.GNOSIS_CHAIN]: [BA_LIST],
  [ChainId.LIGHTLINK_PHOENIX_MAINNET]: [BA_LIST],
  [ChainId.LIGHTLINK_PEGASUS_TESTNET]: [BA_LIST],
}

function buildNetworkDefaultLists({ networkLists, chainId }: { chainId: ChainId; networkLists: string[] }) {
  // need to add unsupported lists as well
  return [...UNSUPPORTED_LIST_URLS[chainId], ...networkLists]
}

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS_BY_NETWORK: NetworkLists = {
  [ChainId.MAINNET]: buildNetworkDefaultLists({
    chainId: ChainId.MAINNET,
    networkLists: [],
  }),
  [ChainId.GOERLI]: buildNetworkDefaultLists({
    chainId: ChainId.GOERLI,
    networkLists: [LIGHTLINK_PHOENIX_LIST],
  }),
  [ChainId.GNOSIS_CHAIN]: buildNetworkDefaultLists({
    chainId: ChainId.GNOSIS_CHAIN,
    networkLists: [LIGHTLINK_PHOENIX_LIST],
  }),
  [ChainId.LIGHTLINK_PHOENIX_MAINNET]: buildNetworkDefaultLists({
    chainId: ChainId.LIGHTLINK_PHOENIX_MAINNET,
    networkLists: [LIGHTLINK_PHOENIX_LIST],
  }),
  [ChainId.LIGHTLINK_PEGASUS_TESTNET]: buildNetworkDefaultLists({
    chainId: ChainId.LIGHTLINK_PEGASUS_TESTNET,
    networkLists: [LIGHTLINK_PHOENIX_LIST],
  }),
}
//Elektrikv2Changed

export const DEFAULT_ACTIVE_LIST_URLS: string[] = [LIGHTLINK_PEGASUS_LIST, LIGHTLINK_PHOENIX_LIST]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS_BY_NETWORK: NetworkLists = {
  [ChainId.MAINNET]: [LIGHTLINK_PHOENIX_LIST],
  [ChainId.GNOSIS_CHAIN]: [LIGHTLINK_PHOENIX_LIST],
  [ChainId.GOERLI]: [LIGHTLINK_PHOENIX_LIST],
  [ChainId.LIGHTLINK_PHOENIX_MAINNET]: [LIGHTLINK_PHOENIX_LIST],

  [ChainId.LIGHTLINK_PEGASUS_TESTNET]: [LIGHTLINK_PHOENIX_LIST],
}

// Set what we want as the default list when no chain id available: default = MAINNET
export const DEFAULT_NETWORK_FOR_LISTS = ChainId.MAINNET
