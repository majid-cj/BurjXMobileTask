import React, { FC } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { LineChart } from 'react-native-wagmi-charts'

import { AppTheme, useNavigation } from '@react-navigation/native'

import { CurrencyIcon, SubTitle } from '~/core/components'
import { CryptoCurrency } from '~/core/models'
import { useAppStore } from '~/hooks'
import { AppNavigationProps } from '~/navigation/types'

import { CoinSignature } from './CoinSignature'

interface CryptoPriceProps {
  currency: CryptoCurrency
}

export const CryptoPrice: FC<CryptoPriceProps> = ({ currency }) => {
  const { navigate } = useNavigation<AppNavigationProps>()
  const { theme, clearCryptoPrice, setDuration } = useAppStore()
  const styles = cryptoPriceStyle(theme)

  const { image, symbol, currentPrice, price, name, priceChangePercentage24h } = currency

  const onPress = () => {
    setDuration(1)
    clearCryptoPrice()
    navigate('DETAILS', {
      screen: 'COIN',
      params: {
        currency,
      },
    })
  }
  const isLosing = priceChangePercentage24h < 0
  const priceColor = isLosing ? theme.colors.danger : theme.colors.success

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.95} key={symbol} onPress={onPress}>
      <View style={styles.priceContainer}>
        <CoinSignature image={image} name={name} symbol={symbol} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <CurrencyIcon size={theme.space.medium} />
          <SubTitle text={currentPrice.toFixed(2).toString()} style={styles.price} />
        </View>
      </View>
      <Animated.View style={styles.chartContainer}>
        <SubTitle
          style={[styles.percentage, { color: priceColor }]}
          text={`${isLosing ? '' : '+'}${priceChangePercentage24h.toFixed(2)}%`}
        />
        <LineChart.Provider data={price.line.usd}>
          <LineChart {...styles.chart} style={{ marginEnd: theme.space.large }}>
            <LineChart.Path color={priceColor} />
          </LineChart>
        </LineChart.Provider>
      </Animated.View>
    </TouchableOpacity>
  )
}

const { width } = Dimensions.get('screen')

const cryptoPriceStyle = ({ space, colors, fonts }: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: space.medium,
      backgroundColor: colors.background,
      borderRadius: space.medium,
      padding: space.medium,
      marginBottom: space.small,
      borderWidth: 0.75,
      borderColor: colors.branchBackground,
    },
    priceContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    percentage: {
      ...fonts.smallFont,
      backgroundColor: colors.branchBackground,
      borderRadius: space.small,
      padding: space.small,
    },
    chartContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    chart: {
      width: width / 2.5,
      height: width / 5,
    },
    price: {
      ...fonts.mediumFont,
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.text,
      fontWeight: 'bold',
    },
  })
