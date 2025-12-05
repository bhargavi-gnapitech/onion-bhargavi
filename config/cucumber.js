
module.exports = {
	default: {
		// World parameters
		'world-parameters': {
			baseURL: 'https://dev2.neon.iqgeo.cloud/pre-uat/login',
		},

		// Read tags passed from npm, example:
		// npm run test --TAGS="@tag1 or @tag2"
		// tags: process.env.npm_config_TAGS || "",
		tags: process.env.npm_config_TAGS? process.env.npm_config_TAGS.split(',').join(' or ') : "",

		// Feature file locations
		paths: ['src/test/IQGeo/**/*.feature'],

		// Step definitions + hooks
		require: [
			'src/test/IQGeo/steps/**/*.js',
			'src/support/hooks.js',
		],

		// Report formats
		format: [
			'progress-bar',
			'html:test-results/cucumber-report.html',
			'json:test-results/cucumber-report.json',
			'rerun:@rerun.txt',
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
			'src/test/IQGeo/steps/**/*.js',
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

// Print tag used for debugging
console.log("Using tag: dffsad", process.env.npm_config_TAGS);
