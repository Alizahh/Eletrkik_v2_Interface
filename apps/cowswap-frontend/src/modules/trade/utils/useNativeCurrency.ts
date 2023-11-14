import { nativeOnChain } from '@aaran1337/smart-order-router-test'
import { NativeCurrency, Token } from '@uniswap/sdk-core'
import { useMemo } from 'react'
import { SupportedChainId } from 'test-cow-v2'

export default function useNativeCurrency(chainId: SupportedChainId | null | undefined): NativeCurrency | Token {
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.MAINNET),
    [chainId]
  )
}
//Elektrikv2Changed
