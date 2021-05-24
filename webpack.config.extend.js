/**
 * Project's customized Webpack Configuration Extension
 * ----------------------------------------------------
 *
 * this file is heavily inspired by `react-app-rewired` mechanism.
 *
 * it simply gives you the chance to hook into the default Webpack
 * configuration as it is provided by `create-react-app`, and to
 * change it so to match your project's needs.
 *
 * If you want to check out the default values look into:
 * `./node_modules/marcopeg-react-scripts/config/webpack.config.${env}.js`
 *
 */

const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const rtlcssLoader = path.resolve(__dirname, "rtlcss-loader.js");

module.exports = (webpackConfig, env, { paths }) => {
  /**
    // Support for RTL
    const sassRegex = /\.(scss|sass)$/.toString();
    webpackConfig.module.rules[2].oneOf.some((rule, idx) => {
        if (rule.test && rule.test.toString() === sassRegex) {
            webpackConfig.module.rules[2].oneOf[idx]['use'].splice(
                webpackConfig.module.rules[2].oneOf[idx]['use'].length - 1,
                0,
                rtlcssLoader
            );
            return true;
        }
    });
*/

  // Support for use custom .eslintrc
  webpackConfig.module.rules.some((rule) => {
    if (Array.isArray(rule.use)) {
      const eslintUse = rule.use.find((item) =>
        Object.keys(item.options).find((key) => key === "useEslintrc")
      );
      eslintOptions = eslintUse && eslintUse.options;
      if (eslintOptions) {
        eslintOptions.useEslintrc = true;
        return true;
      }
    }
  });

  // Allow cofiguration of router base href
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
    }),
  ]);

  // Enable BundleAnalyzerPlugin
  // webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  //     new BundleAnalyzerPlugin()
  // ]);

  // here you can extend your webpackConfig at will
  return webpackConfig;
};
