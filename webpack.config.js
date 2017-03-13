const { CheckerPlugin } = require("awesome-typescript-loader")

module.exports = {
	entry: "./source/main.ts",
	output: {
		filename: "bundle.js",
		path: __dirname + "/dist"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts",".js"]
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: "awesome-typescript-loader" }
		]
	},
	plugins: [ new CheckerPlugin() ]
};