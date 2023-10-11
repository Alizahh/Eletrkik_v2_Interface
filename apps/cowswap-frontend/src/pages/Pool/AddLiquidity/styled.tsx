import { BodyWrapper } from 'legacy/pages/AppBody'
import styled, {css} from 'styled-components/macro'
import { Box } from 'rebass/styled-components'
import { AutoColumn } from 'legacy/components/Column'
import Card from 'legacy/components/Card'
import Input from 'legacy/components/NumericalInput'

const gapValues = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '24px',
  xl: '32px',
}
export type Gap = keyof typeof gapValues

export const ScrollablePage = styled.div`
  padding: 68px 8px 0px;
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 480px;
    margin: 0 auto;
  `};

  @media only screen and (max-width: 768px) {
    padding: 48px 8px 0px;
  }

  @media only screen and (max-width: 640px) {
    padding-top: 20px;
  }
`

export const LiquidityPageWrapper = styled(BodyWrapper)<{ wide: boolean }>`
  max-width: ${({ wide }) => (wide ? '880px' : '480px')};
  width: 100%;

  padding: ${({ wide }) => (wide ? '10px' : '0')};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 480px;
  `};
  margin-bottom: 100px;
`

export const Wrapper = styled.div`
  position: relative;
  padding: 26px 16px;
  min-width: 480px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 400px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  min-width: 340px;
`};
`

export const ResponsiveTwoColumns = styled.div<{ wide: boolean }>`
  display: grid;
  grid-column-gap: 50px;
  grid-row-gap: 15px;
  grid-template-columns: ${({ wide }) => (wide ? '1fr 1fr' : '1fr')};
  grid-template-rows: max-content;
  grid-auto-flow: row;

  padding-top: 20px;

  border-top: 1px solid ${({ theme }) => theme.backgroundInteractive};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;

    margin-top: 0;
  `};
`

const Row = styled(Box)<{
    width?: string
    align?: string
    justify?: string
    padding?: string
    border?: string
    borderRadius?: string
    gap?: Gap | string
  }>`
    width: ${({ width }) => width ?? '100%'};
    display: flex;
    padding: 0;
    align-items: ${({ align }) => align ?? 'center'};
    justify-content: ${({ justify }) => justify ?? 'flex-start'};
    padding: ${({ padding }) => padding};
    border: ${({ border }) => border};
    border-radius: ${({ borderRadius }) => borderRadius};
    gap: ${({ gap, theme }) => gap && (theme.grids[gap as Gap] || gap)};
  `
  
export const RowBetween = styled(Row)`
  justify-content: space-between;
`
export const DynamicSection = styled(AutoColumn)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? '0.2' : '1')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
`
export const HideMedium = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`
export const RightContainer = styled(AutoColumn)`
  grid-row: 1 / 3;
  grid-column: 2;
  height: fit-content;

  ${({ theme }) => theme.mediaWidth.upToMedium`
  grid-row: 2 / 3;
  grid-column: 1;
  `};
`
export const StackedContainer = styled.div`
  display: grid;
`
export const StackedItem = styled.div<{ zIndex?: number }>`
  grid-column: 1;
  grid-row: 1;
  height: 100%;
  z-index: ${({ zIndex }) => zIndex};
`
export const YellowCard = styled(Card)`
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.deprecated_yellow3};
  font-weight: 500;
`
export const MediumOnly = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`



export const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.backgroundSurface};
  text-align: left;
  font-size: 18px;
  width: 100%;
`