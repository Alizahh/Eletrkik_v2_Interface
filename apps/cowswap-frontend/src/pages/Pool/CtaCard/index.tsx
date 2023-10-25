import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { CTA, CTASection, ResponsiveColumn } from './styled'
import { HeaderText } from '../../../../../../libs/wallet/src/api/pure/ConnectWalletOption'
import { ThemedText } from 'legacy/theme'




export default function CTACards() {
  
  const { chainId } = useWeb3React()
//   const { infoLink } = getChainInfoOrDefault(chainId)

  return (
    <CTASection>
      <CTA href="https://docs.elektrik.network/protocol-overview/welcome-to-elektrik">
        <ResponsiveColumn>
          <HeaderText>
            <Trans>Learn about providing liquidity</Trans> ↗
          </HeaderText>
          <ThemedText.DeprecatedBody fontWeight={400} style={{ alignItems: 'center', display: 'flex' }}>
            <Trans>Check out our v3 LP walkthrough and migration guides.</Trans>
          </ThemedText.DeprecatedBody>
        </ResponsiveColumn>
      </CTA>
      <CTA data-testid="cta-infolink" href={''}>
        <ResponsiveColumn>
          <HeaderText style={{ alignSelf: 'flex-start' }}>
            <Trans>Top pools</Trans> ↗
          </HeaderText>
          <ThemedText.DeprecatedBody fontWeight={400} style={{ alignSelf: 'flex-start' }}>
            <Trans>Explore Elektrik Analytics.</Trans>
          </ThemedText.DeprecatedBody>
        </ResponsiveColumn>
      </CTA>
    </CTASection>
  )
}