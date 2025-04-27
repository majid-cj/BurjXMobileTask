import { CryptoCurrencyPayload, DailyPricePayload } from '../models'

export const URLS = {
  BASE: 'https://coingeko.burjx.com',
  COIN_PRICE: ({ currency = 'aed', page, pageSize }: CryptoCurrencyPayload) =>
    `/coin-prices-all?currency=${currency}&page=${page}&pageSize=${pageSize}`,
  COIN_OHLC: ({ productId, days }: DailyPricePayload) => `/coin-ohlc?productId=${productId}&days=${days}`,
  ASSETS: (name: Assets) => `https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/${name}.png`,
  ANIMATION: (name: Assets) => `https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/${name}.json`,
}

export type Assets = 'aed' | 'usd' | 'error' | 'featured' | 'topGainer' | 'topLoser' | 1 | 2 | 3
