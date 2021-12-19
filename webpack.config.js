const path = require('path')
const webpack = require('webpack')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isProd = process.env.npm_lifecycle_event === 'build'

const config = {
  mode: isProd ? 'production' : 'development',
  entry: [path.resolve(__dirname, 'src/main.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          // 'style-loader' alternative
          // need to use it with html-webpack-plugin
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'publick',
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],
}

if (!isProd) {
  // development mode
  config.entry.push('webpack-dev-server/client?http://localhost:8085/')
  config.devtool = 'inline-source-map'
  config.plugins.push(
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  )
  config.devServer = {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 8085,
    hot: true,
    client: {
      overlay: true,
      progress: true,
    },
    open: true,
  }
} else {
  // production mode
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  )
}

module.exports = config
