import styled from 'styled-components/macro'

export const ExplainerText = styled.div`
  color: ${({ theme }) => theme.textSecondary};
`
export const TitleRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.accentWarning};
  margin-bottom: 8px;
`
export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.accentWarningSoft};
  border-radius: 16px;
  margin-top: 12px;
  max-width: 480px;
  padding: 12px 20px;
  width: 100%;
` 