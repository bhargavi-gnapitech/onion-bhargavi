// Importing the 'fs' module to handle file system operations, such as reading files.
const fs = require('fs');
const { ONION_BACKEND_Domain } = require('./onion-backend/constants/constants');

async function updateTestResults() {
	let reportContent;
	try {
		const fileContent = fs.readFileSync(
			'./reports/cucumber_report.json',
			'utf-8'
		);

		if (!fileContent.trim()) {
			console.error('Report file is empty.');
			return;
		}

		reportContent = JSON.parse(fileContent);
	} catch (error) {
		console.error('Error reading or parsing JSON:', error.message);
		return;
	}
	console.log('Report content to send:', reportContent);

	// Check if the report content is an array as expected by the API
	if (!Array.isArray(reportContent)) {
		console.error('Invalid report content format. It should be an array.');
		return;
	}

	// Log the payload before sending
	const payload = reportContent; // Use the report content directly
	// console.log('Payload to be sent:', JSON.stringify(payload, null, 2)); // Log the payload

	try {
		const response = await fetch(
			`${ONION_BACKEND_Domain}/api/v1/update-test-results`,
			{
				method: 'PUT',
				headers: {
					'x-api-key':
						'a59c400aeccc2c394f7f82fcfa50902a817dbaf33dbb2a3948316164519acc96',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);

		console.log('🚀👊 ~ response:', response);
		const text = await response.text(); // Read the response as text
		console.log('Raw response text:', text); // Log the raw response text

		if (!response.ok) {
			// If response status is not OK, log the error and throw it
			console.error('Failed to update test results:', text);
			throw new Error(text);
		}
	} catch (error) {
		console.error('Error updating test results:', error);
	}
}

updateTestResults();

module.exports = updateTestResults;
