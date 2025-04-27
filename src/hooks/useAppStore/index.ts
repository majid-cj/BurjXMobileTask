import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  createCryptoCurrencySlice,
  createCryptoPriceSlice,
  createThemeSlice,
  createUtilitySlice,
  CryptoCurrencySlice,
  CryptoPriceSlice,
  ThemeSlice,
  UtilitySlice,
  zustandStorage,
} from '~/store'

const useAppStore = create<ThemeSlice & CryptoCurrencySlice & CryptoPriceSlice & UtilitySlice>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createCryptoCurrencySlice(...args),
      ...createCryptoPriceSlice(...args),
      ...createUtilitySlice(...args),
    }),
    {
      name: 'burj-x-mobile-task',
      storage: createJSONStorage(() => zustandStorage),
      version: 1.0,
    }
  )
)

export default useAppStore
