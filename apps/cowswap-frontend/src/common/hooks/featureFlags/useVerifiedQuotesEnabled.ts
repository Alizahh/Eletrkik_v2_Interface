import { SupportedChainId } from 'test-cow-v2'

import { useFeatureFlags } from './useFeatureFlags'

//Elektrikv2Changed
export function useVerifiedQuotesEnabled(chainId: SupportedChainId): boolean {
  const { verifyQuotesMainnet, verifyQuotesGoerli, verifyQuotesGnosis, verifyQuotesPhoenix, verifyQuotesPegasus } =
    useFeatureFlags()

  switch (chainId) {
    // case SupportedChainId.MAINNET:
    //   return !!verifyQuotesMainnet
    // case SupportedChainId.GNOSIS_CHAIN:
    //   return !!verifyQuotesGnosis
    // case SupportedChainId.GOERLI:
    //   return !!verifyQuotesGoerli
    case SupportedChainId.LIGHTLINK_PHOENIX_MAINNET:
      return !!verifyQuotesPhoenix
    case SupportedChainId.LIGHTLINK_PEGASUS_TESTNET:
      return !!verifyQuotesPegasus
    default:
      return false
  }
}
