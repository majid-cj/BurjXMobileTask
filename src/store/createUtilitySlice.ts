import RNRestart from 'react-native-restart'

import { StateCreator } from 'zustand'

import { ChartView, MoneyCurrency, PriceDurations } from '~/core/models'
import { AppLanguage, setAppLanguage } from '~/locale'

export type UtilitySlice = {
  duration: PriceDurations
  language: AppLanguage
  setDuration: (duration: PriceDurations) => void
  appCurrency: MoneyCurrency
  chartView: ChartView
  page: number
  durations: Array<PriceDurations>
  changeUsedCurrency: () => void
  changeChartView: () => void
  setPagination: (page: number) => void
  toggleAppLanguages: () => Promise<void>
}

export const createUtilitySlice: StateCreator<UtilitySlice> = (set, get) => ({
  duration: 1,
  setDuration: (duration) => {
    set(() => ({ duration }))
  },
  changeUsedCurrency: () => {
    set((state) => ({ appCurrency: state.appCurrency === 'usd' ? 'aed' : 'usd' }))
  },
  changeChartView: () => {
    set((state) => ({ chartView: state.chartView === 'candle' ? 'line' : 'candle' }))
  },
  setPagination: (page) => {
    set(() => ({ page }))
  },
  toggleAppLanguages: async () => {
    const language = get().language === 'en' ? 'ar' : 'en'
    set(() => ({ language }))
    await setAppLanguage(language)
    RNRestart.restart()
  },
  appCurrency: 'usd',
  chartView: 'candle',
  page: 1,
  durations: [1, 7, 30, 365, 'max'],
  language: 'en',
})
