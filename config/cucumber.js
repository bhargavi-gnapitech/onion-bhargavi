// module.exports = {
// 	default: {
// 		'world-parameters': {
// 			baseURL: 'https://dev2.neon.iqgeo.cloud/pre-uat/login',
// 		},
// 		tags: process.env.npm_config_TAGS,
// 		formatOptions: {
// 			snippetInterface: 'async-await',
// 		},
// 		paths: ['src/test/gigapower/**/*.feature'],

// 		dryRun: false,
// 		require: ['src/test/gigapower/**/*.js', 'src/support/hooks.js'],

// 		format: [
// 			'progress-bar',
// 			'html:test-results/cucumber-report.html',
// 			'json:test-results/cucumber-report.json',
// 			'rerun:@rerun.txt',
// 		],
// 		parallel: 2,
// 	},
// 	rerun: {
// 		formatOptions: {
// 			snippetInterface: 'async-await',
// 		},

// 		dryRun: false,
// 		require: ['src/test/**/*.js', 'src/hooks/hooks.js'],

// 		format: [
// 			'progress-bar',
// 			'html:test-results/cucumber-report.html',
// 			'json:test-results/cucumber-report.json',
// 			'rerun:@rerun.txt',
// 		],
// 		parallel: 2,
// 	},
// };

// console.log('Using tag:', process.env.npm_config_TAGS); // Add this to verify the tag
module.exports = {
	default: {
		// World parameters
		'world-parameters': {
			baseURL: 'https://dev2.neon.iqgeo.cloud/pre-uat/login',
		},

		// Read tags passed from npm, example:
		// npm run test --TAGS="@tag1 or @tag2"
		tags: process.env.npm_config_TAGS || "",

		// Feature file locations
		paths: ['src/test/gigapower/**/*.feature'],

		// Step definitions + hooks
		require: [
			'src/test/gigapower/**/*.js',
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
			'src/test/**/*.js',
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
console.log("Using tag:", process.env.npm_config_TAGS);
