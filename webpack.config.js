const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
          // need to use it with HtmlWebpackPlugin
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
    new MiniCSSExtractPlugin({
      filename: '[name].css',
    }),
  ],
}

module.exports = config
