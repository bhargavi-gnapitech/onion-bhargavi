// Import the Before function
const { Before, BeforeStep, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { BASE_URL } = require('../../base_lib/constants');
const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const { createJiraIssue } = require('../../jiraHelper');
const {
	ONION_BACKEND_Domain,
} = require('../../onion-backend/constants/constants');
const path = require('path');

const { ENV_URLS } = require('../../base_lib/credentials.js');

Before(function (scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);
  
  let baseUrl = ENV_URLS.UAT; // Default to UAT
  if (tags.includes('@UAT')) {
    baseUrl = ENV_URLS.UAT;
  }
  
  process.env.BASE_URL = baseUrl; // Store in environment variable
  console.log(`Running test on: ${process.env.BASE_URL}`);
});



Before({ timeout: 20000 }, async function () {
	// Increase timeout to 20 seconds
	const videoDir = path.resolve(__dirname, './videos'); // Directory to store recorded videos
	if (!fs.existsSync(videoDir)) {
		fs.mkdirSync(videoDir, { recursive: true });
		console.log(`Video directory created: ${videoDir}`);
	}
	global.browser = await chromium.launch({ headless: false });
	// global.page = await browser.newPage();
	global.context = await browser.newContext({
		recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } }, // Set video recording
	});
	console.log('Context created for video recording');
	global.page = await global.context.newPage();
	//await global.page.goto(BASE_URL);
	console.log('--> Before function is called');

	// Capture browser information
	this.browserInfo = await page.evaluate(() => {
		return {
			userAgent: navigator.userAgent,
			browserVersion: navigator.userAgent,
		};
	});
});

// Capture OS information
const getOSInfo = () => {
	return `${os.type()} ${os.release()} (${os.platform()})`;
};

