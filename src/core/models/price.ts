export type CryptoCurrency = {
  productId: number
  id: string
  name: string
  image: string
  currentPrice: number
  priceChangePercentage24h: number
  sparkline: Array<number>
  marketCap: number
  tradingVolume: number
  symbol: string
  price: DailyPriceData
}

export type CryptoCurrencyData = {
  data: Array<CryptoCurrency>
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export type FeatureCryptoCurrencyData = {
  featured: Array<CryptoCurrency>
  topGainer: Array<CryptoCurrency>
  topLoser: Array<CryptoCurrency>
}

export type MoneyCurrency = 'usd' | 'aed'

export type ChartView = 'candle' | 'line'

export type CryptoCurrencyPageSize = 10 | 20 | 100

export type CryptoCurrencyPayload = {
  currency: MoneyCurrency
  page: number
  pageSize: CryptoCurrencyPageSize
}

export type CurrencyPrice = {
  open: number
  high: number
  low: number
  close: number
}

export type DailyPrice = {
  date: number
  usd: CurrencyPrice
  aed: CurrencyPrice
}

export type ChartCandlePrice = CurrencyPrice & { timestamp: number }

export type ChartLinePrice = {
  timestamp: number
  value: number
}

export type DailyPriceData = {
  candle: {
    aed: Array<ChartCandlePrice>
    usd: Array<ChartCandlePrice>
  }
  line: {
    aed: Array<ChartLinePrice>
    usd: Array<ChartLinePrice>
  }
}

export type FeatureDailyPrice = {
  [key: string]: DailyPriceData
}

export type FeatureDailyPriceData = {
  featured: FeatureDailyPrice
  topGainer: FeatureDailyPrice
  topLoser: FeatureDailyPrice
}

export type PriceDurations = 1 | 7 | 30 | 365 | 'max'

export type DailyPricePayload = {
  productId: number
  days: PriceDurations
}

export type FeatureDailyPricePayload = FeatureCryptoCurrencyData
