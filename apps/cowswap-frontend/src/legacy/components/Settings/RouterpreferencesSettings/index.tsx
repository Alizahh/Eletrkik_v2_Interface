import { Trans } from '@lingui/macro'
import Column, { AutoColumn } from 'legacy/components/Column'
import Radio from 'legacy/components/Radio'
import { Info } from 'react-feather'
import styled from 'styled-components/macro'
import { RowBetween, RowFixed } from '../../../../../../../libs/ui/src/pure/Row'
import { ThemedText } from 'legacy/theme'
import { Toggle } from 'legacy/components/Toggle'
import { RouterPreference } from 'legacy/state/routing/slice'
import { useRouterPreference } from 'legacy/state/user/hooks'

const Preference = styled(Radio)`
  background-color: '#fff;
  padding: 12px 16px;
`
const PreferencesContainer = styled(Column)`
  gap: 1.5px;
  border-radius: 12px;
  overflow: hidden;
`
export default function RouterPreferenceSettings() {
  const [routerPreference, setRouterPreference] = useRouterPreference()
  const isAutoRoutingActive = routerPreference === RouterPreference.AUTO
  return (
    <AutoColumn gap='md' >
      <div style={{justifyContent:'space-between'}} >
        <RowFixed>
          <AutoColumn gap='xs' >
            <ThemedText.BodySecondary>
              <Trans>
                Auto Router API <Info size={12} />
              </Trans>
            </ThemedText.BodySecondary>
            <ThemedText.Caption color="textSecondary">
              <Trans>Use the Elektrik API to get faster quotes.</Trans>
            </ThemedText.Caption>
          </AutoColumn>
        </RowFixed>
        <Toggle
          id="toggle-optimized-router-button"
          isActive={isAutoRoutingActive}
          toggle={() => setRouterPreference(isAutoRoutingActive ? RouterPreference.API : RouterPreference.AUTO)}
        // toggle={() => {}}
        />
      </div>
      {!isAutoRoutingActive && (
        <PreferencesContainer>
          <Preference
            isActive={routerPreference === RouterPreference.API}
            // isActive={false}
            toggle={() => setRouterPreference(RouterPreference.API)}
          // toggle={() => {}}
          >
            <AutoColumn gap='xs' >
              <ThemedText.BodyPrimary>
                <Trans>
                  Elektrik API
                  {/* <mark style={{ fontSize: '10px', borderRadius: '5px', padding: '2px' }}>&nbsp; Coming Soon</mark> */}
                </Trans>
              </ThemedText.BodyPrimary>
              <ThemedText.Caption color="textSecondary">
                <Trans>Finds the best route on the Elektrik Protocol using the Elektrik Routing API.</Trans>
              </ThemedText.Caption>
            </AutoColumn>
          </Preference>
          <Preference
            isActive={routerPreference === RouterPreference.CLIENT}
            // isActive={true}
            toggle={() => setRouterPreference(RouterPreference.CLIENT)}
          // toggle={() => {}}
          >
            <AutoColumn gap='xs' >
              <ThemedText.BodyPrimary>
                <Trans>Elektrik client</Trans>
              </ThemedText.BodyPrimary>
              <ThemedText.Caption color="textSecondary">
                <Trans>
                  Finds the best route on the Elektrik Protocol through your browser. May result in high latency and
                  prices.
                </Trans>
              </ThemedText.Caption>
            </AutoColumn>
          </Preference>
        </PreferencesContainer>
      )}
    </AutoColumn>
  )
}
//Elektrikv2Changed
