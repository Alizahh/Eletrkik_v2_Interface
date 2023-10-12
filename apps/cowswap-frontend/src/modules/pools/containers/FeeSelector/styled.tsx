import Card from 'legacy/components/Card'
import { ThemedText } from 'legacy/theme'
import { PropsWithChildren } from 'react'
import { readableColor } from 'polished'

import styled, { DefaultTheme,keyframes } from 'styled-components/macro'


export function pickBackgroundColor(variant: BadgeVariant | undefined, theme: DefaultTheme): string {
    switch (variant) {
      case BadgeVariant.BRANDED:
        return theme.brandedGradient
      case BadgeVariant.PROMOTIONAL:
        return theme.promotionalGradient
      case BadgeVariant.NEGATIVE:
        return theme.accentCritical
      case BadgeVariant.POSITIVE:
        return theme.accentSuccess
      case BadgeVariant.SOFT:
        return theme.accentActionSoft
      case BadgeVariant.PRIMARY:
        return theme.accentAction
      case BadgeVariant.WARNING:
        return theme.accentWarning
      case BadgeVariant.WARNING_OUTLINE:
        return 'transparent'
      default:
        return theme.backgroundInteractive
    }
  }
  
  export function pickBorder(variant: BadgeVariant | undefined, theme: DefaultTheme): string {
    switch (variant) {
      case BadgeVariant.WARNING_OUTLINE:
        return `1px solid ${theme.accentWarning}`
      default:
        return 'unset'
    }
  }
  
  export function pickFontColor(variant: BadgeVariant | undefined, theme: DefaultTheme): string {
    switch (variant) {
      case BadgeVariant.BRANDED:
        return theme.darkMode ? theme.accentTextDarkPrimary : theme.white
      case BadgeVariant.NEGATIVE:
        return readableColor(theme.accentFailure)
      case BadgeVariant.POSITIVE:
        return readableColor(theme.accentSuccess)
      case BadgeVariant.SOFT:
        return theme.accentAction
      case BadgeVariant.WARNING:
        return readableColor(theme.accentWarning)
      case BadgeVariant.WARNING_OUTLINE:
        return theme.accentWarning
      default:
        return readableColor(theme.backgroundInteractive)
    }
  }
  
export const pulse = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color};
  }

  70% {
    box-shadow: 0 0 0 2px ${color};
  }

  100% {
    box-shadow: 0 0 0 0 ${color};
  }
`
export const FocusedOutlineCard = styled(Card)<{ pulsing: boolean }>`
  border: 1px solid ${({ theme }) => theme.backgroundInteractive};
  animation: ${({ pulsing, theme }) => pulsing && pulse(theme.accentAction)} 0.6s linear;
  align-self: center;
`

export const Select = styled.div`
  align-items: flex-start;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 8px;
`

export const ResponsiveText = styled(ThemedText.DeprecatedLabel)`
  line-height: 16px;
  font-size: 14px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
    line-height: 12px;
  `};
`
export enum BadgeVariant {
    DEFAULT = 'DEFAULT',
    NEGATIVE = 'NEGATIVE',
    POSITIVE = 'POSITIVE',
    PRIMARY = 'PRIMARY',
    WARNING = 'WARNING',
    PROMOTIONAL = 'PROMOTIONAL',
    BRANDED = 'BRANDED',
    SOFT = 'SOFT',
  
    WARNING_OUTLINE = 'WARNING_OUTLINE',
  }
  
  export  interface BadgeProps {
    variant?: BadgeVariant
  }
  

export const Badge = styled.div<PropsWithChildren<BadgeProps>>`
  align-items: center;
  background: ${({ theme, variant }) => pickBackgroundColor(variant, theme)};
  border: ${({ theme, variant }) => pickBorder(variant, theme)};
  border-radius: 0.5rem;
  color: ${({ theme, variant }) => pickFontColor(variant, theme)};
  display: inline-flex;
  padding: 4px 6px;
  justify-content: center;
  font-weight: 500;
`

export default Badge