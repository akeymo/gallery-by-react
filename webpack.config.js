var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin'); //清楚build目录重复的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //分离css文件

module.exports = {
	entry: [
		'./src/index.js',
		'webpack/hot/only-dev-server'
	],

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: './build/'
	},

	devtool: 'eval-source-map',

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg)$/,
				use: ['url-loader?limit=8129'],
			}
		]
	},

	resolve: {
		modules: [
			'node_modules',
			path.join(__dirname, 'src')
		],
		extensions: ['.js', '.jsx'],
	},

	devServer: {
		hot: true,
		port: 8000,
		publicPath: './build/',
		stats: {
			colors: true
		}
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: '[name].[hash].css',
			disable: false,
			allChunks: true,
		}),
		new CleanWebpackPlugin(['build'])
	],
}