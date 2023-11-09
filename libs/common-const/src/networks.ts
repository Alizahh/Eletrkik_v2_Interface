import { SupportedChainId } from 'test-cow-v2'
import { JsonRpcProvider } from '@ethersproject/providers'
import { SupportedChainId as SChainId } from '../../../apps/cowswap-frontend/src/common/constants/chains'

const QUICKNODE_RPC_URL = process.env.REACT_APP_BNB_RPC_URL
if (typeof QUICKNODE_RPC_URL === 'undefined') {
  throw new Error(`REACT_APP_BNB_RPC_URL must be a defined environment variable`)
}

//ELektrikV2Changed
function initRpcUrls(): Record<SupportedChainId, string> {
  const REACT_APP_INFURA_KEY = process.env.REACT_APP_INFURA_KEY
  const REACT_APP_NETWORK_URL_1 = process.env.REACT_APP_NETWORK_URL_1
  const REACT_APP_NETWORK_URL_5 = process.env.REACT_APP_NETWORK_URL_5
  const REACT_APP_NETWORK_URL_100 = process.env.REACT_APP_NETWORK_URL_100
  const REACT_APP_NETWORK_URL_1890 = process.env.REACT_APP_NETWORK_URL_1890
  const REACT_APP_NETWORK_URL_1891 = process.env.REACT_APP_NETWORK_URL_1891

  if (
    !REACT_APP_INFURA_KEY &&
    !(
      REACT_APP_NETWORK_URL_1 &&
      REACT_APP_NETWORK_URL_5 &&
      REACT_APP_NETWORK_URL_100 &&
      REACT_APP_NETWORK_URL_1890 &&
      REACT_APP_NETWORK_URL_1891
    )
  ) {
    throw new Error(
      `Either REACT_APP_INFURA_KEY or REACT_APP_NETWORK_URL_{1,5,100,1890,1891} environment variables must be defined`
    )
  }

  return {
    [SupportedChainId.MAINNET]: REACT_APP_NETWORK_URL_1 || `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.GNOSIS_CHAIN]: REACT_APP_NETWORK_URL_100 || `https://rpc.gnosis.gateway.fm`,
    [SupportedChainId.GOERLI]: REACT_APP_NETWORK_URL_5 || `https://goerli.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.LIGHTLINK_PHOENIX_MAINNET]:
      REACT_APP_NETWORK_URL_1890 ||
      `https://replicator.phoenix.lightlink.io/rpc/v1/elektrik-1b2218236b172e6b9ead3069735102f3`,
    [SupportedChainId.LIGHTLINK_PEGASUS_TESTNET]:
      REACT_APP_NETWORK_URL_1891 ||
      `https://replicator-03.pegasus.lightlink.io/rpc/v1/elektrik-1b2218236b172e6b9ead3069735102f3`,
  }
}

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const RPC_URLS = initRpcUrls()
export const MAINNET_PROVIDER = new JsonRpcProvider(RPC_URLS[SupportedChainId.MAINNET])

export const FALLBACK_URLS = {
  [SChainId.MAINNET]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  [SChainId.GOERLI]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli',
  ],
  [SChainId.SEPOLIA]: [
    // "Safe" URLs
    'https://rpc.sepolia.dev/',
    // "Fallback" URLs
    'https://rpc.sepolia.org/',
    'https://rpc2.sepolia.org/',
    'https://rpc.sepolia.online/',
    'https://www.sepoliarpc.space/',
    'https://rpc-sepolia.rockx.com/',
    'https://rpc.bordel.wtf/sepolia',
  ],
  [SChainId.POLYGON]: [
    // "Safe" URLs
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
  ],
  [SChainId.POLYGON_MUMBAI]: [
    // "Safe" URLs
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com',
  ],
  [SChainId.ARBITRUM_ONE]: [
    // "Safe" URLs
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com',
  ],
  [SChainId.ARBITRUM_GOERLI]: [
    // "Safe" URLs
    'https://goerli-rollup.arbitrum.io/rpc',
  ],
  [SChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism',
  ],
  [SChainId.OPTIMISM_GOERLI]: [
    // "Safe" URLs
    'https://goerli.optimism.io',
  ],
  [SChainId.CELO]: [
    // "Safe" URLs
    `https://forno.celo.org`,
  ],
  [SChainId.CELO_ALFAJORES]: [
    // "Safe" URLs
    `https://alfajores-forno.celo-testnet.org`,
  ],
  [SChainId.BNB]: [
    // "Safe" URLs
    'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
    'https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d',
    'https://1rpc.io/bnb',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://binance.nodereal.io',
    'https://bsc-dataseed4.defibit.io',
    'https://rpc.ankr.com/bsc',
  ],
  [SChainId.LIGHTLINK_PEGASUS_TESTNET]: [
    // "Safe" URLs
    `https://replicator-01.pegasus.lightlink.io/rpc/v1`,
    `https://replicator-02.pegasus.lightlink.io/rpc/v1`,
    `https://replicator-03.pegasus.lightlink.io/rpc/v1`,
  ],
  [SChainId.LIGHTLINK_PHOENIX_MAINNET]: [
    // "Safe" URLs
    `https://replicator-01.phoenix.lightlink.io/rpc/v1`,
    `https://replicator-02.phoenix.lightlink.io/rpc/v1`,
  ],
}
export const RPC_URLS_DEPRECATED = {
  [SChainId.MAINNET]: [`https://mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SChainId.MAINNET]],
  [SChainId.GOERLI]: [`https://goerli.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SChainId.GOERLI]],
  [SChainId.SEPOLIA]: [`https://sepolia.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SChainId.SEPOLIA]],
  [SChainId.OPTIMISM]: [`https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SChainId.OPTIMISM]],
  [SChainId.OPTIMISM_GOERLI]: [
    `https://optimism-goerli.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SChainId.OPTIMISM_GOERLI],
  ],
  [SChainId.ARBITRUM_ONE]: [
    `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SChainId.ARBITRUM_ONE],
  ],
  [SChainId.ARBITRUM_GOERLI]: [
    `https://arbitrum-goerli.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SChainId.ARBITRUM_GOERLI],
  ],
  [SChainId.POLYGON]: [`https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SChainId.POLYGON]],
  [SChainId.POLYGON_MUMBAI]: [
    `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    ...FALLBACK_URLS[SChainId.POLYGON_MUMBAI],
  ],
  [SChainId.CELO]: FALLBACK_URLS[SChainId.CELO],
  [SChainId.CELO_ALFAJORES]: FALLBACK_URLS[SChainId.CELO_ALFAJORES],
  [SChainId.BNB]: [QUICKNODE_RPC_URL, ...FALLBACK_URLS[SChainId.BNB]],
  //Changes
  [SChainId.LIGHTLINK_PEGASUS_TESTNET]: [
    `https://replicator-03.pegasus.lightlink.io/rpc/v1/elektrik-1b2218236b172e6b9ead3069735102f3`,
    ...FALLBACK_URLS[SChainId.LIGHTLINK_PEGASUS_TESTNET],
  ],
  [SChainId.LIGHTLINK_PHOENIX_MAINNET]: [
    `https://replicator.phoenix.lightlink.io/rpc/v1/elektrik-1b2218236b172e6b9ead3069735102f3`,
    ...FALLBACK_URLS[SChainId.LIGHTLINK_PHOENIX_MAINNET],
  ],
}
