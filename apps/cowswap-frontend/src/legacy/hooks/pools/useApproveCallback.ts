import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { useHasPendingApproval, useTransactionAdder } from 'legacy/state/enhancedTransactions/hooks'
import { TransactionType } from 'legacy/state/enhancedTransactions/types'
import { ApprovalState, useApproval } from 'lib/hooks/useApproval'
import { useCallback } from 'react'


function useGetAndTrackApproval(getApproval: ReturnType<typeof useApproval>[1]) {
  const addTransaction = useTransactionAdder()
  return useCallback(() => {
    return getApproval().then((pending) => {
      if (pending) {
        const { response, tokenAddress, spenderAddress: spender } = pending
        addTransaction(response, { type: TransactionType.APPROVAL, tokenAddress, spender })
      }
    })
  }, [addTransaction, getApproval])
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const [approval, getApproval] = useApproval(amountToApprove, spender, useHasPendingApproval)
  return [approval, useGetAndTrackApproval(getApproval)]
}
