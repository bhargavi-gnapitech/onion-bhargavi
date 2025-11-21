// Importing the 'cucumber-html-reporter' module to generate a report in HTML format.
const { execSync } = require('child_process');
const report = require('cucumber-html-reporter');

// Importing the 'fs' module to handle file system operations, such as reading files.
const fs = require('fs');

const os = require('os'); // Importing 'os' module to get system-related information

// Reading the content of the 'cucumber_report.json' file and parsing it as JSON.
// This file contains test execution details (e.g., start time, end time).
const testInfo = JSON.parse(fs.readFileSync('./reports/cucumber_report.json'));

const gitUser = execSync('git config user.name').toString().trim();
const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Defining the configuration options for the report generation.
const options = {
	// Setting the visual theme of the report to 'bootstrap'.
	theme: 'bootstrap',

	// Specifying the path to the JSON file generated after tests run.
	jsonFile: './reports/cucumber_report.json',

	// Specifying the path and file name where the HTML report will be saved.
	output: './reports/cucumber_report.html',

	// Whether to treat each test scenario as an individual suite or not.
	// Set to 'false' to treat them as part of one suite.
	reportSuiteAsScenarios: true,

	// Automatically open the generated report in the browser after it's created.
	launchReport: true,

	// Branding the report with a custom title.
	brandTitle: 'Gnapi Test Report',
	// Adding a custom logo for branding. Replace 'path/to/your/logo.png' with the actual path to the logo file.

	metadata: {
		'App Version': '1.0.0',
		'Test Environment': 'STAGING',
		Browser: 'Chrome',

		OS: `${os.type()} ${os.release()}`,
		User: os.userInfo().username,
		Git_User: gitUser,
		Git_Branch: gitBranch,
		// "Parallel": "Scenarios",
		// "Executed": "Local"
	},

	// Adding custom data in the report to display specific information.
	customData: {
		title: 'Run Info', // Title of the custom data section in the report.
		data: [
			// Custom information like project name, release version, test cycle, etc.
			{ label: 'Project', value: 'Onion' },
			{ label: 'Release', value: '1.2.3' },
			{ label: 'Cycle', value: 'B11221.34321' },
			// Execution start time, extracted from the 'cucumber_report.json' file.
			{ label: 'Execution Start Time', value: testInfo.startTime },
			// Execution end time, for now set the same as the start time (you can modify this based on actual data).
			{ label: 'Execution End Time', value: testInfo.startTime },
			// Browser and system information
			{ label: 'Browser', value: 'chrome' }, // Example browser, replace with dynamic data if available
			{ label: 'User Agent', value: 'bjhb' },
			{ label: 'OS', value: `${os.type()} ${os.release()}` },
			{ label: 'User', value: os.userInfo().username },
		],
	},
	brandImage: './branding/branding/GNAPI LOGO.png',
};
// updateTestResults(testInfo);

console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

// Generate the HTML report using the specified options.
console.log(
	'Brand image path:',
	fs.existsSync('./branding/branding/GNAPI LOGO.png')
);


report.generate(options);

let filePath = './reports/cucumber_report.html'; // Path to output file
let dataPath = './reports/cucumber_report.json'; // Path to input JSON file

const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Convert JSON data to HTML
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cucumber Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: auto;
        }
    </style>
</head>
<body>
    <h1>Cucumber Report</h1>
    <pre>${JSON.stringify(jsonData, null, 2)}</pre>
</body>
</html>
`;

// Write the HTML content to the file
fs.writeFileSync(filePath, htmlContent, 'utf-8');

console.log(`JSON data successfully written to ${filePath}`);
// } catch (err) {
// 	console.error(`Error processing file: ${err.message}`);
// } finally {
// 	// Close the file descriptor
// 	if (fd !== undefined) {
// 		fs.closeSync(fd);
// 	}
// }

// Function to insert the brand image before the title in the HTML report
function insertBrandImage() {
	const filePath = './reports/cucumber_report.html';

	// Check if the HTML file exists
	if (fs.existsSync(filePath)) {
		let htmlContent = fs.readFileSync(filePath, 'utf8');

		// Insert the brand image before the title
		const brandImageHTML = `<img src="../branding/branding/GNAPI LOGO.png" alt="Brand Logo" style="height: 50px; margin-right: 10px;">`;

		htmlContent = htmlContent.replace(
			'<a class="navbar-brand">Gnapi Test Report</a>',
			`<a class="navbar-brand">${brandImageHTML} </br> Gnapi Test Rport</a>`
		);

		// Save the modified HTML content back to the file
		fs.writeFileSync(filePath, htmlContent, 'utf8');
		console.log('Brand image inserted before the title in the report.');
	} else {
		console.error('Report file not found!');
	}
}

// Call the function to insert the brand image
insertBrandImage();
// }

// Call the function to update test results
