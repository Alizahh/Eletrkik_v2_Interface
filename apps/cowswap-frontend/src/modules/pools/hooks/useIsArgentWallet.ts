import { useWeb3React } from '@web3-react/core'
import { useArgentWalletDetectorContract } from 'legacy/hooks/pools/useContract'
import { NEVER_RELOAD, useSingleCallResult } from 'lib/hooks/multicall'
import { useMemo } from 'react'


export default function useIsArgentWallet(): boolean {
  const { account } = useWeb3React()
  const argentWalletDetector = useArgentWalletDetectorContract()
  const inputs = useMemo(() => [account ?? undefined], [account])
  const call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD)
  return Boolean(call?.result?.[0])
}
