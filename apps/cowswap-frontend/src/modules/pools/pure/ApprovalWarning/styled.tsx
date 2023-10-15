import { AlertTriangle } from 'react-feather'
import styled from 'styled-components/macro'
import { ExternalLink } from '../../../../../../../libs/ui/src/pure/ExternalLink'

export const BodyRow = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`
export const CautionTriangle = styled(AlertTriangle)`
  color: ${({ theme }) => theme.accentWarning};
`
export const Link = styled(ExternalLink)`
  color: ${({ theme }) => theme.black};
  text-decoration: underline;
`
export const TitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`
export const TitleText = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin: 0px 12px;
`
export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundSurface};
  border-radius: 12px;
  z-index: 1000;
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
  bottom: 60px;
  display: none;
  max-width: 348px;
  padding: 16px 20px;
  position: fixed;
  right: 16px;
  @media screen and (min-width: 768px) {
    display: block;
  }
`