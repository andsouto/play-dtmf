module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'webpack'],
		files: ['src/PhoneTonePlayer.spec.ts'],
		preprocessors: {
			'src/PhoneTonePlayer.spec.ts': ['webpack'],
		},
		webpack: {
			devtool: 'inline-source-map',
			mode: 'development',
			module: {
				rules: [{
					test: /\.ts$/,
					exclude: /(node_modules)/,
					use: 'ts-loader',
				}],
			},
			resolve: {
				extensions: ['.js', '.ts'],
				extensionAlias: {
					'.js': ['.ts', '.js'],
				}
			},
		},
		exclude: [],
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		browserNoActivityTimeout: 30000,
		singleRun: false,

		client: {
			captureConsole: true,
			mocha: {
				timeout: 6000,
			},
		},
	});
};
