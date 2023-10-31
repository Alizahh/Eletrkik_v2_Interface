import { AutoColumn } from 'legacy/components/Column'
import { ThemedText } from 'legacy/theme'
import { Inbox } from 'react-feather'
import styled, {css} from 'styled-components/macro'
import { ButtonConfirmed, ButtonPrimary } from '../../../../../libs/ui/src/pure/Button'
import { RowBetween, RowFixed } from '../../../../../libs/ui/src/pure/Row'
import { LoadingRows as BaseLoadingRows } from '../../modules/pools/pure/Loader'

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

  @media only screen and (max-width: 768px) {
    min-width: 100%;
    padding: 16px;
  }

  @media only screen and (max-width: 640px) {
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
export const LoadingRows = styled(BaseLoadingRows)`
  padding-top: 36px;
  min-width: 75%;
  max-width: 960px;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.8em;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px;

  & > div:nth-child(4n + 1) {
    grid-column: 1 / 3;
  }
  & > div:nth-child(4n) {
    grid-column: 3 / 4;
    margin-bottom: 2em;
  }
`
export const PositionPageWrapper = styled.div`
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

export const HoverText = styled(ThemedText.DeprecatedMain)`
  text-decoration: none;
  color: ${({ theme }) => theme.textTertiary};
  :hover {
    color: ${({ theme }) => theme.textPrimary};
    text-decoration: none;
  }
`

export const ResponsiveRow = styled(RowBetween)`
  @media only screen and (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 16px;
    width: 100%;
  }
`

export const ActionButtonResponsiveRow = styled(ResponsiveRow)`
  width: 50%;
  justify-content: flex-end;

  @media only screen and (max-width: 640px) {
    width: 100%;
    flex-direction: row;
    * {
      width: 100%;
    }
  }
`

export const Label = styled(({ end, ...props }) => <ThemedText.DeprecatedLabel {...props} />)<{ end?: boolean }>`
  display: flex;
  font-size: 16px;
  justify-content: ${({ end }) => (end ? 'flex-end' : 'flex-start')};
  align-items: center;
`

export const ResponsiveButtonConfirmed = styled(ButtonConfirmed)`
  border-radius: 12px;
  padding: 6px 8px;
  width: fit-content;
  font-size: 16px;

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    width: fit-content;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    width: fit-content;
  }
`
// styles
export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`
export const BadgeText = styled.div`
  font-weight: 500;
  font-size: 14px;
`