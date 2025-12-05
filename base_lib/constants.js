const IQGEO_USERNAME = 'sunaina';
const IQGEO_PASSWORD = 'iqgeo';
const BASE_URL = 'https://dev2.neon.iqgeo.cloud/iqgeo_dev/';                         //https://uat.neon.iqgeo.cloud

// JIRA DETAILS
const JIRA_BASE_URL = 'https://gnapi-ticketspi.atlassian.net';
const JIRA_EMAIL = 'ravula.mohanish@gnapitech.com';
const JIRA_API_TOKEN =
	'ATATT3xFfGF0Ifh3iIYs68e0IS9c4pz7IcGf3ecqTxJ_ctAwb_5gkTjK_6S7qbwmSTavN7uyOtlqXVKcCaib8U9ovQM6zXGUOztTkieWajWzlQLZjBXEn9oO9ftkzAEzRtC3PTovo05SUAcVQORikyCip5aYMdyGJQS_qzuTQy4ULgt6rljvbdQ=D685276C';
const JIRA_PROJECT_KEY = 'TPI4';

// git Details
const GIT_WORKFLOW_URL =
	'https://api.github.com/repos/gnapi-vinoth/onion/dispatches';

const GIT_AUTHERISATION_TOKEN = process.env.GIT_AUTHERISATION_TOKEN || '';
module.exports = {
	IQGEO_USERNAME,
	IQGEO_PASSWORD,
	BASE_URL,
	JIRA_BASE_URL,
	JIRA_EMAIL,
	JIRA_API_TOKEN,
	JIRA_PROJECT_KEY,
	GIT_WORKFLOW_URL,
	GIT_AUTHERISATION_TOKEN,
};
