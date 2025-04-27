import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import Svg, { Defs, Rect,  RadialGradient, Stop } from 'react-native-svg'

interface BackgroundProps {
  fromColor: string
  toColor: string
  height: number
  width: number
}

export const Background: FC<BackgroundProps> = ({ fromColor, toColor, height, width }) => {
  return (
    <Svg height={height} width={width} style={StyleSheet.absoluteFillObject}>
      <Defs>
        <RadialGradient id='grad' cx='50%' cy='50%' r='25%'>
          <Stop offset='0' stopColor={fromColor} />
          <Stop offset='1' stopColor={toColor} />
        </RadialGradient>
      </Defs>
      <Rect width={width} height={height} fill='url(#grad)' />
    </Svg>
  )
}
