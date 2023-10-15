import { Trans } from '@lingui/macro'
import { ThemedText } from 'legacy/theme'
import { AlertTriangle } from 'react-feather'
import { ExplainerText, TitleRow, Wrapper } from './styled'


interface OwnershipWarningProps {
  ownerAddress: string
}

const OwnershipWarning = ({ ownerAddress }: OwnershipWarningProps) => (
  <Wrapper>
    <TitleRow>
      <AlertTriangle style={{ marginRight: '8px' }} />
      <ThemedText.SubHeader color="accentWarning">
        <Trans>Warning</Trans>
      </ThemedText.SubHeader>
    </TitleRow>
    <ExplainerText>
      <Trans>
        You are not the owner of this LP position. You will not be able to withdraw the liquidity from this position
        unless you own the following address: {ownerAddress}
      </Trans>
    </ExplainerText>
  </Wrapper>
)

export default OwnershipWarning
