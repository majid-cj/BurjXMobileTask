import React, { FC, useEffect } from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { AppTheme, useNavigation } from '@react-navigation/native'

import { ChartIcon, CurrencyIcon, Screen, Spacer, SubTitle, ToolBar } from '~/core/components'
import { CryptoCurrency } from '~/core/models'
import { useAppStore } from '~/hooks'
import { AppNavigationProps, ScreenProps } from '~/navigation/types'
import { CoinSignature } from '~/core/components/cards'

import { PriceChart, PriceDuration } from './components'

const Details: FC<ScreenProps> = ({ route }) => {
  const { navigate } = useNavigation<AppNavigationProps>()
  const {
    currency: { productId, name, currentPrice, symbol, image, priceChangePercentage24h, price },
  } = route.params as { currency: CryptoCurrency }

  const {
    theme,
    getCryptoPrice,
    changeChartView,
    cryptoPrice: { response, error, loading },
    setDuration,
  } = useAppStore()

  useEffect(() => {
    if (error) {
      getCryptoPrice({ productId, days: 1 })
      setDuration(1)
      navigate('ERROR', { reset: false })
    }
  }, [error])

  const isLosing = priceChangePercentage24h < 0
  const priceColor = isLosing ? theme.colors.danger : theme.colors.success

  const styles = detailsStyle(theme)

  const priceList = response || price

  return (
    <Screen
      scroll
      header={
        <ToolBar
          back
          center={
            <CoinSignature
              name={`${name.length > 16 ? symbol.toUpperCase() : name} (${symbol.toUpperCase()})`}
              image={image}
            />
          }
          menuButton={
            <TouchableOpacity onPress={changeChartView} activeOpacity={1}>
              <ChartIcon />
            </TouchableOpacity>
          }
        />
      }>
      <View style={styles.priceContainer}>
        <View style={styles.priceSubContainer}>
          <CurrencyIcon size={theme.space.medium} />
          <SubTitle text={`${currentPrice.toFixed(currentPrice > 1 ? 2 : 8)}`} style={styles.price} />
        </View>
        <SubTitle
          style={[styles.percentage, { color: priceColor }]}
          text={`${isLosing ? '' : '+'}${priceChangePercentage24h.toFixed(2)}%`}
        />
      </View>
      <PriceChart priceList={priceList} isLosing={isLosing} loading={loading} />
      <Spacer size={'xxl'} />
      <PriceDuration productId={productId} />
    </Screen>
  )
}

export default Details

const detailsStyle = ({ fonts, colors, space }: AppTheme) =>
  StyleSheet.create({
    priceContainer: {
      width: '100%',
      padding: space.large,
    },
    priceSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexGrow: 1,
    },
    price: {
      ...fonts.xLargeFont,
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.text,
      fontWeight: 'bold',
    },
    percentage: {
      ...fonts.mediumFont,
      backgroundColor: colors.branchBackground,
      borderRadius: space.small,
      padding: space.small,
      marginVertical: space.medium,
      alignSelf: 'flex-start',
    },
  })
