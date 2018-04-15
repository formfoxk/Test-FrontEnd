const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		main: './src/js/entry.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, './dist')
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
						// presets: [[
						//     'env', {
						//         targets: {
						//             browsers: ['last 2 versions']
						//         }
						//     }
						// ]]
					}
				}
			},
			// {
			//     test: /\.css$/,
			//     use: [
			//         'style-loader',
			//         'css-loader'
			//     ]
			// },
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('style.css')
	]
};
