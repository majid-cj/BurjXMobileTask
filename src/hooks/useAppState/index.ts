import useAppStore from '../useAppStore'

type AppState = {
  resetAppState: () => void
}

const useAppState = (): AppState => {
  const {
    clearCryptoCurrency,
    clearCryptoPrice,
    clearFeatureCryptoCurrency,
    clearFeatureDailyPrice,
    setPagination,
    setDuration,
    setCryptoList,
  } = useAppStore()

  const resetAppState = () => {
    clearCryptoCurrency()
    clearCryptoPrice()
    clearFeatureCryptoCurrency()
    clearFeatureDailyPrice()
    setCryptoList([])
    setPagination(1)
    setDuration(1)
  }

  return {
    resetAppState,
  }
}

export default useAppState
