module.exports = {
	default: {
		'world-parameters': {
			baseURL: 'https://dev2.neon.iqgeo.cloud/pre-uat/login',
		},
		tags: process.env.npm_config_TAGS,
		formatOptions: {
			snippetInterface: 'async-await',
		},
		paths: ['src/test/gigapower/**/*.feature'],

		dryRun: false,
		require: ['src/test/gigapower/**/*.js', 'src/support/hooks.js'],

		format: [
			'progress-bar',
			'html:test-results/cucumber-report.html',
			'json:test-results/cucumber-report.json',
			'rerun:@rerun.txt',
		],
		parallel: 2,
	},
	rerun: {
		formatOptions: {
			snippetInterface: 'async-await',
		},

		dryRun: false,
		require: ['src/test/**/*.js', 'src/hooks/hooks.js'],

		format: [
			'progress-bar',
			'html:test-results/cucumber-report.html',
			'json:test-results/cucumber-report.json',
			'rerun:@rerun.txt',
		],
		parallel: 2,
	},
};

console.log('Using tag:', process.env.npm_config_TAGS); // Add this to verify the tag
