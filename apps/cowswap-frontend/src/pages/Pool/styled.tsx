import { AutoColumn } from 'legacy/components/Column'
import { Inbox } from 'react-feather'
import styled, {css} from 'styled-components/macro'
import { ButtonPrimary } from '../../../../../libs/ui/src/pure/Button'
import { RowBetween, RowFixed } from '../../../../../libs/ui/src/pure/Row'

export const PageWrapper = styled(AutoColumn)`
  padding: 68px 8px 0px;
  max-width: 870px;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};

  @media only screen and (max-width: 768px) {
    padding-top: 48px;
  }

  @media only screen and (max-width: 640px) {
    padding-top: 20px;
  }
  margin-bottom: 100px;
`
export const TitleRow = styled(RowBetween)`
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `};
`
export const ButtonRow = styled(RowFixed)`
  & > *:not(:last-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-direction: row-reverse;
  `};
`
export const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  border-radius: 12px;
  font-size: 16px;
  padding: 6px 8px;
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 100%;
  `};
`
export const MainContentWrapper = styled.main`
  background: ${({ theme }) => theme.backgroundSurface};
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
  padding: 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
`
export const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`
const IconStyle = css`
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
`
export const InboxIcon = styled(Inbox)`
  ${IconStyle}
`
export const PositionPageUnsupported = styled.div`
  padding: 68px 16px 16px 16px;

  min-width: 800px;
  max-width: 960px;

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    min-width: 100%;
    padding: 16px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    min-width: 100%;
    padding: 16px;
  }
  margin-bottom: 100px;
`
export const PositionPageButtonPrimary = styled(ButtonPrimary)`
  width: 228px;
  height: 40px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 12px;
`
