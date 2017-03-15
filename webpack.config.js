var webpack = require('webpack');

module.exports = {
	entry: "./source/main.ts",
	output: {
		filename: "bundle.js",
		path: __dirname + "/dist/"
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.ts$/,
				use: "source-map-loader"
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./source/"
	}
};