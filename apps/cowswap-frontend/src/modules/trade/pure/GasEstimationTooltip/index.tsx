
import styled from "styled-components/macro";
import { ReactComponent as GasIcon } from "../../assets/images/gas-icon.svg";
import { InterfaceTrade } from 'legacy/state/routing/types';
import { LoadingOpacityContainer } from 'modules/pools/pure/Loader';
import { RowFixed } from '../../../../../../../libs/ui/src/pure/Row';
import { ThemedText } from 'legacy/theme';
import { isPhoenixChain } from 'common/constants/chains';
import SwapRoute from 'modules/swap/containers/SwapRoute';
import { MouseoverTooltip, TooltipSize } from '../../../../../../../libs/ui/src/pure/MouseOverTooltip/';


//Elektrikv2Changed

interface StyledGasIconProps {
  isFreeTransactions?: boolean;
}

const StyledGasIcon = styled(GasIcon)<StyledGasIconProps>`
  margin-right: 4px;
  height: 18px;
  // We apply the following to all children of the SVG in order to override the default color
  & > * {
    stroke: ${({ theme, isFreeTransactions }) =>
      isFreeTransactions ? theme.freeTransaction : theme.textTertiary};
  }
`;
export default function GasEstimateTooltip({
  trade,
  loading,
  disabled,
  chainId,
}: {
  trade: InterfaceTrade; // dollar amount in active chain's stablecoin
  loading: boolean;
  disabled?: boolean;
  chainId?: number;
}) {
  const formattedGasPriceString = trade?.gasUseEstimateUSD
    ? trade.gasUseEstimateUSD === "0.00"
      ? "<$0.01"
      : "$" + trade.gasUseEstimateUSD
    : undefined;
const isPhoenix = isPhoenixChain(chainId)


  return (
    <MouseoverTooltip
      disabled={disabled}
      size={TooltipSize.Large}
      // TODO(WEB-3304)
      // Most of Swap-related components accept either `syncing`, `loading` or both props at the same time.
      // We are often using them interchangeably, or pass both values as one of them (`syncing={loading || syncing}`).
      // This is confusing and can lead to unpredicted UI behavior. We should refactor and unify this.
      text={<SwapRoute trade={trade} syncing={loading} />}
      onOpen={() => {
    
      }}
      placement="bottom"
    >
      <LoadingOpacityContainer $loading={loading}>
        <RowFixed>
          <StyledGasIcon
            isFreeTransactions={isPhoenix}
          />
          {isPhoenix ? (
            <ThemedText.FreeTransaction color="textFreeTransaction">
              $0
            </ThemedText.FreeTransaction>
          ) : (
            <ThemedText.BodySmall color="textSecondary">
              {formattedGasPriceString}
            </ThemedText.BodySmall>
          )}
        </RowFixed>
      </LoadingOpacityContainer>
    </MouseoverTooltip>
  );
}









