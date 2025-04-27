import React, { FC, useCallback, useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { setupNetwork } from '~/core/network'
import { setAppLanguage } from '~/locale'
import Authenticate from '~/screens/Authenticate'
import Home from '~/screens/Home'
import Details from '~/screens/Details'
import Error from '~/screens/Error'
import { useAppStore } from '~/hooks'

import { AppParamsList, DetailsParamsList } from './types'

const AppNavigationStack: FC = () => {
  const { theme, language } = useAppStore()
  const [lang, setLang] = useState<undefined | string>(undefined)
  const { Navigator, Screen } = createNativeStackNavigator<AppParamsList>()

  const setAppReady = useCallback(async () => {
    await setupNetwork()
    const locale = await setAppLanguage(language)
    setLang(locale)
  }, [])

  useEffect(() => {
    setAppReady()
  }, [])

  if (lang === undefined) {
    return null
  }

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={'AUTHENTICATE'}
        screenOptions={{
          headerShown: false,
          presentation: 'fullScreenModal',
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}>
        <Screen name={'AUTHENTICATE'} key={'AUTHENTICATE'} component={Authenticate} />
        <Screen name={'HOME'} key={'HOME'} component={Home} />
        <Screen
          name={'DETAILS'}
          key={'DETAILS'}
          options={{
            presentation: 'modal',
          }}
          component={CoinDetailStack}
        />
        <Screen name={'ERROR'} key={'ERROR'} component={Error} />
      </Navigator>
    </NavigationContainer>
  )
}

const CoinDetailStack: FC = () => {
  const { theme } = useAppStore()
  const { Navigator, Screen } = createNativeStackNavigator<DetailsParamsList>()
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Screen name={'COIN'} key={'COIN'} component={Details} />
    </Navigator>
  )
}

export default AppNavigationStack
