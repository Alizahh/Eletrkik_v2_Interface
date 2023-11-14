import { useAtomValue, useSetAtom } from 'jotai'
import { Currency, CurrencyAmount, Price, TradeType } from '@uniswap/sdk-core'
import { Token } from '@uniswap/sdk-core'

import { Nullish } from 'types'

import { useSafeEffect } from 'common/hooks/useSafeMemo'

import { addCurrencyToUsdPriceQueue, removeCurrencyToUsdPriceFromQueue } from '../state/usdRawPricesAtom'
import { usdTokenPricesAtom, UsdPriceState } from '../state/usdTokenPricesAtom'
import { NetworkStatus } from '@apollo/client'
import { Chain, chainIdToBackendName, isGqlSupportedChain } from 'modules/trade/utils/utils'
import useStablecoinPrice from 'modules/pools/hooks/useStableCoinPrice'
import ms from 'ms.macro'
import { getNativeTokenDBAddress } from 'modules/trade/utils/nativeTokens'
import { TradeState } from 'legacy/state/routing/types'
import { SupportedChainId } from 'test-cow-v2'
import { nativeOnChain } from '@aaran1337/smart-order-router-test'
import { INTERNAL_ROUTER_PREFERENCE_PRICE } from 'legacy/state/routing/slice'
import { useRoutingAPITrade } from 'legacy/state/routing/useRoutingAPITrade'
//Elektrikv2Changed

export enum PollingInterval {
  Slow = ms`5m`,
  Normal = ms`1m`,
  Fast = ms`12s`, // 12 seconds, block times for mainnet
  LightningMcQueen = ms`3s`, // 3 seconds, approx block times for polygon
}

export function useUsdPrice(currency: Nullish<Token>): UsdPriceState | null {
  const currencyAddress = currency?.address?.toLowerCase()

  const usdPrices = useAtomValue(usdTokenPricesAtom)
  const addCurrencyToUsdPrice = useSetAtom(addCurrencyToUsdPriceQueue)
  const removeCurrencyToUsdPrice = useSetAtom(removeCurrencyToUsdPriceFromQueue)

  useSafeEffect(() => {
    if (currency) {
      addCurrencyToUsdPrice(currency)
    }

    return () => {
      if (currency) {
        removeCurrencyToUsdPrice(currency)
      }
    }
  }, [currency])

  if (!currencyAddress) return null

  return usdPrices[currencyAddress] || null
}
//Elektrikv2Changed

const ETH_AMOUNT_OUT: { [chainId: number]: CurrencyAmount<Currency> } = {
  [SupportedChainId.MAINNET]: CurrencyAmount.fromRawAmount(nativeOnChain(SupportedChainId.MAINNET), 50e18),
}
//Elektrikv2Changed

function useETHValue(currencyAmount?: CurrencyAmount<Currency>): {
  data?: CurrencyAmount<Currency>
  isLoading: boolean
} {
  const chainId = currencyAmount?.currency?.chainId
  const amountOut = isGqlSupportedChain(chainId) ? ETH_AMOUNT_OUT[chainId] : undefined
  const { trade, state } = useRoutingAPITrade(
    TradeType.EXACT_OUTPUT,
    amountOut,
    currencyAmount?.currency,
    INTERNAL_ROUTER_PREFERENCE_PRICE
  )
  // Get ETH value of ETH or WETH
  if (chainId && currencyAmount && currencyAmount.currency.wrapped.equals(nativeOnChain(chainId).wrapped)) {
    return {
      data: new Price(currencyAmount.currency, currencyAmount.currency, '1', '1').quote(currencyAmount),
      isLoading: false,
    }
  }
  if (!trade || state === TradeState.LOADING || !currencyAmount?.currency || !isGqlSupportedChain(chainId)) {
    return { data: undefined, isLoading: state === TradeState.LOADING }
  }
  const { numerator, denominator } = trade.routes[0].midPrice
  const price = new Price(currencyAmount?.currency, nativeOnChain(chainId), denominator, numerator)
  return { data: price.quote(currencyAmount), isLoading: false }
}

export function useUSDPriceElektrik(currencyAmount?: CurrencyAmount<Currency>): {
  data?: number
  isLoading: boolean
} {
  const chain = currencyAmount?.currency.chainId ? chainIdToBackendName(currencyAmount?.currency.chainId) : undefined
  const currency = currencyAmount?.currency
  const { data: ethValue, isLoading: isEthValueLoading } = useETHValue(currencyAmount)
  // const { data, networkStatus } = useTokenSpotPriceQuery({
  //   variables: { chain: chain ?? Chain.Ethereum, address: getNativeTokenDBAddress(chain ?? Chain.Ethereum) },
  //   skip: !chain || !isGqlSupportedChain(currency?.chainId),
  //   pollInterval: PollingInterval.Normal,
  //   notifyOnNetworkStatusChange: true,
  //   fetchPolicy: 'cache-first',
  // })
  // Use USDC price for chains not supported by backend yet
  const stablecoinPrice = useStablecoinPrice(!isGqlSupportedChain(currency?.chainId) ? currency : undefined)
  if (!isGqlSupportedChain(currency?.chainId) && currencyAmount && stablecoinPrice) {
    return { data: parseFloat(stablecoinPrice.quote(currencyAmount).toSignificant()), isLoading: false }
  }
  // const isFirstLoad = networkStatus === NetworkStatus.loading
  // Otherwise, get the price of the token in ETH, and then multiple by the price of ETH
  // const ethUSDPrice = data?.token?.project?.markets?.[0]?.price?.value
  const ethUSDPrice = ''

  if (!ethUSDPrice || !ethValue)
    return {
      data: undefined,
      isLoading: isEthValueLoading,
      // || isFirstLoad
    }
  return { data: parseFloat(ethValue.toExact()) * ethUSDPrice, isLoading: false }
}
