import { Trans } from '@lingui/macro'
import { Currency } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { AutoColumn } from 'legacy/components/Column'
import { ThemedText } from 'legacy/theme'
import { PoolState, usePools } from 'modules/pools/hooks/usePools'
import { DynamicSection } from 'pages/Pool/AddLiquidity/styled'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box } from 'rebass'
import { sendEvent } from '../../../../../../../libs/analytics/src/googleAnalytics'
import { usePrevious } from '../../../../../../../libs/common-hooks/src/usePrevious'
import { ButtonGray } from '../../../../../../../libs/ui/src/pure/Button'
import { RowBetween } from '../../../../../../../libs/ui/src/pure/Row'
import { FeeOption } from './FeeOption'
import { FEE_AMOUNT_DETAIL } from './shared'
import { FocusedOutlineCard, Select } from './styled'




export default function FeeSelector({
  disabled = false,
  feeAmount,
  handleFeePoolSelect,
  currencyA,
  currencyB,
}: {
  disabled?: boolean
  feeAmount?: FeeAmount
  handleFeePoolSelect: (feeAmount: FeeAmount) => void
  currencyA?: Currency
  currencyB?: Currency
}) {
  const { chainId } = useWeb3React()

  const { isLoading, isError, largestUsageFeeTier, distributions } = useFeeTierDistribution(currencyA, currencyB)

  // get pool data on-chain for latest states
  const pools = usePools([
    [currencyA, currencyB, FeeAmount.LOWEST],
    [currencyA, currencyB, FeeAmount.LOW],
    [currencyA, currencyB, FeeAmount.MEDIUM],
    [currencyA, currencyB, FeeAmount.HIGH],
  ])

  const poolsByFeeTier: Record<FeeAmount, PoolState> = useMemo(
    () =>
      pools.reduce(
        (acc, [curPoolState, curPool]) => {
          acc = {
            ...acc,
            ...{ [curPool?.fee as FeeAmount]: curPoolState },
          }
          return acc
        },
        {
          // default all states to NOT_EXISTS
          [FeeAmount.LOWEST]: PoolState.NOT_EXISTS,
          [FeeAmount.LOW]: PoolState.NOT_EXISTS,
          [FeeAmount.MEDIUM]: PoolState.NOT_EXISTS,
          [FeeAmount.HIGH]: PoolState.NOT_EXISTS,
        }
      ),
    [pools]
  )

  const [showOptions, setShowOptions] = useState(false)
  const [pulsing, setPulsing] = useState(false)

  const previousFeeAmount = usePrevious(feeAmount)

  const recommended = useRef(false)

  const handleFeePoolSelectWithEvent = useCallback(
    (fee: FeeAmount) => {
      sendEvent({
        category: 'FeePoolSelect',
        action: 'Manual',
      })
      handleFeePoolSelect(fee)
    },
    [handleFeePoolSelect]
  )

  useEffect(() => {
    if (feeAmount || isLoading || isError) {
      return
    }

    if (!largestUsageFeeTier) {
      // cannot recommend, open options
      setShowOptions(true)
    } else {
      setShowOptions(false)

      recommended.current = true
      sendEvent({
        category: 'FeePoolSelect',
        action: ' Recommended',
      })

      handleFeePoolSelect(largestUsageFeeTier)
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, handleFeePoolSelect])

  useEffect(() => {
    setShowOptions(isError)
  }, [isError])

  useEffect(() => {
    if (feeAmount && previousFeeAmount !== feeAmount) {
      setPulsing(true)
    }
  }, [previousFeeAmount, feeAmount])

  return (
    <AutoColumn gap="16px">
      <DynamicSection gap="md" disabled={disabled}>
        <FocusedOutlineCard pulsing={pulsing} onAnimationEnd={() => setPulsing(false)}>
          <RowBetween>
            <AutoColumn id="add-liquidity-selected-fee">
              {!feeAmount ? (
                <>
                  <ThemedText.DeprecatedLabel>
                    <Trans>Fee tier</Trans>
                  </ThemedText.DeprecatedLabel>
                  <ThemedText.DeprecatedMain fontWeight={400} fontSize="12px" textAlign="left">
                    <Trans>The % you will earn in fees.</Trans>
                  </ThemedText.DeprecatedMain>
                </>
              ) : (
                <>
                  <ThemedText.DeprecatedLabel className="selected-fee-label">
                    <Trans>{FEE_AMOUNT_DETAIL[feeAmount].label}% fee tier</Trans>
                  </ThemedText.DeprecatedLabel>
                  <Box style={{ width: 'fit-content', marginTop: '8px' }} className="selected-fee-percentage">
                    {distributions && (
                    //   <FeeTierPercentageBadge
                    //     distributions={distributions}
                    //     feeAmount={feeAmount}
                    //     poolState={poolsByFeeTier[feeAmount]}
                    //   />
                    <></>
                    )}
                  </Box>
                </>
              )}
            </AutoColumn>

            <ButtonGray onClick={() => setShowOptions(!showOptions)} width="auto" padding="4px" $borderRadius="6px">
              {showOptions ? <Trans>Hide</Trans> : <Trans>Edit</Trans>}
            </ButtonGray>
          </RowBetween>
        </FocusedOutlineCard>

        {chainId && showOptions && (
          <Select>
            {[FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((_feeAmount, i) => {
              const { supportedChains } = FEE_AMOUNT_DETAIL[_feeAmount]
              if (supportedChains.includes(chainId)) {
                return (
                  <FeeOption
                    feeAmount={_feeAmount}
                    active={feeAmount === _feeAmount}
                    onClick={() => handleFeePoolSelectWithEvent(_feeAmount)}
                    distributions={distributions}
                    poolState={poolsByFeeTier[_feeAmount]}
                    key={i}
                  />
                )
              }
              return null
            })}
          </Select>
        )}
      </DynamicSection>
    </AutoColumn>
  )
}
