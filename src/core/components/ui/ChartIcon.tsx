import React, { FC } from 'react'

import { useAppStore } from '~/hooks'
import { Candle, Line } from '~/core/resource/icons/common'

export const ChartIcon: FC = () => {
  const { theme, chartView } = useAppStore()
  const Icon = chartView === 'candle' ? Line : Candle
  return <Icon color={theme.colors.text} size={theme.space.large} />
}
