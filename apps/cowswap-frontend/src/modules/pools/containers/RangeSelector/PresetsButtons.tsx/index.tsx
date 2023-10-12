import { Trans } from '@lingui/macro'
import { ThemedText } from 'legacy/theme'

import styled from 'styled-components/macro'
import { ButtonOutlined } from '../../../../../../../../libs/ui/src/pure/Button'
import { AutoRow } from '../../../../../../../../libs/ui/src/pure/Row'

const Button = styled(ButtonOutlined).attrs(() => ({
  padding: '8px',
  $borderRadius: '8px',
}))`
  color: ${({ theme }) => theme.textPrimary};
  flex: 1;
`

interface PresetsButtonsProps {
  onSetFullRange: () => void
}

export default function PresetsButtons({ onSetFullRange }: PresetsButtonsProps) {
  return (
    <AutoRow gap="4px" width="auto">
      <Button onClick={onSetFullRange}>
        <ThemedText.DeprecatedBody fontSize={12}>
          <Trans>Full Range</Trans>
        </ThemedText.DeprecatedBody>
      </Button>
    </AutoRow>
  )
}
