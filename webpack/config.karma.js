export const devtool = 'inline-source-map';
export const resolve = {
  extensions: [' ', '.js', '.jsx'],
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: ['istanbul'],
      },
    },
    {
      test: /\.scss$/,
      loader: 'ignore-loader',
    },
    {
      test: /\.css$/,
      loader: 'ignore-loader',
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
    },
  ],
};
export const externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
  'react-addons-test-utils': 'react-dom',
};
