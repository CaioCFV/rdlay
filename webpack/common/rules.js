const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const rules = [
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.scss$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  },
]

module.exports = rules