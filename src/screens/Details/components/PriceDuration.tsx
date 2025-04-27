import { AppTheme } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SubTitle } from '~/core/components'
import { Wave } from '~/core/resource/icons/common'
import { useAppStore } from '~/hooks'
import { strings } from '~/locale'

interface PriceDurationProps {
  productId: number
}

export const PriceDuration: FC<PriceDurationProps> = ({ productId }) => {
  const { theme, durations, getCryptoPrice, duration, setDuration } = useAppStore()

  const styles = priceDurationStyle(theme)

  return (
    <View style={styles.container}>
      {durations.map((item) => {
        return (
          <TouchableOpacity
            key={item}
            style={styles.subContainer}
            onPress={() => {
              setDuration(item)
              getCryptoPrice({ productId, days: item })
            }}>
            <SubTitle
              text={strings(`${item}`)}
              style={[
                styles.text,
                {
                  color: item === duration ? theme.colors.background : theme.colors.text,
                  backgroundColor: item === duration ? theme.colors.success : theme.colors.background,
                },
              ]}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const priceDurationStyle = ({ space }: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    subContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      borderRadius: space.small,
      paddingHorizontal: space.medium,
      paddingVertical: space.small / 2,
    },
  })
