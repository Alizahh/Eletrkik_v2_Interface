
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from 'common/constants/chains';
import Column, { AutoColumn } from 'legacy/components/Column';
import { InterfaceTrade } from 'legacy/state/routing/types';
import useAutoRouterSupported from 'modules/trade/utils/useAutoRouterSupported';
import { LoadingRows } from '../../../../../../../libs/ui/src/pure/Loader/styled';
import { ThemedText } from 'legacy/theme';
import { Divider } from 'legacy/components/Settings/SettingsMod';
import RouterLabel from 'modules/swap/pure/RouterLabel';
import getRoutingDiagramEntries from 'modules/trade/utils/getRoutingDiagramEntries';
import RoutingDiagram from 'modules/swap/pure/RoutingDiagram';


//Elektrikv2Changed

export default function SwapRoute({ trade, syncing }: { trade: InterfaceTrade; syncing: boolean }) {
  const { chainId } = useWeb3React()
  const autoRouterSupported = useAutoRouterSupported()
  const routes = getRoutingDiagramEntries(trade)
  const gasPrice =
    trade.gasUseEstimateUSD && chainId && SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId)
      ? trade.gasUseEstimateUSD === '0.00'
        ? '<$0.01'
        : '$' + trade.gasUseEstimateUSD
      : undefined
  return (
    <AutoColumn gap="md">
      <RouterLabel />
      <Divider />
      {syncing ? (
        <LoadingRows>
          <div style={{ width: '100%', height: '30px' }} />
        </LoadingRows>
      ) : (
        <RoutingDiagram
          currencyIn={trade.inputAmount.currency}
          currencyOut={trade.outputAmount.currency}
          routes={routes}
        />
      )}
      {autoRouterSupported && (
        <>
      <Divider />
          {syncing ? (
            <LoadingRows>
              <div style={{ width: '100%', height: '15px' }} />
            </LoadingRows>
          ) : (
            <ThemedText.Caption color="textSecondary">
              {gasPrice ? <Trans>Best price route costs ~{gasPrice} in gas.</Trans> : null}
              <Trans>
                This route optimizes your total output by considering split routes, multiple hops, and the gas cost of
                each step.
              </Trans>
            </ThemedText.Caption>
          )}
        </>
      )}
    </AutoColumn>
  )
}