import React, { FC, useRef, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { AppTheme } from '@react-navigation/native'

import find from 'lodash/find'

import { SubTitle } from '~/core/components'
import { FeaturePrice, SearchView } from '~/core/components/cards'
import { FeatureCryptoCurrencyData, FeatureDailyPriceData } from '~/core/models'
import { useAppStore } from '~/hooks'
import { URLS } from '~/core/constants'
import { strings } from '~/locale'

interface FeatureDailyPriceViewProps {
  dailyPrice: FeatureDailyPriceData
  featureCoins: FeatureCryptoCurrencyData
  onSearch: (input: string) => void
}

export const FeatureDailyPriceView: FC<FeatureDailyPriceViewProps> = ({ dailyPrice, featureCoins, onSearch }) => {
  const { theme } = useAppStore()
  const styles = featureDailyPriceViewStyle(theme)
  const [selected, setSelected] = useState<keyof FeatureDailyPriceData>('featured')
  const flatListRef = useRef<FlatList<string> | null>(null)

  const selectedFeatureDailyPrice = Object.keys(dailyPrice[selected])
  const selectedFeature = Object.keys(featureCoins)

  return (
    <>
      <View style={styles.container}>
        {selectedFeature.map((key: keyof FeatureCryptoCurrencyData) => {
          const isSelected = key === selected
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.subContainer,
                { borderBottomColor: isSelected ? theme.colors.success : theme.colors.branchBackground },
              ]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({ index: 0, animated: true })
                setSelected(key)
              }}>
              <FastImage source={{ uri: URLS.ASSETS(key) }} style={styles.image} />
              <SubTitle
                text={strings(key)}
                style={[
                  styles.titles,
                  {
                    color: isSelected ? theme.colors.text : theme.colors.lightText,
                    fontWeight: isSelected ? 'bold' : '500',
                  },
                ]}
              />
            </TouchableOpacity>
          )
        })}
      </View>
      <FlatList
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={selectedFeatureDailyPrice}
        renderItem={({ item }: { item: string }) => (
          <FeaturePrice price={dailyPrice[selected][item]} currency={find(featureCoins[selected], { symbol: item })} />
        )}
      />
      <SearchView onSearch={onSearch} />
    </>
  )
}

const featureDailyPriceViewStyle = ({ colors, space, fonts }: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      marginHorizontal: space.small,
    },
    subContainer: {
      flex: 1,
      borderBottomWidth: space.small / 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: space.medium,
      height: space.medium,
      marginEnd: space.small,
    },
    titles: {
      ...fonts.mediumFont,
      alignSelf: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      marginVertical: space.small,
    },
  })
