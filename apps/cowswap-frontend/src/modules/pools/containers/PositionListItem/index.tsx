import { BigNumber } from '@ethersproject/bignumber'
import { Trans } from '@lingui/macro';
import { LightCard } from 'legacy/components/Card';
import { AutoColumn } from 'legacy/components/Column';
import HoverInlineText from 'legacy/components/HoverInlineText';
import { ThemedText } from 'legacy/theme';
import { RowBetween, RowFixed } from '../../../../../../../libs/ui/src/pure/Row';
import { DoubleArrow, ExtentsText, FeeTierText, HideSmall, Label, LinkRow, PoolInfo, PrimaryPositionIdData, RangeLineItem, RangeText, SmallOnly } from "./styled";
import { Currency, Percent, Price, Token } from '@uniswap/sdk-core'
import { ExternalLink } from '../../../../../../../libs/ui/src/pure/ExternalLink';
import { useWalletInfo } from '../../../../../../../libs/wallet/src/api/hooks';
import { formatCurrencyAmount } from '../../../../../../../libs/common-utils/src/formatCurrencyAmount';
import { useToken } from 'legacy/hooks/Tokens';
import { useMemo } from 'react';
import { unwrappedToken } from 'modules/pools/utils/unwrappedToken';
import { Position } from '@uniswap/v3-sdk'
import { usePool } from 'modules/pools/hooks/usePools';
import { useV3PositionFees } from 'modules/pools/hooks/useV3Positions';

import {DAI, USDC_MAINNET, USDT, WBTC, WRAPPED_NATIVE_CURRENCY } from '../../../../../../../libs/common-const/src/tokens'

interface PositionListItemProps {
    token0: string
    token1: string
    tokenId: BigNumber
    fee: number
    liquidity: BigNumber
    tickLower: number
    tickUpper: number
}

function LinkedCurrency({ chainId, currency }: { chainId?: number; currency?: Currency }) {
    const address = (currency as Token)?.address

    if (typeof chainId === 'number' && address) {
        return (
            <ExternalLink
                href=""
            //  href={getTokenLink(chainId, address)}
            >
                <RowFixed>
                    {/* <CurrencyLogo currency={currency} size="20px" style={{ marginRight: '0.5rem' }} /> */}
                    <ThemedText.DeprecatedMain>{currency?.symbol} ↗</ThemedText.DeprecatedMain>
                </RowFixed>
            </ExternalLink>
        )
    }

    return (
        <RowFixed>
            {/* <CurrencyLogo currency={currency} size="20px" style={{ marginRight: '0.5rem' }} /> */}
            <ThemedText.DeprecatedMain>{currency?.symbol}</ThemedText.DeprecatedMain>
        </RowFixed>
    )
}

function getRatio(
    lower: Price<Currency, Currency>,
    current: Price<Currency, Currency>,
    upper: Price<Currency, Currency>
  ) {
    try {
      if (!current.greaterThan(lower)) {
        return 100
      } else if (!current.lessThan(upper)) {
        return 0
      }
  
      const a = Number.parseFloat(lower.toSignificant(15))
      const b = Number.parseFloat(upper.toSignificant(15))
      const c = Number.parseFloat(current.toSignificant(15))
  
      const ratio = Math.floor((1 / ((Math.sqrt(a * b) - Math.sqrt(b * c)) / (c - Math.sqrt(b * c)) + 1)) * 100)
  
      if (ratio < 0 || ratio > 100) {
        throw Error('Out of range')
      }
  
      return ratio
    } catch {
      return undefined
    }
  }
  
  export function getPriceOrderingFromPositionForUI(position?: Position): {
    priceLower?: Price<Token, Token>
    priceUpper?: Price<Token, Token>
    quote?: Token
    base?: Token
  } {
    if (!position) {
      return {}
    }
  
    const token0 = position.amount0.currency
    const token1 = position.amount1.currency
  
    // if token0 is a dollar-stable asset, set it as the quote token
    const stables = [DAI, USDC_MAINNET, USDT]
    if (stables.some((stable) => stable.equals(token0))) {
      return {
        priceLower: position.token0PriceUpper.invert(),
        priceUpper: position.token0PriceLower.invert(),
        quote: token0,
        base: token1,
      }
    }
  
    // if token1 is an ETH-/BTC-stable asset, set it as the base token
    const bases = [...Object.values(WRAPPED_NATIVE_CURRENCY), WBTC]
    if (bases.some((base) => base && base.equals(token1))) {
      return {
        priceLower: position.token0PriceUpper.invert(),
        priceUpper: position.token0PriceLower.invert(),
        quote: token0,
        base: token1,
      }
    }
  
    // if both prices are below 1, invert
    if (position.token0PriceUpper.lessThan(1)) {
      return {
        priceLower: position.token0PriceUpper.invert(),
        priceUpper: position.token0PriceLower.invert(),
        quote: token0,
        base: token1,
      }
    }
  
    // otherwise, just return the default
    return {
      priceLower: position.token0PriceLower,
      priceUpper: position.token0PriceUpper,
      quote: token1,
      base: token0,
    }
  }
  

