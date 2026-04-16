
module.exports = {
	default: {
		// World parameters
		'world-parameters': {
			baseURL: 'http://localhost:8085/login',
		},

		// Read tags passed from npm, example:
		// npm run test --TAGS="@tag1 or @tag2"
		// tags: process.env.npm_config_TAGS || "",
		tags: process.env.npm_config_TAGS? process.env.npm_config_TAGS.split(',').join(' or ') : "",

		// Feature file locations
		paths: ['src/test/gigapower/**/*.feature'],

		// Step definitions + hooks
		require: [
			'src/test/gigapower/steps/**/*.js',
			'src/support/hooks.js',
		],

		// Report formats
		format: [
			'progress-bar',
			'html:test-results/cucumber-report.html',
			'json:test-results/cucumber-report.json',
			'rerun:@rerun.txt',
			'allure-cucumberjs/reporter', // Add allure-cucumberjs reporter for Allure integration
		],

		formatOptions: {
			snippetInterface: 'async-await',
		},

		dryRun: false,
		parallel: 2,
	},

	// For rerun support
	rerun: {
		paths: ['@rerun.txt'],

		require: [
			'src/test/Onion/steps/**/*.js',
			'src/support/hooks.js',
		],

		formatOptions: {
			snippetInterface: 'async-await',
		},

		format: [
			'progress-bar',
			'html:test-results/cucumber-report.html',
			'json:test-results/cucumber-report.json',
		],

		dryRun: false,
		parallel: 2,
	},
};

