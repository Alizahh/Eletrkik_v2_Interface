import { Trans } from "@lingui/macro";
import { RowBetween } from "../../../../../../../libs/ui/src/pure/Row";
import { ActiveText, StyledArrowLeft, StyledHistoryLink, Tabs } from "./styled";
import { Link as HistoryLink, useLocation } from 'react-router-dom'
import { Percent } from '@uniswap/sdk-core'
import { ReactNode } from "react";
import { useWeb3React } from "@web3-react/core";
import { useTheme } from "styled-components";
import { useAppDispatch } from "legacy/state/hooks";
import { Box } from 'rebass'
import { ThemedText } from "legacy/theme";
import { resetMintState as resetMintV3State } from '../../../../legacy/state/mint/v3/actions'

export function FindPoolTabs({ origin }: { origin: string }) {
    return (
      <Tabs>
        <RowBetween style={{ padding: '1rem 1rem 0 1rem', position: 'relative' }}>
          <HistoryLink to={origin}>
            <StyledArrowLeft />
          </HistoryLink>
          <ActiveText style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Trans>Import V2 Pool</Trans>
          </ActiveText>
        </RowBetween>
      </Tabs>
    )
  }

  export function AddRemoveTabs({
    adding,
    creating,
    autoSlippage,
    positionID,
    children,
  }: {
    adding: boolean
    creating: boolean
    autoSlippage: Percent
    positionID?: string
    showBackLink?: boolean
    children?: ReactNode
  }) {
    const { chainId } = useWeb3React()
    const theme = useTheme()
    // reset states on back
    const dispatch = useAppDispatch()
    const location = useLocation()
  
    // detect if back should redirect to v3 or v2 pool page
    const poolLink = location.pathname.includes('add/v2')
      ? '/pools/v2'
      : '/pools' + (positionID ? `/${positionID.toString()}` : '')
  
    return (
      <Tabs>
        <RowBetween style={{ padding: '1rem 1rem 0 1rem' }}>
          <StyledHistoryLink
            to={poolLink}
            onClick={() => {
              if (adding) {
                // not 100% sure both of these are needed
                // dispatch(resetMintState())
                dispatch(resetMintV3State())
              }
            }}
            flex={children ? '1' : undefined}
          >
            <StyledArrowLeft stroke={theme.textSecondary} />
          </StyledHistoryLink>
          <ThemedText.DeprecatedMediumHeader
            fontWeight={500}
            fontSize={20}
            style={{ flex: '1', margin: 'auto', textAlign: children ? 'start' : 'center' }}
          >
            {creating ? (
              <Trans>Create a pair</Trans>
            ) : adding ? (
              <Trans>Add Liquidity</Trans>
            ) : (
              <Trans>Remove Liquidity</Trans>
            )}
          </ThemedText.DeprecatedMediumHeader>
          <Box style={{ marginRight: '.5rem' }}>{children}</Box>
        </RowBetween>
      </Tabs>
    )
  }

  export function CreateProposalTabs() {
    return (
      <Tabs>
        <Row style={{ padding: '1rem 1rem 0 1rem' }}>
          <HistoryLink to="/vote">
            <StyledArrowLeft />
          </HistoryLink>
          <ActiveText style={{ marginLeft: 'auto', marginRight: 'auto' }}>Create Proposal</ActiveText>
        </Row>
      </Tabs>
    )
  }
  