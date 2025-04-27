import { AppTheme } from '@react-navigation/native'

export const AppLightTheme: AppTheme = {
  dark: false,
  colors: {
    secondary: '#888888',
    accent: '#FFA500',
    danger: '#FF3333',
    success: '#00A843',
    background: '#F5F5F5',
    text: '#1A1A1A',
    lightText: '#666666',
    darkText: '#000000',
    lightBackground: '#FFFFFF',
    branchBackground: '#E8E8E8',
    border: '#CCCCCC',
    primary: '#FFA500',
    card: '#FFFFFF',
    notification: '#FF3333',
  },
  space: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  fonts: {
    smallFont: {
      fontSize: 12,
      color: '#1A1A1A',
    },
    mediumFont: {
      fontSize: 16,
      color: '#1A1A1A',
    },
    largeFont: {
      fontSize: 20,
      color: '#1A1A1A',
    },
    xLargeFont: {
      fontSize: 28,
      color: '#1A1A1A',
    },
  },
}
