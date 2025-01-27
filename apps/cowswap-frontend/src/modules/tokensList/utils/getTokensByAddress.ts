import { NATIVE_CURRENCY_BUY_TOKEN } from '@cowprotocol/common-const'
import { doesTokenMatchSymbolOrAddress } from '@cowprotocol/common-utils'
import { SupportedChainId } from '@cowprotocol/cow-sdk'
import { Token } from '@uniswap/sdk-core'

import { TokensByAddress } from '../state/tokensListAtom'

export function getTokensByAddress(
  chainId: SupportedChainId,
  tokenId: string,
  tokensByAddress: TokensByAddress
): Token {
  const nativeToken = NATIVE_CURRENCY_BUY_TOKEN[chainId]

  if (doesTokenMatchSymbolOrAddress(nativeToken, tokenId)) {
    return nativeToken
  }

  return tokensByAddress[tokenId.toLowerCase()]
}
