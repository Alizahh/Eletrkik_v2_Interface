import { IMetric, MetricLoggerUnit, setGlobalMetric } from '@aaran1337/smart-order-router-test'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { AVERAGE_L1_BLOCK_TIME } from '../../../../../../libs/common-const/src/chainInfo'
import ms from 'ms.macro'
import { useMemo } from 'react'

import { InterfaceTrade, QuoteState, TradeState } from './types'
import { useRoutingAPIArguments } from 'lib/hooks/routing/useRoutingAPIArguments'
import { INTERNAL_ROUTER_PREFERENCE_PRICE, RouterPreference, useGetQuoteQuery } from './slice'

const TRADE_INVALID = { state: TradeState.INVALID, trade: undefined } as const
const TRADE_NOT_FOUND = { state: TradeState.NO_ROUTE_FOUND, trade: undefined } as const
const TRADE_LOADING = { state: TradeState.LOADING, trade: undefined } as const

export function useRoutingAPIV2Enabled(): boolean {
  return false;
}

export function useRoutingAPITrade<TTradeType extends TradeType>(
  tradeType: TTradeType,
  amountSpecified: CurrencyAmount<Currency> | undefined,
  otherCurrency: Currency | undefined,
  routerPreference: RouterPreference | typeof INTERNAL_ROUTER_PREFERENCE_PRICE
): {
  state: TradeState
  trade?: InterfaceTrade
} {
  const [currencyIn, currencyOut]: [Currency | undefined, Currency | undefined] = useMemo(
    () =>
      tradeType === TradeType.EXACT_INPUT
        ? [amountSpecified?.currency, otherCurrency]
        : [otherCurrency, amountSpecified?.currency],
    [amountSpecified, otherCurrency, tradeType]
  )

  const queryArgs = useRoutingAPIArguments({
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    tradeType,
    routerPreference,
  })

  const shouldUseRoutingApiV2 = useRoutingAPIV2Enabled()

  const {
    isError: isLegacyAPIError,
    data: legacyAPITradeResult,
    currentData: currentLegacyAPITradeResult,
  } = useGetQuoteQuery(shouldUseRoutingApiV2 ? skipToken : queryArgs ?? skipToken, {
    pollingInterval: routerPreference === INTERNAL_ROUTER_PREFERENCE_PRICE ? ms`1m` : AVERAGE_L1_BLOCK_TIME,
    refetchOnMountOrArgChange: 2 * 60,
  })



  const [tradeResult, currentTradeResult, isError] =
 
    [legacyAPITradeResult, currentLegacyAPITradeResult, isLegacyAPIError]

  const isCurrent = currentTradeResult === tradeResult

  return useMemo(() => {
    if (!amountSpecified || isError || !queryArgs) {
      return TRADE_INVALID
    } else if (tradeResult?.state === QuoteState.NOT_FOUND && isCurrent) {
      return TRADE_NOT_FOUND
    } else if (!tradeResult?.trade) {
      return TRADE_LOADING
    } else {
      return {
        state: isCurrent ? TradeState.VALID : TradeState.LOADING,
        trade: tradeResult.trade,
      }
    }
  }, [amountSpecified, isCurrent, isError, queryArgs, tradeResult])
}

class GAMetric extends IMetric {
  putDimensions() {
    return
  }

  putMetric(key: string, value: number, unit?: MetricLoggerUnit) {}

  setProperty() {
    return
  }
}

setGlobalMetric(new GAMetric())
