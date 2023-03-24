module.exports = {
	entry: './index.ts',
	output: {
		filename: 'index.js',
	},
	mode: 'development',
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: {
				loader: 'ts-loader',
			},
		}],
	},
	resolve: {
		extensions: ['.js', '.ts'],
		extensionAlias: {
			'.js': ['.ts', '.js'],
		}
	},
};
