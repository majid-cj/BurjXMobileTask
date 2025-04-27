module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-transform-private-methods', { loose: true }],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '~': './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
