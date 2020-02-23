const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    https: true,
    port: 5000
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  }
};