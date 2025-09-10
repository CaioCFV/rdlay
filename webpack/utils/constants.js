const path = require('path')
const PATHS = {
  scripts: path.join(__dirname, '../../assets/js'),
	styles: path.join(__dirname, '../../assets/scss'),
  build: path.join(__dirname, '../../build'),
  deploy: path.join(__dirname, '../../deploy')
}
module.exports = {
	PATHS
}