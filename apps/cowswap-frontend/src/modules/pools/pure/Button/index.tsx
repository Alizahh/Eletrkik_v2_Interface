import { darken } from 'polished'
import { forwardRef } from 'react'
import { Check, ChevronDown } from 'react-feather'
import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components'
import styled, { DefaultTheme, useTheme } from 'styled-components/macro'
import { ButtonOutlined } from '../../../../../../../libs/ui/src/pure/Button'
import { RowBetween } from '../../../../../../../libs/ui/src/pure/Row'


const ActiveOutlined = styled(ButtonOutlined)`
  border: 1px solid;
  border-color: ${({ theme }) => theme.accentAction};
`
const Circle = styled.div`
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accentAction};
  display: flex;
  align-items: center;
  justify-content: center;
`
const ResponsiveCheck = styled(Check)`
  size: 13px;
`

const CheckboxWrapper = styled.div`
  width: 20px;
  padding: 0 10px;
  position: absolute;
  top: 11px;
  right: 15px;
`


export function ButtonRadioChecked({ active = false, children, ...rest }: { active?: boolean } & ButtonProps) {
    const theme = useTheme()
  
    if (!active) {
      return (
        <ButtonOutlined $borderRadius="12px" padding="12px 8px" {...rest}>
          <RowBetween>{children}</RowBetween>
        </ButtonOutlined>
      )
    } else {
      return (
        <ActiveOutlined {...rest} padding="12px 8px" $borderRadius="12px">
          <RowBetween>
            {children}
            <CheckboxWrapper>
              <Circle>
                <ResponsiveCheck size={13} stroke={theme.white} />
              </Circle>
            </CheckboxWrapper>
          </RowBetween>
        </ActiveOutlined>
      )
    }
  }
  