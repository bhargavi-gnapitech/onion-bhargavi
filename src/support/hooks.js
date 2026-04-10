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
		const openPages = global.context
			? global.context.pages().filter((p) => !p.isClosed())
			: global.page && !global.page.isClosed()
				? [global.page]
				: [];

		const activePage = openPages.length
			? openPages[openPages.length - 1]
			: null;

		if (activePage) {
			screenshot = await activePage.screenshot();
			screenshotBase64 = screenshot.toString('base64');
			await this.attach(screenshot || screenshotBase64, 'image/png');
		}

		const videoArtifacts = openPages.map((page, index) => ({
			index,
			page,
			video: page.video(),
		}));

		const videoPaths = [];
		for (const artifact of videoArtifacts) {
			try {
				if (!artifact.page.isClosed()) {
					await artifact.page.close();
				}

				// Harish, 07-04-26: wait for Playwright to finalize the .webm file after page close
				//                   without this the video has no duration and plays as a live stream
				await new Promise(resolve => setTimeout(resolve, 1000));

				const videoPath = artifact.video ? await artifact.video.path() : null;
				if (videoPath && fs.existsSync(videoPath)) {
					videoPaths.push(videoPath);
					const videoBuffer = fs.readFileSync(videoPath);
					await this.attach(videoBuffer, 'video/webm');
					console.log(`Video recording status [tab ${artifact.index + 1}]: Recorded at ${videoPath}`);
				} else {
					console.log(`Video recording status [tab ${artifact.index + 1}]: Not recorded`);
				}
			} catch (videoErr) {
				console.log(`Error while attaching video for tab ${artifact.index + 1}:`, videoErr.message);
			}
		}

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
		// Harish, 07-04-26: disabled Onion backend API call — not needed for IQGeo work
		// scenarioData is kept above in case it is needed in future
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
