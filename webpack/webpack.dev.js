const path = require("path");
const glob = require("glob");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
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
      path: path.resolve(__dirname, PATHS.build),
    },
    module: {
      rules: [...commonRules],
    },
    plugins: [
      ...commonPlugins,
      new MiniCssExtractPlugin({
        filename: `0-${env.STORE_ACRO}-web-styles.css`,
      }),
      new BrowserSyncPlugin({
        open: true,
        https: true,
        ui: false,
        host: `${env.STORE_NAME}.vtexlocal.com.br`,
        startpath: "/admin/login/",
        proxy: `https://${env.STORE_NAME}.vtexcommercestable.com.br`,
        serveStatic: [
          {
            route: "/arquivos",
            dir: `${PATHS.build}/`,
          },
        ],
      }),
    ],
  };
};

module.exports = config;
