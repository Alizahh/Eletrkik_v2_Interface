import { Interface } from '@ethersproject/abi'
import ERC20ABI from '../../../../../../libs/abis/src/abis-legacy/erc20.json'
import { NEVER_RELOAD, useMultipleContractSingleData } from 'lib/hooks/multicall'

const ERC20Interface = new Interface(ERC20ABI) as any

export function useTokenContractsConstant(tokens: string[], field: 'name' | 'symbol' | 'decimals' | 'totalSupply') {
  return useMultipleContractSingleData(tokens, ERC20Interface, field, undefined, NEVER_RELOAD)
}
