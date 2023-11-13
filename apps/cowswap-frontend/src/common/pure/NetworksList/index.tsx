import { getChainInfo } from '@cowprotocol/common-const'
import { getExplorerBaseUrl } from '@cowprotocol/common-utils'
import { SupportedChainId,ALL_SUPPORTED_CHAIN_IDS } from 'test-cow-v2'
import { ExternalLink } from '@cowprotocol/ui'

import { Trans } from '@lingui/macro'

import * as styledEl from './styled'

export interface NetworksListProps {
  currentChainId: SupportedChainId | null

  onSelectChain(targetChainId: SupportedChainId): void
}
const NETWORK_SELECTOR_CHAINS = [
  SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
  SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
]

export function NetworksList(props: NetworksListProps) {
  const { currentChainId, onSelectChain } = props

  return (
    <>
      {NETWORK_SELECTOR_CHAINS.map((targetChainId: SupportedChainId) => {
        const info = getChainInfo(targetChainId)
        const { label, logoUrl, bridge, explorer, explorerTitle, helpCenterUrl } = info

        const isActive = targetChainId === currentChainId

        const rowContent = (
          <styledEl.FlyoutRow key={targetChainId} onClick={() => onSelectChain(targetChainId)} active={isActive}>
            <styledEl.Logo src={logoUrl} />
            <styledEl.NetworkLabel>{label}</styledEl.NetworkLabel>
            {isActive && <styledEl.FlyoutRowActiveIndicator active />}
          </styledEl.FlyoutRow>
        )

        if (!isActive) {
          return rowContent
        }

        return (
          <styledEl.ActiveRowWrapper key={targetChainId}>
            {rowContent}
            <styledEl.ActiveRowLinkList>
              {bridge && (
                <ExternalLink href={bridge}>
                  <Trans>Bridge</Trans>
                  <styledEl.LinkOutCircle />
                </ExternalLink>
              )}
              {explorer && (
                <ExternalLink href={explorer}>
                  <Trans>{explorerTitle}</Trans>
                  <styledEl.LinkOutCircle />
                </ExternalLink>
              )}
              {helpCenterUrl && (
                <ExternalLink href={helpCenterUrl}>
                  <Trans>Help Center</Trans>
                  <styledEl.LinkOutCircle />
                </ExternalLink>
              )}

              <ExternalLink href={getExplorerBaseUrl(targetChainId)}>
                <Trans>Elektrik Protocol Explorer</Trans>
                <styledEl.LinkOutCircle />
              </ExternalLink>
            </styledEl.ActiveRowLinkList>
          </styledEl.ActiveRowWrapper>
        )
      })}
    </>
  )
}
