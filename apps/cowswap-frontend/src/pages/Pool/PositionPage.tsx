import { Trans } from "@lingui/macro"
import { ThemedText } from "legacy/theme"
import { Link } from "react-router-dom"
import { PositionPageUnsupported, PositionPageButtonPrimary } from "./styled"

export default function PositionPage(){
    return(<>
    Position Page
    </>
    )
}

export function PositionPageUnsupportedContent() {
    return (
      <PositionPageUnsupported>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ThemedText.HeadlineLarge style={{ marginBottom: '8px' }}>
            <Trans>Position unavailable</Trans>
          </ThemedText.HeadlineLarge>
          <ThemedText.BodyPrimary style={{ marginBottom: '32px' }}>
            <Trans>To view a position, you must be connected to the network it belongs to.</Trans>
          </ThemedText.BodyPrimary>
          <PositionPageButtonPrimary as={Link} to="/pools" width="fit-content">
            <Trans>Back to Pools</Trans>
          </PositionPageButtonPrimary>
        </div>
      </PositionPageUnsupported>
    )
  }