const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')

const {
  PATHS
} = require('../utils/constants')

const plugins = [
  new OptimizeCSSAssets()
]

module.exports = plugins