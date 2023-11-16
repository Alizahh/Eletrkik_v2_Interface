import bnbCircleLogoUrl from 'assets/images/bnbCircle.svg'
import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import lightlinkLogoUrl from 'assets/images/lightlink_logo.png'
import polygonCircleLogoUrl from 'assets/images/polygonCircle.png'
import { default as arbitrumCircleLogoUrl, default as arbitrumLogoUrl } from 'assets/svgs/arbitrum_logo.svg'
import bnbSquareLogoUrl from 'assets/svgs/bnb_square_logo.svg'
import bnbLogo from 'assets/svgs/bnb-logo.svg'
import celoLogo from 'assets/svgs/celo_logo.svg'
import celoSquareLogoUrl from 'assets/svgs/celo_square_logo.svg'
import optimismSquareLogoUrl from 'assets/svgs/optimism_square_logo.svg'
import optimismLogoUrl from 'assets/svgs/optimistic_ethereum.svg'
import polygonSquareLogoUrl from 'assets/svgs/polygon_square_logo.svg'
import polygonMaticLogo from 'assets/svgs/polygon-matic-logo.svg'
import ms from 'ms.macro'

import {
  ARBITRUM_LIST,
  CELO_LIST,
  LIGHTLINK_PEGASUS_LIST,
  LIGHTLINK_PHOENIX_LIST,
  OPTIMISM_LIST,
  PLASMA_BNB_LIST,
} from './lists'
import { SupportedChainId, SupportedL1ChainId, SupportedL2ChainId } from 'common/constants/chains'

export const AVERAGE_L1_BLOCK_TIME = ms`12s`

export enum NetworkType {
  L1,
  L2,
}
interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly circleLogoUrl?: string
  readonly squareLogoUrl?: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
  readonly color?: string
  readonly backgroundColor?: string
}

interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
  readonly defaultListUrl?: string
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

type ChainInfoMap = {
  readonly [chainId: number]: L1ChainInfo | L2ChainInfo
} & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#000',
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
    color: '#000',
  },
  [SupportedChainId.SEPOLIA]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://sepolia.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Sepolia',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'SepoliaETH',
      decimals: 18,
    },
    color: '#000',
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimism',
    logoUrl: optimismLogoUrl,
    // Optimism perfers same icon for both
    circleLogoUrl: optimismLogoUrl,
    squareLogoUrl: optimismSquareLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#000',
    backgroundColor: '#000',
  },
  [SupportedChainId.OPTIMISM_GOERLI]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://goerli-optimism.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimism Görli',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: {
      name: 'Optimism Goerli Ether',
      symbol: 'görOpETH',
      decimals: 18,
    },
    color: '#000',
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    circleLogoUrl: arbitrumCircleLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#000',
    backgroundColor: '#000',
  },
  [SupportedChainId.ARBITRUM_GOERLI]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge.arbitrum.io/',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://goerli.arbiscan.io/',
    infoLink: 'https://info.uniswap.org/#/arbitrum/',
    label: 'Arbitrum Goerli',
    logoUrl: arbitrumLogoUrl,
    defaultListUrl: ARBITRUM_LIST, // TODO: use arbitrum goerli token list
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
    nativeCurrency: {
      name: 'Goerli Arbitrum Ether',
      symbol: 'goerliArbETH',
      decimals: 18,
    },
    color: '#000',
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/polygon/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon',
    logoUrl: polygonMaticLogo,
    circleLogoUrl: polygonCircleLogoUrl,
    squareLogoUrl: polygonSquareLogoUrl,
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    color: '#000',
    backgroundColor: '#000',
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon Mumbai',
    logoUrl: polygonMaticLogo,
    nativeCurrency: {
      name: 'Polygon Mumbai Matic',
      symbol: 'mMATIC',
      decimals: 18,
    },
  },
  [SupportedChainId.CELO]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://www.portalbridge.com/#/transfer',
    docs: 'https://docs.celo.org/',
    explorer: 'https://celoscan.io/',
    infoLink: 'https://info.uniswap.org/#/celo/',
    label: 'Celo',
    logoUrl: celoLogo,
    circleLogoUrl: celoLogo,
    squareLogoUrl: celoSquareLogoUrl,
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    defaultListUrl: CELO_LIST,
  },
  [SupportedChainId.CELO_ALFAJORES]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://www.portalbridge.com/#/transfer',
    docs: 'https://docs.celo.org/',
    explorer: 'https://alfajores-blockscout.celo-testnet.org/',
    infoLink: 'https://info.uniswap.org/#/celo/',
    label: 'Celo Alfajores',
    logoUrl: celoLogo,
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    defaultListUrl: CELO_LIST,
  },
  [SupportedChainId.BNB]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://cbridge.celer.network/1/56',
    docs: 'https://docs.bnbchain.org/',
    explorer: 'https://bscscan.com/',
    infoLink: 'https://info.uniswap.org/#/bnb/',
    label: 'BNB Chain',
    logoUrl: bnbLogo,
    circleLogoUrl: bnbCircleLogoUrl,
    squareLogoUrl: bnbSquareLogoUrl,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    defaultListUrl: PLASMA_BNB_LIST,
    color: '#000',
    backgroundColor: '#000',
  },
  [SupportedChainId.LIGHTLINK_PHOENIX_MAINNET]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge-test.lightlink.io/bridge?typeBridge=deposit&tokenBridge=ETH',
    docs: 'https://docs.lightlink.io/',
    explorer: 'https://phoenix.lightlink.io/',
    infoLink: 'https://docs.lightlink.io/',
    label: 'Phoenix',
    logoUrl: lightlinkLogoUrl,
    circleLogoUrl: lightlinkLogoUrl,
    squareLogoUrl: lightlinkLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    defaultListUrl: LIGHTLINK_PEGASUS_LIST,
    color: '#000',
    backgroundColor: '#000',
  },
  [SupportedChainId.LIGHTLINK_PEGASUS_TESTNET]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://bridge-test.lightlink.io/bridge?typeBridge=deposit&tokenBridge=ETH',
    docs: 'https://docs.lightlink.io/',
    explorer: 'https://pegasus.lightlink.io',
    infoLink: 'https://docs.lightlink.io/',
    label: 'Pegasus',
    logoUrl: lightlinkLogoUrl,
    circleLogoUrl: lightlinkLogoUrl,
    squareLogoUrl: lightlinkLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    defaultListUrl: LIGHTLINK_PHOENIX_LIST,
    color: '#000',
    backgroundColor: '#000',
  },
}

export function getChainInfo(chainId: SupportedL1ChainId): L1ChainInfo
export function getChainInfo(chainId: SupportedL2ChainId): L2ChainInfo
export function getChainInfo(chainId: SupportedChainId): L1ChainInfo | L2ChainInfo
export function getChainInfo(
  chainId: SupportedChainId | SupportedL1ChainId | SupportedL2ChainId | number | undefined
): L1ChainInfo | L2ChainInfo | undefined

/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * SupportedChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
export function getChainInfo(chainId: any): any {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

const MAINNET_INFO = CHAIN_INFO[SupportedChainId.LIGHTLINK_PHOENIX_MAINNET]
export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? MAINNET_INFO
}