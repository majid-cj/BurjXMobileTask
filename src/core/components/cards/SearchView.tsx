import React, { FC } from 'react'
import { AppTheme } from '@react-navigation/native'

import { StyleSheet, TextInput, View } from 'react-native'

import { SearchIcon } from '~/core/resource/icons/common'
import { useAppStore } from '~/hooks'

import { SubTitle } from '../texts'
import { strings } from '~/locale'

interface SearchViewProps {
  onSearch: (input: string) => void
}

export const SearchView: FC<SearchViewProps> = ({ onSearch }) => {
  const { theme } = useAppStore()
  const styles = searchViewStyle(theme)
  return (
    <View style={styles.tileSubContainer}>
      <SubTitle text={strings('allCoin')} style={styles.allCoins} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={strings('search')}
          placeholderTextColor={theme.colors.text}
          style={styles.searchField}
          onChangeText={onSearch}
        />
        <SearchIcon color={theme.colors.text} />
      </View>
    </View>
  )
}

const searchViewStyle = ({ colors, space, fonts }: AppTheme) =>
  StyleSheet.create({
    tileSubContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: space.medium,
      marginVertical: space.small,
      backgroundColor: colors.background,
    },
    allCoins: {
      ...fonts.largeFont,
      flex: 0,
      alignSelf: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'light',
      color: colors.text,
      marginVertical: space.small,
      borderBottomColor: colors.success,
      borderBottomWidth: space.small / 4,
      paddingHorizontal: space.large,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: space.medium,
      backgroundColor: colors.branchBackground,
      borderRadius: space.medium,
      paddingHorizontal: space.medium,
      paddingVertical: space.small,
    },
    searchField: {
      flexGrow: 1,
      color: colors.text,
    },
  })
