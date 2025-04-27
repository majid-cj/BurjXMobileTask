import { StateCreator } from 'zustand'

import isEmpty from 'lodash/isEmpty'

import {
  DailyPriceData,
  DailyPricePayload,
  Error,
  FeatureDailyPriceData,
  FeatureDailyPricePayload,
} from '~/core/models'

import { getDailyPrice, getPricesForCategory } from './helper'

type CryptoPriceResponse = {
  loading: boolean
  response: DailyPriceData | undefined
  error: Error | undefined
}

type FeatureDailyPriceResponse = {
  loading: boolean
  response: FeatureDailyPriceData | undefined
  error: Error | undefined
}

export type CryptoPriceSlice = {
  cryptoPrice: CryptoPriceResponse
  getCryptoPrice: (params: DailyPricePayload) => Promise<void>
  getAppCryptoPrice: () => CryptoPriceResponse
  clearCryptoPrice: () => void

  featureDailyPrice: FeatureDailyPriceResponse
  getFeatureDailyPrice: (params: FeatureDailyPricePayload) => Promise<void>
  getAppFeatureDailyPrice: () => FeatureDailyPriceResponse
  clearFeatureDailyPrice: () => void
}

export const createCryptoPriceSlice: StateCreator<CryptoPriceSlice> = (set, get) => ({
  getCryptoPrice: async ({ productId, days }) => {
    set(() => ({
      cryptoPrice: {
        loading: true,
        error: undefined,
        response: get().cryptoPrice.response,
      },
    }))
    try {
      const response = await getDailyPrice({ productId, days })
      if (
        isEmpty(response.candle.aed) ||
        isEmpty(response.candle.usd) ||
        isEmpty(response.line.aed) ||
        isEmpty(response.line.usd)
      ) {
        throw new Error('')
      }
      set(() => ({
        cryptoPrice: {
          response,
          loading: false,
          error: undefined,
        },
      }))
    } catch (error) {
      set(() => ({
        cryptoPrice: {
          error: { code: 'ERROR', message: 'ERROR' },
          response: undefined,
          loading: false,
        },
      }))
    }
  },
  getAppCryptoPrice: () => {
    return get().cryptoPrice
  },
  clearCryptoPrice: () => {
    set(() => ({
      cryptoPrice: {
        loading: false,
        error: undefined,
        response: undefined,
      },
    }))
  },
  cryptoPrice: {
    loading: false,
    response: undefined,
    error: undefined,
  },
  featureDailyPrice: {
    loading: false,
    response: undefined,
    error: undefined,
  },
  getFeatureDailyPrice: async ({ featured, topGainer, topLoser }: FeatureDailyPricePayload) => {
    try {
      set({
        featureDailyPrice: {
          loading: true,
          error: undefined,
          response: undefined,
        },
      })
      const [featuredPrices, topGainerPrices, topLoserPrices] = await Promise.all([
        getPricesForCategory(featured),
        getPricesForCategory(topGainer),
        getPricesForCategory(topLoser),
      ])
      set({
        featureDailyPrice: {
          loading: false,
          error: undefined,
          response: {
            featured: featuredPrices,
            topGainer: topGainerPrices,
            topLoser: topLoserPrices,
          },
        },
      })
    } catch (error) {
      set({
        featureDailyPrice: {
          error: { code: 'ERROR', message: 'ERROR' },
          loading: false,
          response: undefined,
        },
      })
    }
  },
  getAppFeatureDailyPrice: () => {
    return get().featureDailyPrice
  },
  clearFeatureDailyPrice: () => {
    set(() => ({
      featureDailyPrice: {
        loading: false,
        error: undefined,
        response: undefined,
      },
    }))
  },
})
