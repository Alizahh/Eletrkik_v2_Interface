import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { getChainInfoOrDefault } from 'modules/pools/constants/chainInfo'
import { AlertTriangle } from 'react-feather'
import { BodyRow, CautionTriangle, Link, TitleRow, TitleText, Wrapper } from './styled'



export function ApprovalWarning() {
  const { chainId } = useWeb3React()
  const info = getChainInfoOrDefault(chainId)
  const label = info?.label

  return (
    <Wrapper>
      <TitleRow>
        <CautionTriangle />
        <TitleText>
          <Trans>Approval Warning</Trans>
        </TitleText>
      </TitleRow>
      <BodyRow>
        <Trans>Your transaction might get failed by Metamask Smart gas estimation.</Trans> <br />
        <span>
          <Trans>Try increase gas on Metamask</Trans>{' '}
          <Link href="https://mapguide.foam.space/en/articles/2386163-how-do-i-set-the-gas-limit-and-gas-price-in-metamask">
            <Trans>
              <span style={{ color: '#3366CC' }}>how?</span>{' '}
            </Trans>
          </Link>
        </span>
      </BodyRow>
    </Wrapper>
  )
}
