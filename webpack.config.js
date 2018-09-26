/* HTML INJECTOR */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body',
});

/* CSS TEXT INJECTOR */
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'app.bundle.css',
});

module.Exports= {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, '/app/index.js'),
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      './node_modules',
      path.resolve(__dirname, '/app/index.js'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Matches all the js file which needs to be transpiled by the loader
        exclude: /node_modules/, // Needs to exclude all the node_modules files while the transpiling occurs
        loader: 'babel-loader', // The loader used to do the transpiling
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
        // loader: require.resolve("url-loader") + "?name=../[path][name].[ext]",
      },
      {
        test: /\.(s*)css$/, /* CSS Preprocesser Configuration */
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  output: {
    filename: 'transformed.js',
    path: path.join(__dirname, '/build'),
  },
  plugins: [HTMLWebpackPluginConfig,
    ExtractTextPluginConfig,
    new CopyWebpackPlugin([
      { from: 'app/images', to: 'images' },
    ])],
  devServer: {
    port: 3000,
  },
};
