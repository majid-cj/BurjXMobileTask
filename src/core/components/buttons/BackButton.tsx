import React, { FC } from 'react'
import { I18nManager, StyleSheet, TouchableOpacity } from 'react-native'

import { AppTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'

import { ArrowLeft, ArrowRight } from '~/core/resource/icons/common'
import { useAppStore } from '~/hooks'

interface Props {
  backAction?: () => void
}

export const BackButton: FC<Props> = ({ backAction }) => {
  const { goBack } = useNavigation()
  const { theme } = useAppStore()
  const {
    colors: { accent },
  } = theme

  const styles = backButtonStyle(theme)
  return (
    <TouchableOpacity
      onPress={backAction ? () => backAction() : () => goBack()}
      style={styles.container}
      activeOpacity={0.9}>
      {I18nManager.isRTL ? <ArrowRight color={accent} /> : <ArrowLeft color={accent} />}
    </TouchableOpacity>
  )
}

const backButtonStyle = ({ colors, space }: AppTheme) =>
  StyleSheet.create({
    container: {
      width: space.xLarge,
      height: space.xLarge,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
