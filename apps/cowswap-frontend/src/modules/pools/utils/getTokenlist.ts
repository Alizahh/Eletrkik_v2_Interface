import { CHAIN_IDS_TO_NAMES, SupportedChainId } from 'common/constants/chains'
import { ExplorerDataType, getExplorerLink } from '../../../../../../libs/common-utils/src/getExplorerLink'
import { isGqlSupportedChain } from '../graphql/data/util'

export const getTokenLink = (chainId: SupportedChainId, address: string) => {
  if (isGqlSupportedChain(chainId)) {
    const chainName = CHAIN_IDS_TO_NAMES[chainId]
    return `${window.location.origin}/#/tokens/${chainName}/${address}`
  } else {
    return getExplorerLink(chainId, address, ExplorerDataType.TOKEN)
  }
}
