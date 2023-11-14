import { Trans } from '@lingui/macro'
import { Percent } from '@uniswap/sdk-core'
import { OutlineCard } from 'legacy/components/Card'
import { opacify } from 'polished'
import styled, { useTheme } from 'styled-components/macro'
import { MouseoverTooltip } from '../../../../../../../libs/ui/src/pure/Tooltip'
import { AutoColumn } from 'legacy/components/Column'
import { RowBetween, RowFixed } from '../../../../../../../libs/ui/src/pure/Row'
import { ThemedText } from 'legacy/theme'
import { formatPriceImpact } from '@uniswap/conedison/format'

//Elektrikv2Changed

const StyledCard = styled(OutlineCard)`
  padding: 12px;
  border: 1px solid ${({ theme }) => opacify(24, theme.accentFailure)};
`
interface PriceImpactWarningProps {
  priceImpact: Percent
}
export default function PriceImpactWarning({ priceImpact }: PriceImpactWarningProps) {
  const theme = useTheme()
  return (
    <StyledCard>
      <AutoColumn gap="sm">
        <MouseoverTooltip
          text={
            <Trans>
              A swap of this size may have a high price impact, given the current liquidity in the pool. There may be a
              large difference between the amount of your input token and what you will receive in the output token
            </Trans>
          }
        >
          <RowBetween>
            <RowFixed>
              <ThemedText.DeprecatedSubHeader color={theme.accentFailure}>
                <Trans>Price impact warning</Trans>
              </ThemedText.DeprecatedSubHeader>
            </RowFixed>
            <ThemedText.DeprecatedLabel textAlign="right" fontSize={14} color="accentFailure">
              {formatPriceImpact(priceImpact)}
            </ThemedText.DeprecatedLabel>
          </RowBetween>
        </MouseoverTooltip>
      </AutoColumn>
    </StyledCard>
  )
}