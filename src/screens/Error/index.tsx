import React, { FC, useCallback } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'

import LottieView from 'lottie-react-native'

import { AppTheme, useFocusEffect } from '@react-navigation/native'

import { AppButton, Screen, SubTitle } from '~/core/components'
import { useAppStore } from '~/hooks'
import { URLS } from '~/core/constants'
import { ScreenProps } from '~/navigation/types'

const Error: FC<ScreenProps> = ({ navigation, route }) => {
  const { reset = false } = route.params as { reset: boolean }
  const { theme, clearCryptoCurrency, clearCryptoPrice, clearFeatureCryptoCurrency, clearFeatureDailyPrice } =
    useAppStore()
  const styles = errorScreenStyle(theme)

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )

  const onErrorButton = () => {
    if (reset) {
      clearCryptoCurrency()
      clearCryptoPrice()
      clearFeatureCryptoCurrency()
      clearFeatureDailyPrice()
    }
    navigation.goBack()
  }

  return (
    <Screen footer={<AppButton text={'try again'} onPress={onErrorButton} />}>
      <View style={styles.container}>
        <SubTitle text={'Error, Please try again'} style={styles.text} />
        <LottieView loop autoPlay style={styles.animation} source={{ uri: URLS.ANIMATION('error') }} />
      </View>
    </Screen>
  )
}

const errorScreenStyle = ({ colors, fonts }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    animation: {
      width: '100%',
      height: '45%',
    },
    text: {
      ...fonts.xLargeFont,
      color: colors.danger,
      fontWeight: 'bold',
    },
  })

export default Error
