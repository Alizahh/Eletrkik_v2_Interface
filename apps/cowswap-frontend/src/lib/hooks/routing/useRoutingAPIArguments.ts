import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { GetQuoteArgs, INTERNAL_ROUTER_PREFERENCE_PRICE, RouterPreference } from 'legacy/state/routing/slice'
import { currencyAddressForSwapQuote } from 'legacy/state/routing/utils'
import { useMemo } from 'react'


export function useRoutingAPIArguments({
  tokenIn,
  tokenOut,
  amount,
  tradeType,
  routerPreference,
}: {
  tokenIn?: Currency
  tokenOut?: Currency
  amount?: CurrencyAmount<Currency>
  tradeType: TradeType
  routerPreference: RouterPreference | typeof INTERNAL_ROUTER_PREFERENCE_PRICE
}): GetQuoteArgs | undefined {
  return useMemo(
    () =>
      !tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut) || tokenIn.wrapped.equals(tokenOut.wrapped)
        ? undefined
        : {
            amount: amount.quotient.toString(),
            tokenInAddress: currencyAddressForSwapQuote(tokenIn),
            tokenInChainId: tokenIn.wrapped.chainId,
            tokenInDecimals: tokenIn.wrapped.decimals,
            tokenInSymbol: tokenIn.wrapped.symbol,
            tokenOutAddress: currencyAddressForSwapQuote(tokenOut),
            tokenOutChainId: tokenOut.wrapped.chainId,
            tokenOutDecimals: tokenOut.wrapped.decimals,
            tokenOutSymbol: tokenOut.wrapped.symbol,
            routerPreference,
            tradeType,
          },
    [amount, routerPreference, tokenIn, tokenOut, tradeType]
  )
}
