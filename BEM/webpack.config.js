const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname),
}

const common = {
    entry: {
        bundle: PATHS.src + '/js/index.js',
    },

    output: {
        filename: 'js/[name].js',
        path: PATHS.dist
    },

    module: {
        rules: [
            // {
            //     test: /\.(html)$/,
            //     include: PATHS.src + '/html',
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             interpolate: true
            //         }
            //     }
            // },
            // {
            //     test: /\.ejs$/,
            //     loader: 'ejs-html-loader',
            //     options: {
            //       title: 'The Ant: An Introduction',
            //       season: 1,
            //       episode: 9,
            //       production: process.env.ENV === 'production'
            //     }
            // },
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'ejs-html-loader',
            //         options: {
            //             htmlWebpackPlugin: HtmlWebpackPlugin
            //         }
            //     }, {
            //         loader: 'html-loader',
            //         options: {
            //             interpolate: true
            //         }
            //     }]
            // },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        publicPath: PATHS.dist,
                        limit: 10000
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'js/commons.js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        // 	template: PATHS.src + '/html/index.html',
        // 	filename: PATHS.dist + '/index.html',
        // 	inject: false,
        // }),
    ],

    devtool: 'eval-source-map',

    devServer: {
        // hot: true,
        inline: true,
        port: 4000,
        compress: true,
        // publicPath: '/html/',
        contentBase: PATHS.dist + "/html"
    },
};

module.exports = common;