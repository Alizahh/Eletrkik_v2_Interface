import { GraphQLClient } from 'graphql-request'

import { SEARCH_TOKENS } from './queries'
import { FetchTokensApiResult } from './types'

//Elektrikv2Changed
const BASE_URL = 'https://elektrik.network/'
const GQL_CLIENT = new GraphQLClient(BASE_URL)

export async function getTokens(searchQuery: string): Promise<FetchTokensApiResult> {
  return await GQL_CLIENT.request<FetchTokensApiResult>(SEARCH_TOKENS, {
    searchQuery,
  })
}
