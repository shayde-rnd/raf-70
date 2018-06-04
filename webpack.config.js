const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
     },
     {
      test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
      loader: 'url-loader',
      query: {
        limit: 5120,
        name: '[name].[hash].[ext]'
      }
    },

    {
      test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
      loader: 'url-loader',
      query: {
        limit: 5120,
        name: '[name].[hash].[ext]'
      }
    }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};
