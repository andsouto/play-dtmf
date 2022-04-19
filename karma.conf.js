'use strict';

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'webpack'],
		files: ['test/**/*.js'],
		preprocessors: {
			'test/**/*.js': ['webpack'],
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
		//browsers: ['Firefox'],
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
