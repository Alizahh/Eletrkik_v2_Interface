import { BigNumber } from '@ethersproject/bignumber'

interface PositionListItemProps {
    token0: string
    token1: string
    tokenId: BigNumber
    fee: number
    liquidity: BigNumber
    tickLower: number
    tickUpper: number
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
    return(
        <>
        </>
    )

}