import { Trans } from '@lingui/macro'
import { formatNumber, NumberType } from '@uniswap/conedison/format'
import { Currency, Price } from '@uniswap/sdk-core'
import { ThemedText } from 'legacy/theme'
import tryParseCurrencyAmount from 'modules/trade/utils/tryParseCurrencyAmount'

import { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { formatTransactionAmount, priceToPreciseFloat } from '../../../../../../../libs/common-utils/src/formatLocaleNumber'
import { useUSDPriceElektrik } from 'modules/usdAmount/hooks/useUsdPrice'

//Elektrikv2Changed


interface TradePriceProps {
  price: Price<Currency, Currency>
}
const StyledPriceContainer = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  grid-template-columns: 1fr auto;
  grid-gap: 0.25rem;
  display: flex;
  flex-direction: row;
  text-align: left;
  flex-wrap: wrap;
  user-select: text;
`

export default function TradePrice({ price }: any) {

  const [showInverted, setShowInverted] = useState<boolean>(false)
  const { baseCurrency, quoteCurrency } = price

  const { data: usdPrice } = useUSDPriceElektrik(tryParseCurrencyAmount('1', showInverted ? baseCurrency : quoteCurrency))

  let formattedPrice: string
  try {
    formattedPrice = showInverted
      ? formatTransactionAmount(priceToPreciseFloat(price))
      : formatTransactionAmount(priceToPreciseFloat(price.invert()))
  } catch (error) {
    formattedPrice = '0'
  }
  const label = showInverted ? `${price.quoteCurrency?.symbol}` : `${price.baseCurrency?.symbol} `
  const labelInverted = showInverted ? `${price.baseCurrency?.symbol} ` : `${price.quoteCurrency?.symbol}`
  const flipPrice = useCallback(() => setShowInverted(!showInverted), [setShowInverted, showInverted])
  const text = `${'1 ' + labelInverted + ' = ' + formattedPrice ?? '-'} ${label}`
  return (
    <StyledPriceContainer
      onClick={(e) => {
        e.stopPropagation() // dont want this click to affect dropdowns / hovers
        flipPrice()
      }}
      title={text}
    >
      <ThemedText.BodySmall>{text}</ThemedText.BodySmall>{' '}
      {usdPrice && (
        <ThemedText.BodySmall color="textSecondary">
          <Trans>({formatNumber(usdPrice, NumberType.FiatTokenPrice)})</Trans>
        </ThemedText.BodySmall>
      )}
    </StyledPriceContainer>
  )
}