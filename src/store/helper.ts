import { URLS } from '~/core/constants'
import { CryptoCurrency, DailyPrice, DailyPriceData, DailyPricePayload, FeatureDailyPrice } from '~/core/models'
import { axiosInstance } from '~/core/network'

export const getDailyPrice = async ({ productId, days }: DailyPricePayload): Promise<DailyPriceData> => {
  try {
    const response = await axiosInstance.get(URLS.COIN_OHLC({ productId, days }))
    const aedCandle = response.data.map((item: DailyPrice) => ({
      timestamp: item.date,
      open: item.aed.open,
      high: item.aed.high,
      low: item.aed.low,
      close: item.aed.close,
    }))
    const usdCandle = response.data.map((item: DailyPrice) => ({
      timestamp: item.date,
      open: item.usd.open,
      high: item.usd.high,
      low: item.usd.low,
      close: item.usd.close,
    }))
    const aedLine = response.data.map((item: DailyPrice) => ({
      timestamp: item.date,
      value: item.aed.high,
    }))
    const usdLine = response.data.map((item: DailyPrice) => ({
      timestamp: item.date,
      value: item.usd.high,
    }))

    return {
      candle: {
        aed: aedCandle,
        usd: usdCandle,
      },
      line: {
        aed: aedLine,
        usd: usdLine,
      },
    }
  } catch (error) {
    throw new Error('Error')
  }
}

export const getPricesForCategory = async (items: Array<CryptoCurrency>): Promise<FeatureDailyPrice> => {
  const pricePromises = items.map(({ productId, symbol }) =>
    getDailyPrice({ productId, days: 1 }).then((priceData) => ({
      symbol,
      priceData,
    }))
  )
  const results = await Promise.all(pricePromises)
  return results.reduce((acc, { symbol, priceData }) => {
    acc[symbol] = priceData
    return acc
  }, {} as FeatureDailyPrice)
}
