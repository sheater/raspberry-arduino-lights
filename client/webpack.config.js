var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/App.js',
		'./node_modules/antd/dist/antd.css',
		'./src/index.scss'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(scss|sass|css)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			files: {
				css: [ 'style.css' ],
				js: [ 'bundle.js' ],
			}
		})
	]
};
