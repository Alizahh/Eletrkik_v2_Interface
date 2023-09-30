import { SupportedChainId } from '@cowprotocol/cow-sdk'
import type { Web3Provider } from '@ethersproject/providers'

import { Eip2612PermitUtils } from '@1inch/permit-signed-approvals-utils'

import { PermitProviderConnector } from 'modules/wallet/utils/PermitProviderConnector'

import { PERMIT_SIGNER } from '../const'

/**
 * Cache by network. Here we don't care about the provider as a static account will be used for the signature
 */
const CHAIN_UTILS_CACHE = new Map<number, Eip2612PermitUtils>()
/**
 * Cache by provider. Here we cache per provider as each account should have its own instance
 */
const PROVIDER_UTILS_CACHE = new Map<Web3Provider, Eip2612PermitUtils>()

export function getPermitUtilsInstance(
  chainId: SupportedChainId,
  provider: Web3Provider,
  account?: string | undefined
): Eip2612PermitUtils {
  const chainCache = CHAIN_UTILS_CACHE.get(chainId)

  if (!account && chainCache) {
    return chainCache
  }
  const providerCache = PROVIDER_UTILS_CACHE.get(provider)

  if (providerCache) {
    return providerCache
  }

  const web3ProviderConnector = new PermitProviderConnector(provider, account ? undefined : PERMIT_SIGNER)
  const eip2612PermitUtils = new Eip2612PermitUtils(web3ProviderConnector)

  if (!account) {
    CHAIN_UTILS_CACHE.set(chainId, eip2612PermitUtils)
  } else {
    PROVIDER_UTILS_CACHE.set(provider, eip2612PermitUtils)
  }

  return eip2612PermitUtils
}