const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
const { expect } = require('@playwright/test');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');

let login;
let index;

Given('User Opens the {string}', { timeout: 60000 }, async function (string) {
	await global.page.goto(PRE_UAT_URL);
	await global.page.waitForLoadState('networkidle', { timeout: 30000 });
	console.log('✅ Navigated to IQGeo URL:', PRE_UAT_URL);
});

When('User inputs valid {string} and {string}', { timeout: 60000 }, async function (string, string2) {
	login = new LoginPage(global.page);
	await login.login(USERNAME, PASSWORD);
	await global.page.waitForLoadState('networkidle', { timeout: 60000 });
	console.log('✅ Login credentials submitted');
});

When('Click on Login', { timeout: 60000 }, async function () {
	// Login button is already clicked inside login.login() above.
	// Wait for the index page to load after successful login.
	await global.page.waitForURL('**/index', { timeout: 60000 });
	console.log('✅ Landed on index page after login');
});

Then('User should be navigated to Landing page', { timeout: 60000 }, async function () {
	index = new IndexPage(global.page);
	await index.validateIndexPage();
	console.log('✅ User is on the Landing (Index) page:', global.page.url());
});

// -----------------------------------------------------------------------
// Index page application visibility checks
// -----------------------------------------------------------------------

Then('User should see the {string} application on the index page', { timeout: 30000 }, async function (appName) {
	index = new IndexPage(global.page);
	await index.isApplicationVisible(appName);
});

// -----------------------------------------------------------------------
// Navigate to an application from the index page
// -----------------------------------------------------------------------

When('User clicks on the {string} application', { timeout: 60000 }, async function (appName) {
	index = new IndexPage(global.page);
	await index.openApplicationByName(appName);
	console.log(`✅ Clicked on "${appName}" application card`);
});

When('User opens application by href {string}', { timeout: 60000 }, async function (href) {
	index = new IndexPage(global.page);
	await index.openApplication(href);
	console.log(`✅ Opened application by href: "${href}"`);
});
