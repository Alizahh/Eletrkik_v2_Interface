import styled, { useTheme } from 'styled-components/macro'
import { ButtonGray } from '../../../../../../../libs/ui/src/pure/Button'

export const ChartWrapper = styled.div`
  position: relative;

  justify-content: center;
  align-content: center;
`

export const Wrapper = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: repeat(${({ count }) => count.toString()}, 1fr);
  grid-gap: 6px;

  position: absolute;
  top: -75px;
  right: 0;
`

export const Button = styled(ButtonGray)`
  &:hover {
    background-color: ${({ theme }) => theme.backgroundInteractive};
    color: ${({ theme }) => theme.textPrimary};
  }

  width: 32px;
  height: 32px;
  padding: 4px;
`

export const ZoomOverlay = styled.rect`
  fill: transparent;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`
