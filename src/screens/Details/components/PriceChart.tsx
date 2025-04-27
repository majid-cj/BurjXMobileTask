import React, { FC } from 'react'
import { CandlestickChart, LineChart } from 'react-native-wagmi-charts'

import Animated from 'react-native-reanimated'

import * as haptics from 'expo-haptics'

import { DailyPriceData } from '~/core/models'
import { useAppStore } from '~/hooks'
import { Dimensions, StyleSheet, View } from 'react-native'
import { AppTheme } from '@react-navigation/native'
import { Spinner } from '~/core/components'

interface PriceChartProps {
  priceList: DailyPriceData
  isLosing: boolean
  loading: boolean
}

export const PriceChart: FC<PriceChartProps> = ({ priceList, isLosing, loading }) => {
  const { theme, chartView, appCurrency } = useAppStore()
  const styles = priceChartStyle(theme)

  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light)
  }

  function formatDate(timestamp: number) {
    'worklet'
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <View style={styles.loadContainer}>
        <Spinner />
      </View>
    )
  }

  const chartColor = isLosing ? theme.colors.danger : theme.colors.success

  return (
    <Animated.View style={[styles.container, { borderColor: chartColor }]}>
      {chartView === 'candle' ? (
        <CandlestickChart.Provider data={priceList[chartView][appCurrency]}>
          <CandlestickChart {...styles.chart}>
            <CandlestickChart.Candles positiveColor={theme.colors.success} negativeColor={theme.colors.danger} />
            <CandlestickChart.Crosshair onActivated={invokeHaptic} onEnded={invokeHaptic}>
              <CandlestickChart.PriceText style={styles.toolTip} />
            </CandlestickChart.Crosshair>
          </CandlestickChart>
        </CandlestickChart.Provider>
      ) : (
        <LineChart.Provider data={priceList[chartView][appCurrency]}>
          <LineChart {...styles.chart}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair onActivated={invokeHaptic} onEnded={invokeHaptic} color={theme.colors.text}>
              <LineChart.Tooltip position={'top'}>
                <LineChart.PriceText style={styles.toolTip} />
              </LineChart.Tooltip>
              <LineChart.Tooltip position={'bottom'}>
                <LineChart.DatetimeText
                  style={styles.toolTip}
                  format={({ value }) => {
                    'worklet'
                    return formatDate(value)
                  }}
                />
              </LineChart.Tooltip>
            </LineChart.CursorCrosshair>
          </LineChart>
        </LineChart.Provider>
      )}
    </Animated.View>
  )
}

const { width } = Dimensions.get('screen')

const priceChartStyle = ({ colors, space }: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.branchBackground,
      width: width - space.medium,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: space.medium,
      alignSelf: 'center',
      borderRadius: space.medium,
      borderWidth: 0.5,
    },
    loadContainer: {
      width: width - space.xLarge * 2,
      height: width - space.xLarge * 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chart: {
      width: width - space.xLarge * 2,
      height: width - space.xLarge * 4,
    },
    toolTip: {
      backgroundColor: colors.lightBackground,
      borderRadius: space.small,
      color: colors.text,
      fontSize: space.medium,
      padding: space.small,
      marginHorizontal: space.medium,
      width: space.xLarge * 5,
    },
  })
