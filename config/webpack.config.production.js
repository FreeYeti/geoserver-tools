const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: ["./src/portal/index.js"],
  },
  output: {
    path: path.resolve(path.dirname(__dirname), "assets"),
    filename: "[name].[fullhash].bundle.js",
    publicPath: "/",
    chunkFilename: "[name].[id].js",
  }, // output
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@portal": path.resolve(__dirname, "../src/portal"),
    },
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      name: "vendor",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|reduxjs)[\\/]/,
          name: "react",
          chunks: "all",
          reuseExistingChunk: true,
        },//react
      },//cacheGroups
    },//splitChunks
  },//optimization
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules|zip/,
      }, //JSX and JS -> babel-loader

      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },

      {
        test: /\.less$/,
        exclude: /node_modules|zip/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "less-loader" },
        ],
      }, // less -> css

      {
        test: /antd\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      }, // less -> css

      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      }, // Images -> url
    ], // rules
  }, // module
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/portal/index.html",
      chunks: ["index"],
      hash: true,
    }), // HTML plugin - portal
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      PATH_PREFIX: JSON.stringify(process.env.PATH_PREFIX),
      GEOSERVER: JSON.stringify("https://geo.westdc.cn/geoserver"),
    }), // Define plugin
    new MiniCssExtractPlugin({
      chunkFilename: "[name].[hash].bundle.css",
      filename: "[name].bundle.css",
    }), // MiniCssExtractPlugin
  ], //plugins
  performance: {
    hints: false,
  },
};
