# BurjX Mobile Task

This project is a React Native application developed with Expo, designed to display cryptocurrency market data using the provided API endpoints. It features three main screens:
- Biometric Authentication for secure access
- Market Overview for browsing different categories of cryptocurrencies with
- Coin Details for in-depth analysis of individual coins.

The app provides a responsive and interactive user experience across various mobile devices.


### Setup Instructions

To set up and run the app locally, follow these steps:

Clone the repository: [BurjXMobileTask](https://github.com/majid-cj/BurjXMobileTask)

```
gh repo clone majid-cj/BurjXMobileTask
```


Install dependencies:

```
yarn install
```

Run the app:

```
npx expo run:ios
```


Screens


### Biometric Authentication

Manages user authentication using biometric data (e.g., fingerprint or face recognition).
If biometric authentication is not configured, the user is prompted to set it up.
If already set up, the user is authenticated and granted access to the app.


<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/AUTH_DARK.jpeg" alt="Alt Text" width="60" height="130">

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/AUTH_LIGHT.jpeg" alt="Alt Text" width="60" height="130">



### Market Overview

Divided into two primary sections:

#### Featured

- Top 20 cryptocurrencies by market cap
- Top 20 by 24-hour percentage gain
- Top 20 by 24-hour percentage loss

#### overview
- Supports infinite scrolling to load more coins as the user scrolls.


Designed to be responsive and work well on different mobile screen sizes.


<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/MAIN_DARK.jpeg" alt="Alt Text" width="60" height="130">

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/MAIN_LIGHT.jpeg" alt="Alt Text" width="60" height="130">

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/SEARCH.jpeg" alt="Alt Text" width="60" height="130">



### Coin Details


Provides a detailed view of individual coins, including:
A live price chart that can be toggled between line chart and candlestick views.
A dropdown or list to switch between different coins.
Additional data such as 24-hour volume, market cap, and circulating supply.


<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/CANDLE_GAIN.jpeg" alt="Alt Text" width="60" height="130">

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/CANDLE_LOSE.jpeg" alt="Alt Text" width="60" height="130">


<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/LINE_GAIN.jpeg" alt="Alt Text" width="60" height="130">

<img src="https://raw.githubusercontent.com/majid-cj/assets/refs/heads/master/screenshots/LINE_LOSE.jpeg" alt="Alt Text" width="60" height="130">


```
API Integration
```

The app utilizes the following provided API endpoints:

```
All Coins: https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=10
```
Fetches the list of coins with pagination support (dynamic page and pageSize parameters).

```
Coin Data (OHLC): https://coingeko.burjx.com/coin-ohlc?productId=2&days=30
```
Retrieves OHLC (Open, High, Low, Close) data for a specific coin over different time periods (e.g., 1, 7, 30, 365 days, or max).


### Project Structure

The source code of the application is organized under the src directory, which includes the following main folders:

#### core:
Contains foundational and reusable code essential for the application.
- components
- constants
- models
- network
- resource

#### hooks:
Includes custom hooks for managing state and logic

#### locale:
Manages localization and internationalization files for multi-language support.

#### navigation:
Handles the application's navigation logic and routing.

#### screens:
Organizes the main screens of the app, each within its own subfolder:
- Authenticate: Components for the biometric authentication screen.
- Details: Components for the coin details screen.
- Error: Components for error handling and display.
- Home: Components for the market overview screen.


#### store:
Manages the application's state using Zustand, a small, fast, and scalable state management solution. It includes stores for cryptocurrency data, price data, theme, and utility functions.

