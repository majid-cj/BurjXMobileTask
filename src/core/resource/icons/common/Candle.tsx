import React, { FC } from 'react'
import SVG, { Path } from 'react-native-svg'

import { IconsProps } from './types'

export const Candle: FC<IconsProps> = ({ color = '#000', size = 25 }) => {
  return (
    <SVG width={size} height={size} viewBox='0 0 15 15' fill={'none'}>
      <Path
        d='M.5 0v14.5H15M8.5 0v3.5m-5 6V12m0-8v1.5m10-1.5v2.5m0 4V13m-11-7.5h2v4h-2v-4zm5-2h2v4h-2v-4zm5 3h2v4h-2v-4z'
        stroke={color}
      />
    </SVG>
  )
}