After({ timeout: 20000 }, async function (scenario) {
	console.log('🚀👊 ~ file: hooks.js:33 ~ scenario:', scenario);

	await this.attach(`UUID: ${scenario.pickle.id}`, 'text/plain');
	// console.log(
	// 	'🚀👊 ~ file: hooks.js:40 ~ TestCase:',
	// 	scenario.testCaseStartedId
	// );
	let screenshot,
		screenshotBase64,
		gitUser,
		gitBranch,
		browserInfo,
		gitCommitInfo = {},
		JiraTicketInfo;

	// Extract browser information
	try {
		if (global.browser) {
			const browserName = global.browser._initializer.name;
			const browserVersion = global.browser._initializer.version;
			browserInfo = `${browserName} ${browserVersion} `;
		} else {
			browserInfo = 'unknown'; // Fallback if browser is not defined
		}
	} catch (error) {
		console.error('Error accessing browser info:', error.message);
		browserInfo = 'unknown'; // Fallback in case of error
	}
	try {
		gitUser = execSync('git config user.name').toString().trim();
	} catch (error) {
		// Access the COMMIT_AUTHOR environment variable
		gitUser = process.env.COMMIT_AUTHOR || 'unknown'; // Use COMMIT_AUTHOR if available
	}

	// Capture the Git branch
	try {
		gitBranch = execSync('git rev-parse --abbrev-ref HEAD')
			.toString()
			.trim();
	} catch (error) {
		gitBranch = 'unknown'; // Fallback if Git branch isn't found
	}

	const commitId = async () => {
		try {
			const commitHash = execSync('git log -1 --format=%H')
				.toString()
				.trim();
			const commitMessage = execSync('git log -1 --format=%s')
				.toString()
				.trim();
			const commitAuthor = execSync('git log -1 --format=%an')
				.toString()
				.trim();
			const commitDate = execSync('git log -1 --format=%cd')
				.toString()
				.trim();

			return {
				commitHash,
				commitMessage,
				commitAuthor,
				commitDate,
			};
		} catch (error) {
			console.error('Error fetching Git commit info:', error.message);
			return {
				commitHash: 'unknown',
				commitMessage: 'unknown',
				commitAuthor: 'unknown',
				commitDate: 'unknown',
			};
		}
	};

	gitCommitInfo = await commitId();
	// Checking Jira Ticket exist or not if test fails
	if (scenario.result.status === 'FAILED') {
		const summary = `Test failed: ${scenario.pickle.name}`;
		const description = `Steps: ${scenario.result?.exception?.message}`;
		JiraTicketInfo = await createJiraIssue(summary, description);
	}

	if (
		scenario.result.status === 'PASSED' ||
		scenario.result.status === 'FAILED'
	) {
		screenshot = await global.page.screenshot();
		screenshotBase64 = screenshot.toString('base64');
		await this.attach(screenshot || screenshotBase64, 'image/png');

		const video = await global.page.video();
		console.log(
			'Video recording status:',
			video ? 'Recorded' : 'Not recorded'
		);

		// const videoPath = video ? await video.path() : null;

		// if (videoPath) {
		// 	console.log(`Video recorded at: ${videoPath}`);
		// 	const videoBuffer = fs.readFileSync(videoPath);
		// 	await this.attach(videoBuffer, 'video/webm');
		// } else {
		// 	console.log('No video recorded for this test.');
		// }

		await global.page.close(); // Ensures the video is saved

		const scenarioData = {
			user_name: gitUser, // Git user
			browser: browserInfo, // Browser details
			os: getOSInfo(), // OS details
			git_name: gitUser,
			git_branch: gitBranch, // Git branch details
			feature_name: scenario.gherkinDocument.feature.name, // Feature name
			feature_language: scenario.gherkinDocument.feature.language, // Feature language
			feature_uri: scenario.gherkinDocument.uri, // Feature URI
			feature_description: scenario.gherkinDocument.feature.description,
			pickle_id: scenario.pickle.id, // Pickle ID
			pickle_name: scenario.pickle.name, // Scenario name
			pickle_language: scenario.pickle.language, // Pickle language
			pickle_steps: scenario.pickle.steps.map((step) => step.text), // Steps as strings
			test_case_started_id: scenario.testCaseStartedId, // Test case ID
			result_status: scenario.result.status, // Result status
			result_duration_seconds: scenario.result.duration.seconds, // Duration (seconds)
			result_duration_nanos: scenario.result.duration.nanos, // Duration (nanos)
			result_message: scenario.result.message,
			exception_stack_trace:
				scenario.result?.exception?.stackTrace || 'N/A', // Stacktrace
			exception_type: scenario.result?.exception?.type || 'N/A',
			exception_message: scenario.result?.exception?.message || 'N/A',
			will_be_retried: scenario.willBeRetried,
			test_result_json: scenario,
			jira_info: JiraTicketInfo,
			git_commit: gitCommitInfo,
		};
		console.log('🚀👊 ~ file: hooks.js:59 ~ scenarioData:', scenarioData);

		// Send a POST request to the API
		try {
			const response = await fetch(
				`${ONION_BACKEND_Domain}/api/v1/test_run`,
				{
					method: 'POST',
					headers: {
						'x-api-key':
							'a59c400aeccc2c394f7f82fcfa50902a817dbaf33dbb2a3948316164519acc96',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(scenarioData),
				}
			);

			console.log('🚀👊 ~ file: hooks.js:108 ~ response:', response);
			if (!response) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const responseData = await response.json();
			console.log('API response:', responseData);

			// fs.rmSync(videoPath, { recursive: true, force: true });
			fs.unlink(videoPath);
		} catch (err) {
			console.log('Error posting scenario data to API:', err);
		}
	}

	if (global.browser) {
		await global.browser.close();
	}
   });

    BeforeStep(async function ({
		pickle,
		pickleStep,
		gherkinDocument,
		testCase,
		testStepId,
	}) {
		console.log('TS:->  ', pickleStep.text);
	});
