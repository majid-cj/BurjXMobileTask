import React, { FC, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { AppTheme } from '@react-navigation/native'

import filter from 'lodash/filter'

import { CryptoPrice } from '~/core/components/cards'
import { CryptoCurrency, FeatureCryptoCurrencyData, FeatureDailyPriceData } from '~/core/models'
import { useAppStore } from '~/hooks'

import { FeatureDailyPriceView } from './FeatureDailyPriceView'
import { Spacer } from '~/core/components'

interface CryptoListViewProps {
  crypto: Array<CryptoCurrency>
  dailyPrice: FeatureDailyPriceData
  featureCoins: FeatureCryptoCurrencyData
}

export const CryptoListView: FC<CryptoListViewProps> = ({ crypto, featureCoins, dailyPrice }) => {
  const [search, setSearch] = useState('')
  const { theme, page, getCryptoCurrency, appCurrency, setPagination } = useAppStore()
  const styles = cryptoListViewStyle(theme)

  const loadMore = () => {
    const nextPage = page + 1
    getCryptoCurrency({ currency: appCurrency, page: nextPage, pageSize: 10 })
    setPagination(nextPage)
  }

  const getSearchList = () => {
    const result = filter(
      crypto,
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
    )
    return result.length ? result : crypto
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      initialNumToRender={5}
      keyExtractor={(_, index) => `${index}`}
      style={styles.list}
      data={getSearchList()}
      ListHeaderComponent={
        <FeatureDailyPriceView featureCoins={featureCoins} dailyPrice={dailyPrice} onSearch={setSearch} />
      }
      ListFooterComponent={<Spacer size={'l64'} />}
      renderItem={({ item }: { item: CryptoCurrency }) => <CryptoPrice currency={item} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.9}
      scrollEventThrottle={5}
    />
  )
}

const cryptoListViewStyle = ({}: AppTheme) =>
  StyleSheet.create({
    list: {
      width: '100%',
    },
  })
