import React, { FC } from 'react'

import { useAppStore } from '~/hooks'
import { Dirham, Dollar } from '~/core/resource/icons/common'
import { IconsProps } from '~/core/resource/icons/common/types'

export const CurrencyIcon: FC<IconsProps> = ({ size }) => {
  const { theme, appCurrency } = useAppStore()
  const Icon = appCurrency === 'usd' ? Dollar : Dirham
  return <Icon color={theme.colors.text} size={size} />
}
