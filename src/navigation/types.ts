import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { CryptoCurrency } from '~/core/models'

export type ScreenProps = {
  navigation: NavigationProp<AppParamsList>
  route: RouteProp<ParamListBase, string>
}

export type AppParamsList = {
  AUTHENTICATE: undefined
  HOME: undefined
  DETAILS: {
    screen: 'COIN'
    params: { currency: CryptoCurrency }
  }
  ERROR: { reset: boolean }
}

export type DetailsParamsList = {
  COIN: {
    currency: CryptoCurrency
  }
}

export type AppNavigationProps = NativeStackNavigationProp<AppParamsList>
export type DetailNavigationProps = NativeStackNavigationProp<DetailsParamsList>
