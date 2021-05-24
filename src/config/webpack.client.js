const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = (env) => {
  const assetsPath = "/assets/";
  return {
    target: "web",
    entry: {
      bundle: "./src/index.js",
    },
    mode: env.development ? "development" : "production",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "../../build/assets"),
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            maxSize: 300000,
            name: "vendor",
            chunks: "all",
          },
        },
      },
    },
    resolve: {
      alias: {
        Actions: path.resolve(__dirname, "../../src/store/actions/"),
        Components: path.resolve(__dirname, "../../src/components/"),
        Pages: path.resolve(__dirname, "../../src/pages/"),
        Server: path.resolve(__dirname, "../../src/server/"),
        History: path.resolve(__dirname, "../../src/history/"),
        Utils: path.resolve(__dirname, "../../src/utils/"),
        Styles: path.resolve(__dirname, "../../src/styles/"),
        AppConstants: path.resolve(__dirname, "../../src/app-consts/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            publicPath: "assets",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: "url-loader?limit=100000",
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.(?:css|scss)$/,
          exclude: "/node_modules/",
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  return (
                    path.relative(path.dirname(resourcePath), context) + "/"
                  );
                },
              },
            },
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: '$assetsPath: "' + assetsPath + '";',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ExtractCssChunks({
        filename: "[name].[hash].css",
      }),
      new WebpackManifestPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../../public/"),
            to: path.resolve(__dirname, "../../build/assets"),
          },
        ],
      }),
      new CaseSensitivePathsPlugin(),
    ],
  };
};
