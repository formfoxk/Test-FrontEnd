const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const common = {
	context: path.join(__dirname),

	entry: {
		bundle: './src/js/index.js'
	},

	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist')
	},

	devtool: 'eval-source-map',

	module: {
		rules: [{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
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
						publicPath: './dist',
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
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './index.html'),
			filename: path.join(__dirname, './dist/index.html'),
			inject: true,
			// minify: {
			// 	collapseWhitespace: true,
			// 	keepClosingSlash: true,
			// 	removeComments: true
			// }
		}),
		// new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
		// new webpack.DefinePlugin({
		//     'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV),
		//     'process.env.DEBUG' : JSON.stringify(process.env.DEBUG)
		// })
	]
};

const prodConfig = {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
	]
}

const serverConfig = {
	devServer: {
		hot: true,
		inline: true,
		port: 4000,
		// compress: true,
		// publicPath: '/dist/',
		contentBase: path.join(__dirname, '/dist/')
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
}

const target = process.env.npm_lifecycle_event;
console.log('target : ' + target);
var config;
if (target === 'watch') {
	config = common;
} else if (target === 'build') {
	config = webpackMerge(common, prodConfig);
} else if (target === 'dev') {
	config = webpackMerge(common, serverConfig);
}

module.exports = config;
