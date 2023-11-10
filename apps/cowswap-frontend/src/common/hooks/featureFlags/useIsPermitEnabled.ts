import { SupportedChainId } from 'test-cow-v2'

import { useFeatureFlags } from './useFeatureFlags'

//Elektrikv2Changed
export function useIsPermitEnabled(chainId: SupportedChainId | undefined): boolean {
  const { permitEnabledMainnet, permitEnabledGoerli, permitEnabledGnosis, permitEnabledPhoenix, permitEnabledPegasus } =
    useFeatureFlags()

  switch (chainId) {
    case SupportedChainId.MAINNET:
      return !!permitEnabledMainnet
    case SupportedChainId.GNOSIS_CHAIN:
      return !!permitEnabledGnosis
    case SupportedChainId.GOERLI:
      return !!permitEnabledGoerli
    case SupportedChainId.LIGHTLINK_PHOENIX_MAINNET:
      return !!permitEnabledPhoenix
    case SupportedChainId.LIGHTLINK_PEGASUS_TESTNET:
      return !!permitEnabledPegasus
    default:
      return false
  }
}
