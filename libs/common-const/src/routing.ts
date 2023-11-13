// a list of tokens by chain

import { SupportedChainId } from 'test-cow-v2'
import { Currency } from '@uniswap/sdk-core'

import {
  COW,
  DAI,
  EURE_GNOSIS_CHAIN,
  USDC_MAINNET,
  USDT,
  WBTC,
  WRAPPED_NATIVE_CURRENCY,
  LIGHTLINK_PHOENIX_MAINNET,
  LIGHTLINK_PEGASUS_TESTNET,
  USDC_PHOENIX,
  DAI_PHOENIX,
  UNI_PHOENIX,
  USDT_PHOENIX,
  WBTC_PHOENIX,
  ARB_PHOENIX,
  MATIC_PHOENIX,
  USDC_PEGASUS,
  DAI_PEGASUS,
  UNI_PEGASUS,
  USDT_PEGASUS,
  WBTC_PEGASUS,
  OP_PEGASUS,
  ARB_PEGASUS,
  MATIC_PEGASUS,
  WRAPPED_NATIVE_CURRENCIES_ONLY,
} from './tokens'

import { USDC_GNOSIS_CHAIN, WBTC_GNOSIS_CHAIN, WETH_GNOSIS_CHAIN } from './gnosis_chain/constants'
import { DAI_GOERLI, USDC_GOERLI } from './goerli/constants'

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

/**
 * Shows up in the currency select for swap and add liquidity
 */

//Elektrikv2Changed
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.MAINNET]: [
    DAI,
    COW[SupportedChainId.MAINNET],
    USDC_MAINNET,
    USDT,
    WBTC,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET],
  ],
  [SupportedChainId.GOERLI]: [
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.GOERLI],
    COW[SupportedChainId.GOERLI],
    DAI_GOERLI,
    USDC_GOERLI,
  ],
  [SupportedChainId.GNOSIS_CHAIN]: [
    USDC_GNOSIS_CHAIN,
    COW[SupportedChainId.GNOSIS_CHAIN],
    EURE_GNOSIS_CHAIN,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.GNOSIS_CHAIN],
    WETH_GNOSIS_CHAIN,
    WBTC_GNOSIS_CHAIN,
  ],
  [SupportedChainId.LIGHTLINK_PHOENIX_MAINNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.LIGHTLINK_PHOENIX_MAINNET],
    USDC_PHOENIX,
    DAI_PHOENIX,
    UNI_PHOENIX,
    USDT_PHOENIX,
    WBTC_PHOENIX,
    ARB_PHOENIX,
    MATIC_PHOENIX,
  ],
  [SupportedChainId.LIGHTLINK_PEGASUS_TESTNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.LIGHTLINK_PEGASUS_TESTNET],
    USDC_PEGASUS,
    DAI_PEGASUS,
    UNI_PEGASUS,
    USDT_PEGASUS,
    WBTC_PEGASUS,
    OP_PEGASUS,
    ARB_PEGASUS,
    MATIC_PEGASUS,
  ],
}
