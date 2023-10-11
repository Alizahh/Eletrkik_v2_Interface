import { PositionPageUnsupportedContent } from "../PositionPage"
import { useWalletInfo } from '@cowprotocol/wallet'
import { isSupportedChain } from "common/constants/chains"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useTheme } from 'styled-components/macro'
import { useWeb3React } from "@web3-react/core"
import { useToggleWalletModal } from "legacy/state/application/hooks"
import { DynamicSection, HideMedium, MediumOnly, ResponsiveTwoColumns, RightContainer, RowBetween, ScrollablePage, StackedContainer, StackedItem, Wrapper, YellowCard, LiquidityPageWrapper } from "./styled"
import { AutoColumn } from "legacy/components/Column"
import { ThemedText } from "legacy/theme"
import { Trans } from "@lingui/macro"
import { AutoRow, RowFixed } from "../../../../../../libs/ui/src/pure/Row"
import { BigNumber } from "ethers"
import { useTransactionAdder } from "legacy/state/enhancedTransactions/hooks"
import { useV3NFTPositionManagerContract } from "legacy/hooks/pools/useContract"
import { useState } from "react"
import { useV3PositionFromTokenId } from 'legacy/hooks/pools/useV3positions'
import { useDerivedPositionInfo } from "legacy/hooks/pools/useDerivedPositionInfo"
import { FeeAmount, NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { useCurrency } from "legacy/hooks/Tokens"


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

    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
    const [txHash, setTxHash] = useState<string>('')


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
    // const { independentField, typedValue, startPriceTypedValue } = useV3MintState()
    return (
        <ScrollablePage>



        </ScrollablePage>


    )
}