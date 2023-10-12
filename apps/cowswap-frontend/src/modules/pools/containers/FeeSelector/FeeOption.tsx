import { Trans } from '@lingui/macro'
import { FeeAmount } from '@uniswap/v3-sdk'
import { AutoColumn } from 'legacy/components/Column'
import { ThemedText } from 'legacy/theme'
import { useFeeTierDistribution } from 'modules/pools/hooks/useFeeTierDistribution'
import { PoolState } from 'modules/pools/hooks/usePools'
import { ButtonRadioChecked } from 'modules/pools/pure/Button'
import React from 'react'
import styled from 'styled-components/macro'
import { FeeTierPercentageBadge } from './FeeTierPercentageaBadge'

import { FEE_AMOUNT_DETAIL } from './shared'
import { ResponsiveText } from './styled'



interface FeeOptionProps {
  feeAmount: FeeAmount
  active: boolean
  distributions: ReturnType<typeof useFeeTierDistribution>['distributions']
  poolState: PoolState
  onClick: () => void
}

export function FeeOption({ feeAmount, active, poolState, distributions, onClick }: FeeOptionProps) {
  return (
    <ButtonRadioChecked active={active} onClick={onClick}>
      <AutoColumn gap="sm" justify="flex-start">
        <AutoColumn justify="flex-start" gap="6px">
          <ResponsiveText>
            <Trans>{FEE_AMOUNT_DETAIL[feeAmount].label}%</Trans>
          </ResponsiveText>
          <ThemedText.DeprecatedMain fontWeight={400} fontSize="12px" textAlign="left">
            {FEE_AMOUNT_DETAIL[feeAmount].description}
          </ThemedText.DeprecatedMain>
        </AutoColumn>

        {distributions && (
          <FeeTierPercentageBadge distributions={distributions} feeAmount={feeAmount} poolState={poolState} />
        )}
      </AutoColumn>
    </ButtonRadioChecked>
  )
}
