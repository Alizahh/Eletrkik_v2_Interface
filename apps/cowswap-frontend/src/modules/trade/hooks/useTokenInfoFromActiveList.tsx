import { Currency } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { useCombinedActiveList } from 'legacy/state/lists/hooks'
import { useMemo } from 'react'

export function useTokenInfoFromActiveList(currency: Currency) {
  const { chainId } = useWeb3React()
  const activeList = useCombinedActiveList()
  return useMemo(() => {
    if (!chainId) return
    if (currency.isNative) return currency
    try {
      return activeList[chainId][currency.wrapped.address].token
    } catch (e) {
      return currency
    }
  }, [activeList, chainId, currency])
}
//Elektrikv2Changed
