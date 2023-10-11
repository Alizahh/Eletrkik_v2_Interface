import { ThemedText } from 'legacy/theme'
import { Link } from 'react-router-dom'
import styled, { useTheme } from 'styled-components/macro'

export const LinkRow = styled(Link)`
  align-items: center;
  display: flex;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  padding: 16px;
  text-decoration: none;
  font-weight: 500;

  & > div:not(:first-child) {
    text-align: center;
  }
  :hover {
    background-color: gray;
  }

  @media screen and (min-width: 640px) {
    /* flex-direction: row; */
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    row-gap: 8px;
  `};
`

export const PrimaryPositionIdData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin-right: 8px;
  }
`

export const FeeTierText = styled(ThemedText.UtilityBadge)`
  font-size: 12px !important;
  margin-left: 14px !important;
`


const DataLineItem = styled.div`
  font-size: 14px;
`

export const RangeLineItem = styled(DataLineItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  width: 100%;
`

export const RangeText = styled(ThemedText.Caption)`
  font-size: 12px !important;
  word-break: break-word;
  padding: 0.25rem 0.25rem;
  border-radius: 8px;
`
export const ExtentsText = styled(ThemedText.Caption)`
  color:black;
  display: inline-block;
  line-height: 16px;
  margin-right: 4px !important;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`


export const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export const SmallOnly = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`
export const DoubleArrow = styled.span`
  font-size: 12px;
  margin: 0 2px;
  color: black;
`

export const PoolInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`

export const Label = styled(({ end, ...props }) => <ThemedText.DeprecatedLabel {...props} />)<{ end?: boolean }>`
  display: flex;
  font-size: 16px;
  justify-content: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
  align-items: start;
`
