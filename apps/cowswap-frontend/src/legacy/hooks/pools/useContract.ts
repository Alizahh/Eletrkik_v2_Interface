import { MULTICALL_ADDRESSES, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from '@uniswap/sdk-core'
import NonfungiblePositionManagerJson from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { Contract } from '@ethersproject/contracts'
import { getContract } from '../../../../../../libs/common-utils/src/legacyAddressUtils'
import { ARGENT_WALLET_DETECTOR_ADDRESS } from 'modules/pools/constants/addresses'
import ARGENT_WALLET_DETECTOR_ABI from '../../../../../../libs/abis/src/abis-legacy/argent-wallet-detector.json'

const { abi: NFTPositionManagerABI } = NonfungiblePositionManagerJson

export function useArgentWalletDetectorContract() {
  return useContract<any>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useContract<T extends Contract = Contract>(
    addressOrAddressMap: string | { [chainId: number]: string } | undefined,
    ABI: any,
    withSignerIfPossible = true
  ): T | null {
    const { provider, account, chainId } = useWeb3React()
  
    return useMemo(() => {
      if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
      let address: string | undefined
      if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
      else address = addressOrAddressMap[chainId]
      if (!address) return null
      try {
        return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
  }
  
export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
    return useContract<NonfungiblePositionManager>(
      NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
      NFTPositionManagerABI,
      withSignerIfPossible
    )
  }
  