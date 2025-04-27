import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import FastImage from 'react-native-fast-image'

import { AppTheme } from '@react-navigation/native'

import { SubTitle } from '../texts'
import { useAppStore } from '~/hooks'

interface CoinSignatureProps {
  image: string
  name: string
  symbol?: string
}

export const CoinSignature: FC<CoinSignatureProps> = ({ image, name, symbol }) => {
  const { theme } = useAppStore()
  const styles = coinSignatureStyle(theme)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: image }} style={styles.image} resizeMode={'contain'} />
      </View>
      <View style={[styles.textContainer, { alignItems: symbol ? 'flex-start' : 'center', flex: symbol ? 1 : 0 }]}>
        <SubTitle text={name} style={styles.name} />
        {symbol && <SubTitle text={symbol.toUpperCase()} style={styles.symbol} />}
      </View>
    </View>
  )
}

const coinSignatureStyle = ({ space, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      flexGrow: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: colors.background,
      margin: space.small,
    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    imageContainer: {
      flex: 0,
      marginEnd: space.small,
      height: space.xLarge * 1.25,
      width: space.xLarge * 1.25,
      borderRadius: space.xLarge,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
    },
    name: {
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.text,
      fontWeight: 'bold',
    },
    symbol: {
      flex: 1,
      textAlign: 'left',
      textAlignVertical: 'center',
      color: colors.text,
      fontWeight: '500',
    },
  })
