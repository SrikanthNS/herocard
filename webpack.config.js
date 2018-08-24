/* HTML INJECTOR */
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

/* CSS TEXT INJECTOR */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'app.bundle.css'
});

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/index.js',
    module: {
        rules: [
            {
                test: /\.js$/, // Matches all the js file which needs to be transpiled by the loader
                exclude: /node_modules/, // Needs to exclude all the node_modules files while the transpiling occurs
                loader: 'babel-loader' // The loader used to do the transpiling
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
                //loader: require.resolve("url-loader") + "?name=../[path][name].[ext]",
            },
            {
                test: /\.(s*)css$/, /* CSS Preprocesser Configuration */
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']                  
                })                
            }
        ]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/build'
    },
    plugins: [HTMLWebpackPluginConfig, ExtractTextPluginConfig],
    devServer: {
        port: 3000
    },    
};