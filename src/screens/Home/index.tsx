import React, { FC, useCallback, useEffect } from 'react'

import { TouchableOpacity } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { CurrencyIcon, Screen, ThemeIcon, ToolBar } from '~/core/components'
import { useAppStore } from '~/hooks'
import { ScreenProps } from '~/navigation/types'
import { CryptoListView } from './components'

const Home: FC<ScreenProps> = ({ navigation }) => {
  const {
    theme,
    toggleTheme,
    appCurrency,
    changeUsedCurrency,
    feature: { response: featureCoins, error: errFeatureCoins },
    cryptoCurrency: { response: crypto, error: errCrypto },
    featureDailyPrice: { response: dailyPrice, error: errDailyPrice },

    getCryptoCurrency,
    getFeatureCryptoCurrency,
    getFeatureDailyPrice,

    cryptoList,
    setCryptoList,
  } = useAppStore()

  useFocusEffect(
    useCallback(() => {
      if (!crypto) {
        getCryptoCurrency({ currency: appCurrency, page: 1, pageSize: 10 })
        getFeatureCryptoCurrency(appCurrency)
      }
      if (crypto) {
        const newData = crypto.data.filter((newItem) => !cryptoList.some((oldItem) => oldItem.id === newItem.id))
        setCryptoList([...cryptoList, ...newData])
      }
    }, [crypto])
  )

  useEffect(() => {
    getCryptoCurrency({ currency: appCurrency, page: 1, pageSize: 10 })
    getFeatureCryptoCurrency(appCurrency)
  }, [appCurrency])

  useEffect(() => {
    getFeatureDailyPrice(featureCoins)
  }, [featureCoins])

  useEffect(() => {
    if (errCrypto || errFeatureCoins || errDailyPrice) {
      navigation.navigate('ERROR', { reset: true })
    }
  }, [errCrypto, errFeatureCoins, errDailyPrice])

  return (
    <Screen
      loading={!crypto || !featureCoins || !dailyPrice}
      header={
        <ToolBar
          menuButton={
            <TouchableOpacity onPress={changeUsedCurrency} activeOpacity={1}>
              <CurrencyIcon size={theme.space.large} />
            </TouchableOpacity>
          }
          leftButton={
            <TouchableOpacity onPress={toggleTheme} activeOpacity={1}>
              <ThemeIcon />
            </TouchableOpacity>
          }
        />
      }>
      <CryptoListView crypto={cryptoList} featureCoins={featureCoins} dailyPrice={dailyPrice} />
    </Screen>
  )
}

export default Home