export default function PositionListItem({
    token0: token0Address,
    token1: token1Address,
    tokenId,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
}: PositionListItemProps) {

    const { chainId } = useWalletInfo()
    const positionSummaryLink = '/pools/' + tokenId

    const token0 = useToken(token0Address)
    const token1 = useToken(token1Address)
    const currency0 = token0 ? unwrappedToken(token0) : undefined
    const currency1 = token1 ? unwrappedToken(token1) : undefined

    const [, pool] = usePool(currency0 ?? undefined, currency1 ?? undefined, feeAmount)

    const position = useMemo(() => {
        if (pool) {
            return new Position({ pool, liquidity: liquidity.toString(), tickLower, tickUpper })
        }
        return undefined
    }, [liquidity, pool, tickLower, tickUpper])
    const { priceLower, priceUpper, quote, base } = getPriceOrderingFromPositionForUI(position)

    const currencyQuote = quote && unwrappedToken(quote)
    const currencyBase = base && unwrappedToken(base)

    const removed = liquidity?.eq(0)


    const inverted = token1 ? base?.equals(token1) : undefined

    const ratio = useMemo(() => {
        return priceLower && pool && priceUpper
            ? getRatio(
                inverted ? priceUpper.invert() : priceLower,
                pool.token0Price,
                inverted ? priceLower.invert() : priceUpper
            )
            : undefined
    }, [inverted, pool, priceLower, priceUpper])

    const [feeValue0, feeValue1] = useV3PositionFees(pool ?? undefined, tokenId, false)

    const feeValueUpper = inverted ? feeValue0 : feeValue1
    const feeValueLower = inverted ? feeValue1 : feeValue0

    return (
        <LinkRow to={positionSummaryLink}>
            <RowBetween>
                <PrimaryPositionIdData>
                    {/* <DoubleCurrencyLogo currency0={currencyBase} currency1={currencyQuote} size={18} margin /> */}
                    <ThemedText.SubHeader>
                        &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
                    </ThemedText.SubHeader>

                    <FeeTierText>
                        <Trans>
                            <mark style={{ paddingLeft: '4px', paddingRight: '4px', borderRadius: '5px' }}>
                                {new Percent(feeAmount, 1_000_000).toSignificant()}% Fee tier
                            </mark>
                        </Trans>
                    </FeeTierText>
                </PrimaryPositionIdData>
                {/* <RangeBadge removed={removed} inRange={!outOfRange} /> */}
            </RowBetween>


            {priceLower && priceUpper ? (
                <RangeLineItem>
                    <RangeText>
                        <ExtentsText>
                            <Trans>Min: </Trans>
                        </ExtentsText>
                        <Trans>
                            {/* <span>
            {formatTickPrice({
              price: priceLower,
              atLimit: tickAtLimit,
              direction: Bound.LOWER,
            })}{' '}
          </span> */}
                            <HoverInlineText text={currencyQuote?.symbol} /> per <HoverInlineText text={currencyBase?.symbol ?? ''} />
                        </Trans>
                    </RangeText>{' '}
                    <HideSmall>
                        <DoubleArrow>↔</DoubleArrow>{' '}
                    </HideSmall>
                    <SmallOnly>
                        <DoubleArrow>↔</DoubleArrow>{' '}
                    </SmallOnly>
                    <RangeText>
                        <ExtentsText>
                            <Trans>Max:</Trans>
                        </ExtentsText>
                        <Trans>
                            {/* <span>
            {formatTickPrice({
              price: priceUpper,
              atLimit: tickAtLimit,
              direction: Bound.UPPER,
            })}{' '}
          </span> */}
                            <HoverInlineText text={currencyQuote?.symbol} /> per{' '}
                            <HoverInlineText maxCharacters={10} text={currencyBase?.symbol} />
                        </Trans>
                    </RangeText>
                </RangeLineItem>
            ) : (
                <>Loader</>
            )}

            <br />


            <PoolInfo style={{}}>
                <div style={{ flex: 1 }}>
                    <AutoColumn gap="md" style={{ width: '100%' }}>
                        <AutoColumn gap="md">
                            <Label>
                                <Trans>Liquidity</Trans>
                            </Label>
                        </AutoColumn>
                        <LightCard padding="12px 16px" style={{ background: '#091012' }}>
                            <AutoColumn gap="md">
                                <RowBetween>
                                    <LinkedCurrency chainId={chainId} currency={currencyQuote} />
                                    <RowFixed>
                                        <ThemedText.DeprecatedMain>
                                            {inverted ? position?.amount0.toSignificant(4) : position?.amount1.toSignificant(4)}
                                        </ThemedText.DeprecatedMain>
                                        {/* {typeof ratio === 'number' && !removed ? (
                  <Badge style={{ marginLeft: '10px' }}>
                    <ThemedText.DeprecatedMain color={'black'} fontSize={11}>
                      <Trans>{inverted ? ratio : 100 - ratio}%</Trans>
                    </ThemedText.DeprecatedMain>
                  </Badge>
                ) : null} */}
                                    </RowFixed>
                                </RowBetween>
                                <RowBetween>
                                    <LinkedCurrency chainId={chainId} currency={currencyBase} />
                                    <RowFixed>
                                        <ThemedText.DeprecatedMain>
                                            {inverted ? position?.amount1.toSignificant(4) : position?.amount0.toSignificant(4)}
                                        </ThemedText.DeprecatedMain>
                                        {/* {typeof ratio === 'number' && !removed ? (
                  <Badge style={{ marginLeft: '10px' }}>
                    <ThemedText.DeprecatedMain color={theme.textSecondary} fontSize={11}>
                      <Trans>{inverted ? 100 - ratio : ratio}%</Trans>
                    </ThemedText.DeprecatedMain>
                  </Badge>
                ) : null} */}
                                    </RowFixed>
                                </RowBetween>
                            </AutoColumn>
                        </LightCard>
                    </AutoColumn>
                </div>

                <div style={{ flex: 1 }}>
                    <AutoColumn gap="md" style={{ width: '100%' }}>
                        <AutoColumn gap="md">
                            <RowBetween style={{ alignItems: 'flex-start' }}>
                                <AutoColumn gap="md">
                                    <Label>
                                        <Trans>Unclaimed fees</Trans>
                                    </Label>
                                </AutoColumn>
                            </RowBetween>
                        </AutoColumn>
                        <LightCard padding="12px 16px" style={{ background: '#091012' }}>
                            <AutoColumn gap="md">
                                <RowBetween>
                                    <RowFixed>
                                        {/* <CurrencyLogo currency={feeValueUpper?.currency} size="20px" style={{ marginRight: '0.5rem' }} /> */}
                                        <ThemedText.DeprecatedMain>{feeValueUpper?.currency?.symbol}</ThemedText.DeprecatedMain>
                                    </RowFixed>
                                    <RowFixed>
                                        <ThemedText.DeprecatedMain>
                                            {feeValueUpper ? formatCurrencyAmount(feeValueUpper, 4) : '-'}
                                        </ThemedText.DeprecatedMain>
                                    </RowFixed>
                                </RowBetween>
                                <RowBetween>
                                    <RowFixed>
                                        {/* <CurrencyLogo currency={feeValueLower?.currency} size="20px" style={{ marginRight: '0.5rem' }} /> */}
                                        <ThemedText.DeprecatedMain>{feeValueLower?.currency?.symbol}</ThemedText.DeprecatedMain>
                                    </RowFixed>
                                    <RowFixed>
                                        <ThemedText.DeprecatedMain>
                                            {feeValueLower ? formatCurrencyAmount(feeValueLower, 4) : '-'}
                                        </ThemedText.DeprecatedMain>
                                    </RowFixed>
                                </RowBetween>
                            </AutoColumn>
                        </LightCard>
                    </AutoColumn>
                </div>
            </PoolInfo>
        </LinkRow>
    )

}