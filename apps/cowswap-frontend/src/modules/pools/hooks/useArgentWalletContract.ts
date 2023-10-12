import { useWeb3React } from '@web3-react/core'
import { useContract } from 'legacy/hooks/pools/useContract'
import ArgentWalletContractABI from '../../../../../../libs/abis/src/abis-legacy/argent-wallet-contract.json'
import useIsArgentWallet from './useIsArgentWallet'


export function useArgentWalletContract(): any | null {
  const { account } = useWeb3React()
  const isArgentWallet = useIsArgentWallet()
  return useContract(
    isArgentWallet ? account ?? undefined : undefined,
    ArgentWalletContractABI,
    true
  ) as any
}
