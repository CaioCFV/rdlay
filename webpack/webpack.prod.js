const path = require("path");
const glob = require("glob");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PATHS } = require("./utils/constants");
const commonRules = require("./common/rules");
const commonPlugins = require("./common/plugins");

const config = (env) => {
  return {
    entry: {
      "application.js": glob.sync(`${PATHS.scripts}/*/*.js`),
      "atacado-cadastro.js": glob.sync(`${PATHS.scripts}/atacado-cadastro.js`),
    },
    output: {
      filename: `0-${env.STORE_ACRO}-web-[name]`,
      path: path.resolve(__dirname, PATHS.deploy),
    },
    module: {
      rules: [...commonRules],
    },
    plugins: [
      ...commonPlugins,
      new MiniCssExtractPlugin({
        filename: `0-${env.STORE_ACRO}-web-styles.css`,
      }),
    ],
  };
};

module.exports = config;
