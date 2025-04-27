import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-wagmi-charts'
import Animated from 'react-native-reanimated'

import { AppTheme, useNavigation } from '@react-navigation/native'

import { useAppStore } from '~/hooks'
import { AppNavigationProps } from '~/navigation/types'
import { CryptoCurrency, DailyPriceData } from '~/core/models'

import { SubTitle } from '../texts'
import { CoinSignature } from './CoinSignature'
import { CurrencyIcon } from '../ui'

interface FeaturePriceProps {
  currency: CryptoCurrency
  price: DailyPriceData
}

export const FeaturePrice: FC<FeaturePriceProps> = ({ currency, price }) => {
  const navigation = useNavigation<AppNavigationProps>()
  const { theme, clearCryptoPrice, setDuration } = useAppStore()
  const styles = featurePriceStyle(theme)

  if (!currency) {
    return null
  }

  const { image, currentPrice, symbol, name, priceChangePercentage24h } = currency || {}

  const isLosing = priceChangePercentage24h < 0
  const priceColor = isLosing ? theme.colors.danger : theme.colors.success

  const onPress = () => {
    setDuration(1)
    clearCryptoPrice()
    navigation.navigate('DETAILS', {
      screen: 'COIN',
      params: {
        currency: {
          ...currency,
          price,
        },
      },
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <CoinSignature image={image} name={name} symbol={symbol} />
      <Animated.View>
        <LineChart.Provider data={price.line.usd}>
          <LineChart {...styles.chart}>
            <LineChart.Path color={priceColor} />
          </LineChart>
        </LineChart.Provider>
      </Animated.View>
      <View style={styles.priceContainer}>
        <View style={styles.priceSubContainer}>
          <CurrencyIcon size={theme.space.medium} />
          <SubTitle text={`${currentPrice.toFixed(2)}`} style={styles.price} />
        </View>
        <SubTitle
          style={[styles.percentage, { color: priceColor }]}
          text={`${isLosing ? '' : '+'}${priceChangePercentage24h.toFixed(2)}%`}
        />
      </View>
    </TouchableOpacity>
  )
}

const { width } = Dimensions.get('screen')

const featurePriceStyle = ({ colors, fonts, space }: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      width: width / 2,
      height: width / 2,
      margin: space.small,
      borderRadius: space.medium,
      padding: space.medium,
      marginBottom: space.small,
      borderWidth: 0.75,
      borderColor: colors.branchBackground,
    },
    priceContainer: {
      flexDirection: 'row',
      width: '100%',
    },
    priceSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexGrow: 1,
    },
    price: {
      ...fonts.mediumFont,
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.text,
      fontWeight: 'bold',
    },
    percentage: {
      ...fonts.smallFont,
      backgroundColor: colors.branchBackground,
      borderRadius: space.small,
      padding: space.small,
      alignSelf: 'flex-end',
    },
    chart: {
      width: width / 3,
      height: width / 5,
    },
  })
