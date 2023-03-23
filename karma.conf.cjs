module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'webpack'],
		files: ['lib/**/*.spec.js'],
		preprocessors: {
			'lib/**/*.spec.js': ['webpack'],
		},
		webpack: {
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
