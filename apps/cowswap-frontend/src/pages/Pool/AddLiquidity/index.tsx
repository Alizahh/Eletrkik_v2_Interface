import { PositionPageUnsupportedContent } from "../PositionPage"
import { useWalletInfo } from '@cowprotocol/wallet'
import { isSupportedChain } from "common/constants/chains"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useTheme } from 'styled-components/macro'
import { useWeb3React } from "@web3-react/core"
import { useToggleWalletModal } from "legacy/state/application/hooks"
import { DynamicSection, HideMedium, MediumOnly, ResponsiveTwoColumns, RightContainer, RowBetween, ScrollablePage, StackedContainer, StackedItem, Wrapper, YellowCard, LiquidityPageWrapper, StyledInput } from "./styled"
import { AutoColumn } from "legacy/components/Column"
import { ThemedText } from "legacy/theme"
import { Trans } from "@lingui/macro"
import { AutoRow, Row, RowFixed } from "../../../../../../libs/ui/src/pure/Row"
import { BigNumber } from "ethers"
import { useTransactionAdder } from "legacy/state/enhancedTransactions/hooks"
import { useV3NFTPositionManagerContract } from "legacy/hooks/pools/useContract"
import { useCallback, useState } from "react"
import { useV3PositionFromTokenId } from 'legacy/hooks/pools/useV3positions'
import { useDerivedPositionInfo } from "legacy/hooks/pools/useDerivedPositionInfo"
import { FeeAmount, NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { useCurrency } from "legacy/hooks/Tokens"
import { useV3DerivedMintInfo, useV3MintActionHandlers, useV3MintState } from "legacy/state/mint/v3/hooks"
import useTransactionDeadline from "legacy/hooks/useTransactionDeadline"
import { Bound, Field } from "legacy/state/mint/v3/actions"
import { Currency, CurrencyAmount, Percent } from '@uniswap/sdk-core'
import { maxAmountSpend } from "../../../../../../libs/common-utils/src/maxAmountSpend"
import { PageWrapper } from "../styled"
import { AddRemoveTabs } from "modules/pools/pure/NavigationTabs"
import { ButtonText } from "../../../../../../libs/ui/src/pure/Button"
import HoverInlineText from "legacy/components/HoverInlineText"
import { BlueCard, OutlineCard } from "legacy/components/Card"
import RateToggle from "modules/pools/pure/RateToggle"


export default function AddLiquidityWrapper() {
    const { chainId } = useWalletInfo()
    if (isSupportedChain(chainId)) {
        return <AddLiquidity />
    } else {
        return <AddLiquidity />
    }
}

export function AddLiquidity() {

    const navigate = useNavigate()
    const {
        currencyIdA,
        currencyIdB,
        feeAmount: feeAmountFromUrl,
        tokenId,
    } = useParams<{ currencyIdA?: string; currencyIdB?: string; feeAmount?: string; tokenId?: string }>()
    const { account, chainId, provider } = useWeb3React()
    const theme = useTheme()
    const toggleWalletModal = useToggleWalletModal()
    const addTransaction = useTransactionAdder()
    const positionManager = useV3NFTPositionManagerContract()



    // check for existing position if tokenId in url
    const { position: existingPositionDetails, loading: positionLoading } = useV3PositionFromTokenId(
        tokenId ? BigNumber.from(tokenId) : undefined
    )

    const hasExistingPosition = !!existingPositionDetails && !positionLoading

    const { position: existingPosition } = useDerivedPositionInfo(existingPositionDetails)
    // fee selection from url
    const feeAmount: FeeAmount | undefined =
        feeAmountFromUrl && Object.values(FeeAmount).includes(parseFloat(feeAmountFromUrl))
            ? parseFloat(feeAmountFromUrl)
            : undefined

    const baseCurrency = useCurrency(currencyIdA)
    const currencyB = useCurrency(currencyIdB)

    // prevent an error if they input ETH/WETH
    const quoteCurrency =
        baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped) ? undefined : currencyB


    // mint state
    const { independentField, typedValue, startPriceTypedValue } = useV3MintState()



    const {
        pool,
        ticks,
        dependentField,
        price,
        pricesAtTicks,
        pricesAtLimit,
        parsedAmounts,
        currencyBalances,
        position,
        noLiquidity,
        currencies,
        errorMessage,
        invalidPool,
        invalidRange,
        outOfRange,
        depositADisabled,
        depositBDisabled,
        invertPrice,
        ticksAtLimit,
    } = useV3DerivedMintInfo(
        baseCurrency ?? undefined,
        quoteCurrency ?? undefined,
        feeAmount,
        baseCurrency ?? undefined,
        existingPosition
    )

      // get value and prices at ticks
  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks
  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } = pricesAtTicks

    const { onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput, onStartPriceInput } =
        useV3MintActionHandlers(noLiquidity)

    const isValid = !errorMessage && !invalidRange


    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm
    // txn values
    const deadline = useTransactionDeadline() // custom from users settings

    const [txHash, setTxHash] = useState<string>('')
    // get formatted amounts
    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }

    //   const usdcValues = {
    //     [Field.CURRENCY_A]: useStablecoinValue(parsedAmounts[Field.CURRENCY_A]),
    //     [Field.CURRENCY_B]: useStablecoinValue(parsedAmounts[Field.CURRENCY_B]),
    //   }

    // get the max amounts user can add
    const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
        (accumulator, field) => {
            return {
                ...accumulator,
                [field]: maxAmountSpend(currencyBalances[field]),
            }
        },
        {}
    )
    const atMaxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
        (accumulator, field) => {
            return {
                ...accumulator,
                [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
            }
        },
        {}
    )
    //   const argentWalletContract = useArgentWalletContract()

    // check whether the user has approved the router on the tokens
    // const [approvalA, approveACallback] = useApproveCallback(
    //     argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_A],
    //     chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined
    //   )
    const DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10_000)


    const clearAll = useCallback(() => {
        onFieldAInput('')
        onFieldBInput('')
        onLeftRangeInput('')
        onRightRangeInput('')
        navigate(`/add`)
    }, [navigate, onFieldAInput, onFieldBInput, onLeftRangeInput, onRightRangeInput])

    return (
        <ScrollablePage>
            <LiquidityPageWrapper wide={!hasExistingPosition}>
                <AddRemoveTabs
                    creating={false}
                    adding={true}
                    positionID={tokenId}
                    autoSlippage={DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE}
                    showBackLink={!hasExistingPosition}
                >
                    {!hasExistingPosition && (
                        <Row justifyContent="flex-end" style={{ width: 'fit-content', minWidth: 'fit-content' }}>
                            <MediumOnly>
                                <ButtonText onClick={clearAll} margin="0 15px 0 0">
                                    <ThemedText.DeprecatedBlue fontSize="12px">
                                        <Trans>Clear All</Trans>
                                    </ThemedText.DeprecatedBlue>
                                </ButtonText>
                            </MediumOnly>
                            {baseCurrency && quoteCurrency ? (
                                  <RateToggle
                                    currencyA={baseCurrency}
                                    currencyB={quoteCurrency}
                                    handleRateToggle={() => {
                                      if (!ticksAtLimit[Bound.LOWER] && !ticksAtLimit[Bound.UPPER]) {
                                        onLeftRangeInput((invertPrice ? priceLower : priceUpper?.invert())?.toSignificant(6) ?? '')
                                        onRightRangeInput((invertPrice ? priceUpper : priceLower?.invert())?.toSignificant(6) ?? '')
                                        onFieldAInput(formattedAmounts[Field.CURRENCY_B] ?? '')
                                      }
                                      navigate(
                                        `/add/${currencyIdB as string}/${currencyIdA as string}${feeAmount ? '/' + feeAmount : ''}`
                                      )
                                    }}
                                  />
                            ) : null}
                        </Row>
                    )}

                </AddRemoveTabs>

                <Wrapper>
                    <ResponsiveTwoColumns wide={!hasExistingPosition}>
                        <AutoColumn gap="lg">
                            {!hasExistingPosition && (
                                <>
                                    <AutoColumn gap="md">
                                        <RowBetween paddingBottom="20px">
                                            <ThemedText.DeprecatedLabel>
                                                <Trans>Select Pair</Trans>
                                            </ThemedText.DeprecatedLabel>
                                        </RowBetween>
                                        <RowBetween>
                                            {/* <CurrencyDropdown
                          value={formattedAmounts[Field.CURRENCY_A]}
                          onUserInput={onFieldAInput}
                          hideInput={true}
                          onMax={() => {
                            onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                          }}
                          onCurrencySelect={handleCurrencyASelect}
                          showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                          currency={currencies[Field.CURRENCY_A] ?? null}
                          id="add-liquidity-input-tokena"
                          showCommonBases
                        /> */}

                                            <div style={{ width: '12px' }} />

                                            {/* <CurrencyDropdown
                          value={formattedAmounts[Field.CURRENCY_B]}
                          hideInput={true}
                          onUserInput={onFieldBInput}
                          onCurrencySelect={handleCurrencyBSelect}
                          onMax={() => {
                            onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                          }}
                          showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                          currency={currencies[Field.CURRENCY_B] ?? null}
                          id="add-liquidity-input-tokenb"
                          showCommonBases
                        /> */}
                                        </RowBetween>
                                        {/* 
                      <FeeSelector
                        disabled={!quoteCurrency || !baseCurrency}
                        feeAmount={feeAmount}
                        handleFeePoolSelect={handleFeePoolSelect}
                        currencyA={baseCurrency ?? undefined}
                        currencyB={quoteCurrency ?? undefined}
                      /> */}
                                    </AutoColumn>{' '}
                                </>
                            )}
                            {hasExistingPosition && existingPosition && (
                                //   <PositionPreview
                                //     position={existingPosition}
                                //     title={<Trans>Selected Range</Trans>}
                                //     inRange={!outOfRange}
                                //     ticksAtLimit={ticksAtLimit}
                                //   />
                                <></>
                            )}


                        </AutoColumn>

                        <div>
                            <DynamicSection
                                // disabled={tickLower === undefined || tickUpper === undefined || invalidPool || invalidRange}
                            >
                                <AutoColumn gap="md">
                                    <ThemedText.DeprecatedLabel>
                                        {hasExistingPosition ? <Trans>Add more liquidity</Trans> : <Trans>Deposit Amounts</Trans>}
                                    </ThemedText.DeprecatedLabel>

                                    {/* <CurrencyInputPanel
                                        value={formattedAmounts[Field.CURRENCY_A]}
                                        onUserInput={onFieldAInput}
                                        onMax={() => {
                                            onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                                        }}
                                        showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                                        currency={currencies[Field.CURRENCY_A] ?? null}
                                        id="add-liquidity-input-tokena"
                                        fiatValue={currencyAFiat}
                                        showCommonBases
                                        locked={depositADisabled}
                                    /> */}
{/* 
                                    <CurrencyInputPanel
                                        value={formattedAmounts[Field.CURRENCY_B]}
                                        onUserInput={onFieldBInput}
                                        onMax={() => {
                                            onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                                        }}
                                        showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                                        fiatValue={currencyBFiat}
                                        currency={currencies[Field.CURRENCY_B] ?? null}
                                        id="add-liquidity-input-tokenb"
                                        showCommonBases
                                        locked={depositBDisabled}
                                    /> */}
                                </AutoColumn>
                            </DynamicSection>
                        </div>

                        {!hasExistingPosition ? (
                <>
                  <HideMedium>
                    {/* <Buttons /> */}
                  </HideMedium>
                  <RightContainer gap="lg">
                    <DynamicSection gap="md" disabled={!feeAmount || invalidPool}>
                      {!noLiquidity ? (
                        <>
                          <RowBetween>
                            <ThemedText.DeprecatedLabel>
                              <Trans>Set Price Range</Trans>
                            </ThemedText.DeprecatedLabel>
                          </RowBetween>

                          {price && baseCurrency && quoteCurrency && !noLiquidity && (
                            <AutoRow gap="4px" justify="center" style={{ marginTop: '0.5rem' }}>
                              <Trans>
                                <ThemedText.DeprecatedMain
                                  fontWeight={500}
                                  textAlign="center"
                                  fontSize={12}
                                  color="text1"
                                >
                                  Current Price:
                                </ThemedText.DeprecatedMain>
                                <ThemedText.DeprecatedBody
                                  fontWeight={500}
                                  textAlign="center"
                                  fontSize={12}
                                  color="text1"
                                >
                                  <HoverInlineText
                                    maxCharacters={20}
                                    text={invertPrice ? price.invert().toSignificant(6) : price.toSignificant(6)}
                                  />
                                </ThemedText.DeprecatedBody>
                                <ThemedText.DeprecatedBody color="text2" fontSize={12}>
                                  {quoteCurrency?.symbol} per {baseCurrency.symbol}
                                </ThemedText.DeprecatedBody>
                              </Trans>
                            </AutoRow>
                          )}

                          {/* <LiquidityChartRangeInput
                            currencyA={baseCurrency ?? undefined}
                            currencyB={quoteCurrency ?? undefined}
                            feeAmount={feeAmount}
                            ticksAtLimit={ticksAtLimit}
                            price={
                              price ? parseFloat((invertPrice ? price.invert() : price).toSignificant(8)) : undefined
                            }
                            priceLower={priceLower}
                            priceUpper={priceUpper}
                            onLeftRangeInput={onLeftRangeInput}
                            onRightRangeInput={onRightRangeInput}
                            interactive={!hasExistingPosition}
                          /> */}
                        </>
                      ) : (
                        <AutoColumn gap="md">
                          <RowBetween>
                            <ThemedText.DeprecatedLabel>
                              <Trans>Set Starting Price</Trans>
                            </ThemedText.DeprecatedLabel>
                          </RowBetween>
                          {noLiquidity && (
                            <BlueCard
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: '1rem 1rem',
                              }}
                            >
                              <ThemedText.DeprecatedBody
                                fontSize={14}
                                style={{ fontWeight: 500 }}
                                textAlign="left"
                                color={theme.accentAction}
                              >
                                <Trans>
                                  This pool must be initialized before you can add liquidity. To initialize, select a
                                  starting price for the pool. Then, enter your liquidity price range and deposit
                                  amount. Gas fees will be higher than usual due to the initialization transaction.
                                </Trans>
                              </ThemedText.DeprecatedBody>
                            </BlueCard>
                          )}
                          <OutlineCard padding="12px">
                            <StyledInput
                              className="start-price-input"
                              value={startPriceTypedValue}
                              onUserInput={onStartPriceInput}
                            />
                          </OutlineCard>
                          <RowBetween
                            style={{ backgroundColor: theme.deprecated_bg1, padding: '12px', borderRadius: '12px' }}
                          >
                            <ThemedText.DeprecatedMain>
                              <Trans>Current {baseCurrency?.symbol} Price:</Trans>
                            </ThemedText.DeprecatedMain>
                            <ThemedText.DeprecatedMain>
                              {price ? (
                                <ThemedText.DeprecatedMain>
                                  <RowFixed>
                                    <HoverInlineText
                                      maxCharacters={20}
                                      text={invertPrice ? price?.invert()?.toSignificant(5) : price?.toSignificant(5)}
                                    />{' '}
                                    <span style={{ marginLeft: '4px' }}>{quoteCurrency?.symbol}</span>
                                  </RowFixed>
                                </ThemedText.DeprecatedMain>
                              ) : (
                                '-'
                              )}
                            </ThemedText.DeprecatedMain>
                          </RowBetween>
                        </AutoColumn>
                      )}
                    </DynamicSection>

                    <DynamicSection
                      gap="md"
                      disabled={!feeAmount || invalidPool || (noLiquidity && !startPriceTypedValue)}
                    >
                      <StackedContainer>
                        <StackedItem>
                          <AutoColumn gap="md">
                            {noLiquidity && (
                              <RowBetween>
                                <ThemedText.DeprecatedLabel>
                                  <Trans>Set Price Range</Trans>
                                </ThemedText.DeprecatedLabel>
                              </RowBetween>
                            )}
                            {/* <RangeSelector
                              priceLower={priceLower}
                              priceUpper={priceUpper}
                              getDecrementLower={getDecrementLower}
                              getIncrementLower={getIncrementLower}
                              getDecrementUpper={getDecrementUpper}
                              getIncrementUpper={getIncrementUpper}
                              onLeftRangeInput={onLeftRangeInput}
                              onRightRangeInput={onRightRangeInput}
                              currencyA={baseCurrency}
                              currencyB={quoteCurrency}
                              feeAmount={feeAmount}
                              ticksAtLimit={ticksAtLimit}
                            /> */}
                            {!noLiquidity && <></>
                            // <PresetsButtons onSetFullRange={handleSetFullRange} />
                            }
                          </AutoColumn>
                        </StackedItem>
                      </StackedContainer>

                      {outOfRange ? (
                        <YellowCard padding="8px 12px" $borderRadius="12px">
                          <RowBetween>
                            {/* <AlertTriangle stroke={theme.deprecated_yellow3} size="16px" /> */}
                            <ThemedText.DeprecatedYellow ml="12px" fontSize="12px">
                              <Trans>
                                Your position will not earn fees or be used in trades until the market price moves into
                                your range.
                              </Trans>
                            </ThemedText.DeprecatedYellow>
                          </RowBetween>
                        </YellowCard>
                      ) : null}

                      {invalidRange ? (
                        <YellowCard padding="8px 12px" $borderRadius="12px">
                          <RowBetween>
                            {/* <AlertTriangle stroke={theme.deprecated_yellow3} size="16px" /> */}
                            <ThemedText.DeprecatedYellow ml="12px" fontSize="12px">
                              <Trans>Invalid range selected. The min price must be lower than the max price.</Trans>
                            </ThemedText.DeprecatedYellow>
                          </RowBetween>
                        </YellowCard>
                      ) : null}
                    </DynamicSection>

                    <MediumOnly>
                      {/* <Buttons /> */}
                    </MediumOnly>
                  </RightContainer>
                </>
              ) : (
                // <Buttons />
                <></>
              )}
                    </ResponsiveTwoColumns>

                </Wrapper>



            </LiquidityPageWrapper>
        </ScrollablePage>


    )
}