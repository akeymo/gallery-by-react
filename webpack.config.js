var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname,'./src/main.js'),
	
	output: {
		path: path.join(__dirname, './build/'),
		filename: 'bundle.js'
	},

	devtool: 'eval-source-map',

	devServer: {
		port: 9000,
		inline: true,
		hot: true,
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react']
					}
				}
			}
		]
	},
}