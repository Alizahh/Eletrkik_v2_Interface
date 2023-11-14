import { nativeOnChain } from '@aaran1337/smart-order-router-test'
import { CHAIN_NAME_TO_CHAIN_ID, Chain } from './utils'

export function getNativeTokenDBAddress(chain: Chain): string | undefined {
  const pageChainId = CHAIN_NAME_TO_CHAIN_ID[chain]
  if (pageChainId === undefined) {
    return undefined
  }
  switch (chain) {
    case Chain.Ethereum:

    default:
      return undefined
  }
}
//Elektrikv2Changed
