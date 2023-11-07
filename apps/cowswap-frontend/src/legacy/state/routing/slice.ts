import { ChainId } from "@aaran1337/smart-order-router-test";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Protocol } from "@uniswap/router-sdk";
import { TradeType } from "@uniswap/sdk-core";
import { getClientSideQuote } from "lib/hooks/routing/clientSideSmartOrderRouter";
import ms from "ms.macro";
import qs from "qs";

import { QuoteData, TradeResult } from "./types";
import {
  getRouter,
  isExactInput,
  shouldUseAPIRouter,
  transformRoutesToTrade,
} from "./utils";

export enum RouterPreference {
  AUTO = "auto",
  API = "api",
  CLIENT = "client",
}


export const INTERNAL_ROUTER_PREFERENCE_PRICE = "price" as const;

const API_QUERY_PARAMS = {
  protocols: "v3",
};
const CLIENT_PARAMS = {
  protocols: [Protocol.V3],
};

export interface GetQuoteArgs {
  tokenInAddress: string;
  tokenInChainId: ChainId;
  tokenInDecimals: number;
  tokenInSymbol?: string;
  tokenOutAddress: string;
  tokenOutChainId: ChainId;
  tokenOutDecimals: number;
  tokenOutSymbol?: string;
  amount: string;
  routerPreference: RouterPreference | typeof INTERNAL_ROUTER_PREFERENCE_PRICE;
  tradeType: TradeType;
}

enum QuoteState {
  SUCCESS = "Success",
  NOT_FOUND = "Not found",
}

export const routingApi = createApi({
  reducerPath: "routingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tkg8sfwhd9.execute-api.us-east-1.amazonaws.com/prod/ ",
  }),
  endpoints: (build) => ({
    getQuote: build.query<TradeResult, GetQuoteArgs>({
      async onQueryStarted(args: GetQuoteArgs, { queryFulfilled }) {
      
      },
      async queryFn(args, _api, _extraOptions, fetch) {
        if (shouldUseAPIRouter(args.routerPreference)) {
          try {
            const {
              tokenInAddress,
              tokenInChainId,
              tokenOutAddress,
              tokenOutChainId,
              amount,
              tradeType,
            } = args;
            const type = isExactInput(tradeType) ? "exactIn" : "exactOut";
            const query = qs.stringify({
              ...API_QUERY_PARAMS,
              tokenInAddress,
              tokenInChainId,
              tokenOutAddress,
              tokenOutChainId,
              amount,
              type,
            });
            const response = await fetch(`quote?${query}`);
            if (response.error) {
              try {
                const errorData = response.error.data as any;
                if (
                  typeof errorData === "object" &&
                  errorData?.errorCode === "NO_ROUTE"
                ) {
                  return { data: { state: QuoteState.NOT_FOUND } };
                }
              } catch {
                throw response.error;
              }
            }

            const quoteData = response.data as QuoteData;
            const tradeResult = transformRoutesToTrade(args, quoteData);
            return { data: tradeResult };
          } catch (error: any) {
            console.warn(
              `GetQuote failed on routing API, falling back to client: ${
                error?.message ?? error?.detail ?? error
              }`
            );
          }
        }
        try {
          const router = getRouter(args.tokenInChainId);
          const quoteResult = await getClientSideQuote(
            args,
            router,
            CLIENT_PARAMS
          );
          if (quoteResult.state === QuoteState.SUCCESS) {
            return { data: transformRoutesToTrade(args, quoteResult.data) };
          } else {
            return { data: quoteResult };
          }
        } catch (error: any) {
          console.warn(`GetQuote failed on client: ${error}`);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error?.detail ?? error?.message ?? error,
            },
          };
        }
      },
      keepUnusedDataFor: ms`10s`,
      extraOptions: {
        maxRetries: 0,
      },
    }),
  }),
});

export const { useGetQuoteQuery } = routingApi;