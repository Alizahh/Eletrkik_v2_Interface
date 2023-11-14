import { Trans } from '@lingui/macro'
import { sendAnalyticsEvent } from '@uniswap/analytics'
import { InterfaceElementName, SwapEventName } from '@uniswap/analytics-events'
import { Percent, TradeType } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { InterfaceTrade } from 'legacy/state/routing/types'
import { LoadingRows } from '../../../../../../../libs/ui/src/pure/Loader/styled'
import { AutoColumn } from 'legacy/components/Column'
import { Separator, ThemedText } from 'legacy/theme'
import { RowBetween, RowFixed } from '../../../../../../../libs/ui/src/pure/Row'
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from 'common/constants/chains'
import { SupportedChainId } from 'test-cow-v2'
import { formatPriceImpact } from '@uniswap/conedison/format'
import RouterLabel from 'modules/swap/pure/RouterLabel'
import SwapRoute from 'modules/swap/containers/SwapRoute'
import { MouseoverTooltip, TooltipSize } from '../../../../../../../libs/ui/src/pure/MouseOverTooltip'
import useNativeCurrency from 'modules/trade/utils/useNativeCurrency'


//Elektrikv2Changed

interface AdvancedSwapDetailsProps {
  trade: InterfaceTrade
  allowedSlippage: Percent
  syncing?: boolean
}
function TextWithLoadingPlaceholder({
  syncing,
  width,
  children,
}: {
  syncing: boolean
  width: number
  children: JSX.Element
}) {
  return syncing ? (
    <LoadingRows data-testid="loading-rows">
      <div style={{ height: '15px', width: `${width}px` }} />
    </LoadingRows>
  ) : (
    children
  )
}
export function AdvancedSwapDetails({ trade, allowedSlippage, syncing = false }: AdvancedSwapDetailsProps) {
  const { chainId } = useWeb3React()
  const nativeCurrency = useNativeCurrency(chainId)
  return (
    <AutoColumn gap="md">
      <Separator />
      {!trade.gasUseEstimateUSD || !chainId || !SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId) ? null : (
        <RowBetween>
          {/* <MouseoverTooltip
            text={
              <Trans>
                The fee paid to miners who process your transaction. This must be paid in {nativeCurrency.symbol}.
              </Trans>
            }
          >
            <ThemedText.BodySmall color="textSecondary">
              <Trans>Network fee</Trans>
            </ThemedText.BodySmall>
          </MouseoverTooltip> */}
          <TextWithLoadingPlaceholder syncing={syncing} width={50}>
            <ThemedText.BodySmall>{chainId === SupportedChainId.LIGHTLINK_PHOENIX_MAINNET ? "-" : `~${trade.gasUseEstimateUSD}`}</ThemedText.BodySmall>
          </TextWithLoadingPlaceholder>
        </RowBetween>
      )}
      <RowBetween>
        {/* <MouseoverTooltip text={<Trans>The impact your trade has on the market price of this pool.</Trans>}>
          <ThemedText.BodySmall color="textSecondary">
            <Trans>Price impact</Trans>
          </ThemedText.BodySmall>
        </MouseoverTooltip> */}
        <TextWithLoadingPlaceholder syncing={syncing} width={50}>
          <ThemedText.BodySmall>{formatPriceImpact(trade.priceImpact)}</ThemedText.BodySmall>
        </TextWithLoadingPlaceholder>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          {/* <MouseoverTooltip
            text={
              <Trans>
                The minimum amount you are guaranteed to receive. If the price slips any further, your transaction will
                revert.
              </Trans>
            }
          >
            <ThemedText.BodySmall color="textSecondary">
              {trade.tradeType === TradeType.EXACT_INPUT ? <Trans>Minimum output</Trans> : <Trans>Maximum input</Trans>}
            </ThemedText.BodySmall>
          </MouseoverTooltip> */}
        </RowFixed>
        <TextWithLoadingPlaceholder syncing={syncing} width={70}>
          <ThemedText.BodySmall>
            {trade.tradeType === TradeType.EXACT_INPUT
              ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
              : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`}
          </ThemedText.BodySmall>
        </TextWithLoadingPlaceholder>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          {/* <MouseoverTooltip
            text={
              <Trans>
                The amount you expect to receive at the current market price. You may receive less or more if the market
                price changes while your transaction is pending.
              </Trans>
            }
          >
            <ThemedText.BodySmall color="textSecondary">
              <Trans>Expected output</Trans>
            </ThemedText.BodySmall>
          </MouseoverTooltip> */}
        </RowFixed>
        <TextWithLoadingPlaceholder syncing={syncing} width={65}>
          <ThemedText.BodySmall>
            {`${trade.outputAmount.toSignificant(6)} ${trade.outputAmount.currency.symbol}`}
          </ThemedText.BodySmall>
        </TextWithLoadingPlaceholder>
      </RowBetween>
      <Separator />
      <RowBetween>
        <ThemedText.BodySmall color="textSecondary">
          <Trans>Order routing</Trans>
        </ThemedText.BodySmall>
        {/* <MouseoverTooltip
          size={TooltipSize.Large}
          text={<SwapRoute data-testid="swap-route-info" trade={trade} syncing={syncing} />}
          onOpen={() => {
            sendAnalyticsEvent(SwapEventName.SWAP_AUTOROUTER_VISUALIZATION_EXPANDED, {
              element: InterfaceElementName.AUTOROUTER_VISUALIZATION_ROW,
            })
          }}
        >
          <RouterLabel />
        </MouseoverTooltip> */}
      </RowBetween>
    </AutoColumn>
  )
}