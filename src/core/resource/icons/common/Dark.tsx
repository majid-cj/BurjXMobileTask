import React, { FC } from 'react'
import SVG, { Path, G } from 'react-native-svg'

import { IconsProps } from './types'

export const Dark: FC<IconsProps> = ({ color = '#000', size = 25 }) => {
  return (
    <SVG width={size} height={size} viewBox='0 0 32 32'>
      <G data-name='Lager 94'>
        <Path
          data-name='Path 70'
          d='M12.516 4.509A12 12 0 0022.3 19.881 12.317 12.317 0 0024 20a11.984 11.984 0 003.49-.514 12.1 12.1 0 01-9.963 8.421A12.679 12.679 0 0116 28a12 12 0 01-3.484-23.491M16 0a16.5 16.5 0 00-2.212.15A16 16 0 0016 32a16.526 16.526 0 002.01-.123 16.04 16.04 0 0013.84-13.665 16.516 16.516 0 00.15-2.268A1.957 1.957 0 0030 14a2.046 2.046 0 00-1.23.413A7.942 7.942 0 0124 16a8.35 8.35 0 01-1.15-.08 7.995 7.995 0 01-5.264-12.7A2.064 2.064 0 0016.056 0z'
          fill={color}
        />
      </G>
    </SVG>
  )
}
