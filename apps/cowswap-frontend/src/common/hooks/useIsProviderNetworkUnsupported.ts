import { SupportedChainId } from 'test-cow-v2'
import { useWeb3React } from '@web3-react/core'

export function useIsProviderNetworkUnsupported(): boolean {
  const { chainId } = useWeb3React()

  return !!chainId && !(chainId in SupportedChainId)
}
