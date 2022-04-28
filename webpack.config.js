const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
      watch: true
    },
    hot: true,
    open: true
  },
};