import React, { FC } from 'react'
import SVG, { Path } from 'react-native-svg'

import { IconsProps } from './types'

export const Line: FC<IconsProps> = ({ color = '#000', size = 25 }) => {
  return (
    <SVG width={size} height={size} viewBox='0 0 24 24' fill={'none'}>
      <Path d='M3 16.5L9 10l4 6 8-9.5' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
    </SVG>
  )
}
