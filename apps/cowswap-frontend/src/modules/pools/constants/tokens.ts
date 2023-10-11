import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import { SupportedChainId } from 'common/constants/chains'
import invariant from 'tiny-invariant'
export const NATIVE_CHAIN_ID = 'NATIVE'

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
export const DEFAULT_ERC20_DECIMALS = 18
export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
    ...(WETH9 as Record<SupportedChainId, Token>),
    [SupportedChainId.OPTIMISM]: new Token(
      SupportedChainId.OPTIMISM,
      '0x4200000000000000000000000000000000000006',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [SupportedChainId.OPTIMISM_GOERLI]: new Token(
      SupportedChainId.OPTIMISM_GOERLI,
      '0x4200000000000000000000000000000000000006',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [SupportedChainId.ARBITRUM_ONE]: new Token(
      SupportedChainId.ARBITRUM_ONE,
      '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [SupportedChainId.ARBITRUM_GOERLI]: new Token(
      SupportedChainId.ARBITRUM_GOERLI,
      '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [SupportedChainId.SEPOLIA]: new Token(
      SupportedChainId.SEPOLIA,
      '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    [SupportedChainId.POLYGON]: new Token(
      SupportedChainId.POLYGON,
      '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      18,
      'WMATIC',
      'Wrapped MATIC'
    ),
    [SupportedChainId.POLYGON_MUMBAI]: new Token(
      SupportedChainId.POLYGON_MUMBAI,
      '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      18,
      'WMATIC',
      'Wrapped MATIC'
    ),
    [SupportedChainId.CELO]: new Token(
      SupportedChainId.CELO,
      '0x471ece3750da237f93b8e339c536989b8978a438',
      18,
      'CELO',
      'Celo native asset'
    ),
    [SupportedChainId.CELO_ALFAJORES]: new Token(
      SupportedChainId.CELO_ALFAJORES,
      '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
      18,
      'CELO',
      'Celo native asset'
    ),
    [SupportedChainId.BNB]: new Token(
      SupportedChainId.BNB,
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      18,
      'WBNB',
      'Wrapped BNB'
    ),
    //changes
    [SupportedChainId.LIGHTLINK_PEGASUS_TESTNET]: new Token(
      SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
      '0xF42991f02C07AB66cFEa282E7E482382aEB85461',
      18,
      'WETH',
      'Wrapped Ether'
    ),
    //TODO verify
    [SupportedChainId.LIGHTLINK_PHOENIX_MAINNET]: new Token(
      SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
      '0x7EbeF2A4b1B09381Ec5B9dF8C5c6f2dBECA59c73',
      18,
      'WETH',
      'Wrapped Ether'
    ),
  }