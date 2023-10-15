import { Trans } from "@lingui/macro"
import { useWeb3React } from "@web3-react/core"
import { isSupportedChainLightLink } from "common/constants/chains"
import { useV3PositionFromTokenId } from "legacy/hooks/pools/useV3positions"
import { ThemedText } from "legacy/theme"
import { PoolState, usePool } from "modules/pools/hooks/usePools"
import { PositionPageUnsupported, PositionPageButtonPrimary, LoadingRows, PositionPageWrapper, HoverText, ResponsiveRow, ActionButtonResponsiveRow } from "./styled"
import { BigNumber } from '@ethersproject/bignumber'
import { Link, useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components/macro'
import { useToken } from "legacy/hooks/Tokens"
import { AutoColumn } from "legacy/components/Column"
import { RowBetween, RowFixed } from "../../../../../libs/ui/src/pure/Row"
import DoubleCurrencyLogo from "legacy/components/DoubleLogo"
import Badge from "legacy/components/Badge"
import { ButtonGray, SmallButtonPrimary } from "../../../../../libs/ui/src/pure/Button"
import RangeBadge from "legacy/components/Badge/RangeBadge"

export default function PositionPage() {
  const { chainId } = useWeb3React()
  // if (SupportedChainId.LIGHTLINK_PEGASUS_TESTNET === chainId) {
  if (isSupportedChainLightLink(chainId)) {
    // isSupportedChain(chainId)
    return <PositionPageContent />
  } else {
    return <PositionPageUnsupportedContent />
  }
}







function PositionPageContent() {

  const { tokenId: tokenIdFromUrl } = useParams<{ tokenId?: string }>()
  const { chainId, account, provider } = useWeb3React()
  const theme = useTheme()

  const parsedTokenId = tokenIdFromUrl ? BigNumber.from(tokenIdFromUrl) : undefined
  const { loading, position: positionDetails } = useV3PositionFromTokenId(parsedTokenId)


  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
    tokenId,
  } = positionDetails || {}


  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)

  // construct Position from details returned
  const [poolState, pool] = usePool(token0 ?? undefined, token1 ?? undefined, feeAmount)

  return loading || poolState === PoolState.LOADING || !feeAmount ? (
    <LoadingRows>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </LoadingRows>
  ) : (<>
    <PositionPageWrapper>
      <AutoColumn gap="md">
        <AutoColumn gap="sm">
          <Link
            data-cy="visit-pool"
            style={{ textDecoration: 'none', width: 'fit-content', marginBottom: '0.5rem' }}
            to="/pools"
          >
            <HoverText>
              <Trans>← Back to Pools</Trans>
            </HoverText>
          </Link>
          <ResponsiveRow>
            <RowFixed>
              <DoubleCurrencyLogo currency0={currencyBase} currency1={currencyQuote} size={24} margin={true} />
              <ThemedText.DeprecatedLabel fontSize="24px" mr="10px">
                &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
              </ThemedText.DeprecatedLabel>
              <Badge style={{ marginRight: '8px' }}>
                {/* <BadgeText>
                  <Trans>{new Percent(feeAmount, 1_000_000).toSignificant()}%</Trans>
                </BadgeText> */}
              </Badge>
              <RangeBadge removed={removed} inRange={inRange} />
            </RowFixed>
            {ownsNFT && (
              <ActionButtonResponsiveRow>
                {currency0 && currency1 && feeAmount && tokenId ? (
                  <ButtonGray
                    as={Link}
                    to={`/increase/${currencyId(currency0)}/${currencyId(currency1)}/${feeAmount}/${tokenId}`}
                    padding="6px 8px"
                    width="fit-content"
                    $borderRadius="12px"
                    style={{ marginRight: '8px' }}
                  >
                    <Trans>Increase Liquidity</Trans>
                  </ButtonGray>
                ) : null}
                {tokenId && !removed ? (
                  <SmallButtonPrimary
                    as={Link}
                    to={`/remove/${tokenId}`}
                    padding="6px 8px"
                    width="fit-content"
                    $borderRadius="12px"
                  >
                    <Trans>Remove Liquidity</Trans>
                  </SmallButtonPrimary>
                ) : null}
              </ActionButtonResponsiveRow>
            )}
          </ResponsiveRow>
          <RowBetween></RowBetween>
        </AutoColumn>

      </AutoColumn>


    </PositionPageWrapper>


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