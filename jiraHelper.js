// const fetch = require('node-fetch');

const {
	JIRA_BASE_URL,
	JIRA_EMAIL,
	JIRA_API_TOKEN,
	JIRA_PROJECT_KEY,
} = require('./base_lib/constants');

async function createJiraIssue(summary, description) {
	const fetch = (await import('node-fetch')).default;

	// Step 1: Search for an existing issue with the same summary

	const searchExistingJiraTicket = await fetch(
		`${JIRA_BASE_URL}/rest/api/3/search`,
		{
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${JIRA_EMAIL}:${JIRA_API_TOKEN}`
				).toString('base64')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jql: `project = TPI4 AND summary ~ "${summary}"`,
				fields: ['id', 'key', 'status'],
				maxResults: 1,
			}),
		}
	);

	const searchExistingJiraIssuse = await searchExistingJiraTicket.json();

	// Check if an existing issue was found
	if (
		searchExistingJiraIssuse.issues &&
		searchExistingJiraIssuse.issues.length > 0
	) {
		const existingIssuse = searchExistingJiraIssuse.issues[0];

		// console.log(
		// 	`🚀 Issue already exists: ${existingIssuse},${JSON.stringify(
		// 		searchExistingJiraIssuse.issues[0],
		// 		null,
		// 		2
		// 	)}`
		// );
		// console.log(
		// 	'🚀👊 ~ file: jiraHelper.js:33 ~ existingIssuse:',
		// 	existingIssuse
		// );

		// Construct the issue URL
		const issueUrl = `${JIRA_BASE_URL}/jira/software/projects/${JIRA_PROJECT_KEY}/issues/${existingIssuse.key}`;
		// console.log('Issue URL:', issueUrl);
		return {
			issueId: existingIssuse.id,
			issueKey: existingIssuse.key,
			status: existingIssuse.fields.status.name,
			issueUrl,
		};
	}

	// Step 2: Create a new issue if no existing issue was found
	const createJiraTicket = await fetch(`${JIRA_BASE_URL}/rest/api/3/issue`, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(
				`${JIRA_EMAIL}:${JIRA_API_TOKEN}`
			).toString('base64')}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fields: {
				project: {
					key: JIRA_PROJECT_KEY,
				},
				summary: summary,
				description: {
					type: 'doc',
					version: 1,
					content: [
						{
							type: 'paragraph',
							content: [
								{
									text: description,
									type: 'text',
								},
							],
						},
					],
				},
				issuetype: {
					name: 'Bug',
				},
			},
		}),
	});
	const createJiraIssue = await createJiraTicket.json();
	if (createJiraIssue.errors) {
		// console.log('Error creating issue:', createJiraIssue.errors);
		throw new Error('Failed to create Jira issue.');
	}
	// Construct the issue URL
	const issueUrl = `${JIRA_BASE_URL}/jira/software/projects/${JIRA_PROJECT_KEY}/issues/${createJiraIssue.key}`;
	// console.log('Issue URL:', issueUrl);

	// console.log('🚀 New issue created:', createJiraIssue.key, createJiraIssue);
	return createJiraIssue, issueUrl;
}

async function fetchAllJiraIssues() {
	const fetch = (await import('node-fetch')).default;

	let allIssues = [];
	let startAt = 0;
	const maxResults = 100; // Maximum allowed by Jira API

	while (true) {
		// Fetch issues with pagination
		const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/search`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${JIRA_EMAIL}:${JIRA_API_TOKEN}`
				).toString('base64')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jql: `project = ${JIRA_PROJECT_KEY}`,
				startAt,
				maxResults,
				fields: ['id', 'key', 'summary', 'status'], // Specify fields to optimize response size
			}),
		});

		const data = await response.json();

		if (data.errorMessages) {
			console.log('Error fetching issues:', data.errorMessages);
			throw new Error('Failed to fetch Jira issues.');
		}

		// Add issues to the list
		allIssues = allIssues.concat(data.issues);

		// Break if all issues have been fetched
		if (data.issues.length < maxResults) {
			break;
		}

		// Move to the next page
		startAt += maxResults;
	}

	return allIssues;
}

// Example Usage
(async () => {
	try {
		const issues = await fetchAllJiraIssues();
		// console.log(`Total issues fetched: ${issues.length}`);
		// console.log('Issues:', issues);
	} catch (error) {
		console.error('Error:', error.message);
	}
})();

module.exports = { createJiraIssue, fetchAllJiraIssues };
