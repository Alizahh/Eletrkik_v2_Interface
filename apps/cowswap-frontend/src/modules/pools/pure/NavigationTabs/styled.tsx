import { ArrowLeft } from 'react-feather'
import styled, { useTheme,css } from 'styled-components/macro'
import { Link as HistoryLink, useLocation } from 'react-router-dom'


export const flexRowNoWrap = css`
  display: flex;
  flex-flow: row nowrap;
`

export const Tabs = styled.div`
  ${flexRowNoWrap};
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

export const StyledHistoryLink = styled(HistoryLink)<{ flex?: string }>`
  flex: ${({ flex }) => flex ?? 'none'};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex: none;
    margin-right: 10px;
  `};
`

export const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

export const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.textPrimary};
`
