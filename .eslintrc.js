module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  plugins: ['prettier'],
  extends: ['prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': 'error',
        'no-use-before-define': 'on',
      },
    },
  ],
}
