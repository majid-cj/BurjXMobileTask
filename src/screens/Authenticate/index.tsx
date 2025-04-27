import React, { FC, useEffect } from 'react'
import { View, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native'

import FastImage from 'react-native-fast-image'

import { StackActions } from '@react-navigation/native'

import { ScreenProps } from '~/navigation/types'
import { Screen, AppButton, SubTitle, ToolBar, ThemeIcon, LanguageIcon, Spacer } from '~/core/components'
import { useAppState, useAppStore, useAuthentication } from '~/hooks'
import { URLS } from '~/core/constants'
import { strings } from '~/locale'

const Authenticate: FC<ScreenProps> = ({ navigation }) => {
  const { theme, toggleTheme, toggleAppLanguages } = useAppStore()

  const navigateHome = () => {
    resetAppState()
    navigation.dispatch(StackActions.replace('HOME'))
  }

  const { asset, compatible, checkAuthentication } = useAuthentication({
    callBack: navigateHome,
  })
  const { resetAppState } = useAppState()

  useEffect(() => {
    if (compatible === 'not_compatible') {
      navigateHome()
    }
  }, [compatible])

  return (
    <Screen
      header={
        <ToolBar
          leftButton={
            <TouchableOpacity onPress={toggleTheme} activeOpacity={1}>
              <ThemeIcon />
            </TouchableOpacity>
          }
          menuButton={
            <TouchableOpacity onPress={toggleAppLanguages} activeOpacity={1}>
              <LanguageIcon />
            </TouchableOpacity>
          }
        />
      }
      footer={
        compatible === 'compatible' && (
          <>
            <AppButton
              text={strings('setup')}
              onPress={async () => {
                if (Platform.OS === 'ios') {
                  await Linking.openURL('app-settings:')
                } else {
                  await Linking.openSettings()
                }
              }}
            />
            <Spacer size={'md'} />
            <TouchableOpacity onPress={navigateHome} activeOpacity={1}>
              <SubTitle text={strings('skip')} style={{ ...theme.fonts.largeFont }} />
            </TouchableOpacity>
          </>
        )
      }>
      <View style={{ width: '100%', padding: theme.space.medium }}>
        <SubTitle text={strings('biometric')} style={{ ...theme.fonts.xLargeFont }} numberOfLines={2} />
        <Spacer size={'l48'} />
        <TouchableOpacity onPress={checkAuthentication}>
          <FastImage source={{ uri: URLS.ASSETS(asset) }} style={{ alignSelf: 'center', width: 150, height: 150 }} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default Authenticate
