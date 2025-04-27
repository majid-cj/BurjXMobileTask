import { StateCreator } from 'zustand'

import sortBy from 'lodash/sortBy'

import { URLS } from '~/core/constants'
import {
  CryptoCurrency,
  CryptoCurrencyData,
  CryptoCurrencyPayload,
  Error,
  FeatureCryptoCurrencyData,
  MoneyCurrency,
} from '~/core/models'
import { axiosInstance } from '~/core/network'
import { getPricesForCategory } from './helper'

type CryptoCurrencyResponse = {
  loading: boolean
  response: CryptoCurrencyData | undefined
  error: Error | undefined
}

type FeatureCryptoCurrencyResponse = {
  loading: boolean
  response: FeatureCryptoCurrencyData | undefined
  error: Error | undefined
}

export type CryptoCurrencySlice = {
  cryptoCurrency: CryptoCurrencyResponse
  getCryptoCurrency: (params: CryptoCurrencyPayload) => Promise<void>
  getAppCryptoCurrency: () => CryptoCurrencyResponse
  clearCryptoCurrency: () => void

  feature: FeatureCryptoCurrencyResponse
  getFeatureCryptoCurrency: (currency: MoneyCurrency) => Promise<void>
  getFeatureAppCryptoCurrency: () => FeatureCryptoCurrencyResponse
  clearFeatureCryptoCurrency: () => void

  cryptoList: Array<CryptoCurrency>
  setCryptoList: (list: Array<CryptoCurrency>) => void
}

export const createCryptoCurrencySlice: StateCreator<CryptoCurrencySlice> = (set, get) => ({
  cryptoCurrency: {
    loading: false,
    response: undefined,
    error: undefined,
  },
  getCryptoCurrency: async ({ currency, page, pageSize }) => {
    const isFirstLoad = page === 1
    set(() => ({
      cryptoCurrency: {
        loading: isFirstLoad,
        error: undefined,
        response: isFirstLoad ? undefined : get().cryptoCurrency.response,
      },
    }))
    try {
      const response = await axiosInstance.get(URLS.COIN_PRICE({ currency, page, pageSize }))
      const featuredPrices = await getPricesForCategory(response.data.data)
      const data = response.data.data.map(({ symbol, sparkline, ...rest }: CryptoCurrency) => {
        return {
          ...rest,
          symbol,
          price: featuredPrices[symbol],
        }
      })

      set(() => ({
        cryptoCurrency: {
          loading: false,
          response: { ...response.data, data },
          error: undefined,
        },
      }))
    } catch (error) {
      set(() => ({
        cryptoCurrency: {
          error: { code: 'ERROR', message: 'ERROR' },
          response: undefined,
          loading: false,
        },
      }))
    }
  },
  getAppCryptoCurrency: () => {
    return get().cryptoCurrency
  },
  clearCryptoCurrency: () => {
    set(() => ({
      cryptoCurrency: {
        response: undefined,
        loading: false,
        error: undefined,
      },
    }))
  },

  feature: {
    loading: false,
    response: undefined,
    error: undefined,
  },
  getFeatureCryptoCurrency: async (currency) => {
    set(() => ({
      feature: {
        loading: true,
        error: undefined,
        response: undefined,
      },
    }))
    try {
      const response = await axiosInstance.get(URLS.COIN_PRICE({ currency, page: 1, pageSize: 100 }))
      set(() => ({
        feature: {
          loading: false,
          response: {
            featured: sortBy(response.data.data, 'marketCap').reverse().slice(0, 20),
            topGainer: sortBy(response.data.data, 'priceChangePercentage24h').reverse().slice(0, 20),
            topLoser: sortBy(response.data.data, 'priceChangePercentage24h').slice(0, 20),
          },
          error: undefined,
        },
      }))
    } catch (error) {
      set(() => ({
        feature: {
          error: { code: 'ERROR', message: 'ERROR' },
          response: undefined,
          loading: false,
        },
      }))
    }
  },
  getFeatureAppCryptoCurrency: () => {
    return get().feature
  },
  clearFeatureCryptoCurrency: () => {
    set(() => ({
      feature: {
        response: undefined,
        loading: false,
        error: undefined,
      },
    }))
  },
  cryptoList: [],
  setCryptoList: (cryptoList) => {
    set(() => ({ cryptoList }))
  },
})
