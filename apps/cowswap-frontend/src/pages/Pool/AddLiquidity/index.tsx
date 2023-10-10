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

      // check for existing position if tokenId in url
//   const { position: existingPositionDetails, loading: positionLoading } = useV3PositionFromTokenId(
//     tokenId ? BigNumber.from(tokenId) : undefined
//   )

    // const hasExistingPosition = !!existingPositionDetails && !positionLoading

    // const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks

    return (
        <ScrollablePage>
          


        </ScrollablePage>


    )
}