import { Currency, CurrencyAmount, Price, Token, TradeType } from '@uniswap/sdk-core'
import { SupportedChainId } from 'common/constants/chains'
import { useMemo, useRef } from 'react'
import {
  BRIDGED_USDC_ARBITRUM,
  CUSD_CELO,
  DAI_OPTIMISM,
  USDC_MAINNET,
  USDC_POLYGON,
  USDT_BSC,
} from '../../../../../../libs/common-const/src/tokens'


export const INTERNAL_ROUTER_PREFERENCE_PRICE = "price" as const;

const STABLECOIN_AMOUNT_OUT: { [chainId: number]: CurrencyAmount<Token> } = {
  [SupportedChainId.MAINNET]: CurrencyAmount.fromRawAmount(USDC_MAINNET, 100_000e6),
  [SupportedChainId.ARBITRUM_ONE]: CurrencyAmount.fromRawAmount(BRIDGED_USDC_ARBITRUM, 10_000e6),
  [SupportedChainId.OPTIMISM]: CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 10_000e18),
  [SupportedChainId.POLYGON]: CurrencyAmount.fromRawAmount(USDC_POLYGON, 10_000e6),
  [SupportedChainId.CELO]: CurrencyAmount.fromRawAmount(CUSD_CELO, 10_000e18),
  [SupportedChainId.BNB]: CurrencyAmount.fromRawAmount(USDT_BSC, 100e18),
}

export default function useStablecoinPrice(currency?: Currency): Price<Currency, Token> | undefined {
  const chainId = currency?.chainId
  const amountOut = chainId ? STABLECOIN_AMOUNT_OUT[chainId] : undefined
  const stablecoin = amountOut?.currency
  const { trade } = useRoutingAPITrade(TradeType.EXACT_OUTPUT, amountOut, currency, INTERNAL_ROUTER_PREFERENCE_PRICE)
  const price = useMemo(() => {
    if (!currency || !stablecoin) {
      return undefined
    }
    // handle usdc
    if (currency?.wrapped.equals(stablecoin)) {
      return new Price(stablecoin, stablecoin, '1', '1')
    }
    if (trade) {
      const { numerator, denominator } = trade.routes[0].midPrice
      return new Price(currency, stablecoin, denominator, numerator)
    }
    return undefined
  }, [currency, stablecoin, trade])
  const lastPrice = useRef(price)
  if (
    !price ||
    !lastPrice.current ||
    !price.equalTo(lastPrice.current) ||
    !price.baseCurrency.equals(lastPrice.current.baseCurrency)
  ) {
    lastPrice.current = price
  }
  return lastPrice.current
}

export function useStablecoinValue(currencyAmount: CurrencyAmount<Currency> | undefined | null) {
  const price = useStablecoinPrice(currencyAmount?.currency)

  return useMemo(() => {
    if (!price || !currencyAmount) return null
    try {
      return price.quote(currencyAmount)
    } catch (error) {
      return null
    }
  }, [currencyAmount, price])
}
