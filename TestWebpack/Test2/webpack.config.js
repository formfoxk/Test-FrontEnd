const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
}

const common = {
	entry: {
		bundle: PATHS.src + '/js'
	},

	output: {
		filename: '[name].js',
		path: PATHS.dist
	},

	module: {
		rules: [{
				test: /\.js$/,
				include: PATHS.src,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
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
			filename: 'commons.js',
			minChunks: Infinity
		}),
		new ExtractTextPlugin('[name].css'),
		// new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
		// new webpack.DefinePlugin({
		//     'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV),
		//     'process.env.DEBUG' : JSON.stringify(process.env.DEBUG)
		// })
	]
};

const prodConfig = {
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.src + '/index.html',
			filename: PATHS.dist + '/index.html',
			inject: true,
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
	]
}

const devConfig = {
	// devtool: 'eval-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.src + '/index.html',
			filename: PATHS.dist + '/index.html',
			inject: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		// hot: true,
		inline: true,
		port: 4000,
		compress: true,
		// publicPath: '/dist/',
		contentBase: PATHS.dist
	},
}

const target = process.env.npm_lifecycle_event;
console.log('target : ' + target);
var config;
if (target === 'build:prod') {
	config = webpackMerge(common, prodConfig);
} else {
	config = webpackMerge(common, devConfig);
}

module.exports = config;
