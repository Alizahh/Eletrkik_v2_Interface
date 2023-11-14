import { RouterPreference } from "legacy/state/routing/slice"
import { useRouterPreference } from "legacy/state/user/hooks"
import { ThemedText } from "legacy/theme"
//Elektrikv2Changed

export default function RouterLabel() {
  const [routerPreference] = useRouterPreference()
  switch (routerPreference) {
    case RouterPreference.AUTO:
    case RouterPreference.API:
      return <ThemedText.BodySmall>Elektrik API</ThemedText.BodySmall>
    case RouterPreference.CLIENT:
      return <ThemedText.BodySmall>Elektrik Client</ThemedText.BodySmall>
  }
}