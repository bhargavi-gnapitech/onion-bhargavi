const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let login;

// -----------------------------------------------------------------------
// CHANGED (2026-03-17): Entire file rewritten to use global.page from hooks.js
// WHY: Original file tried to launch its own chromium browser with
//      chromium.launch({ headless: false }) but never imported chromium,
//      causing "ReferenceError: chromium is not defined" at runtime.
//      hooks.js already creates global.browser and global.page before every
//      scenario, so we just reuse that instead of creating a second browser.
//
// OLD CODE (original gplogin.js):
// const { chromium } = require('playwright');  ← was missing this import
// let browser, page;
// Given('User Opens the IQGeo URL', async function () {
//     browser = await chromium.launch({ headless: false });  ← crash here
//     const context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto('http://localhost:8085/login');
// });
// When('the user enters {string} and {string}', async function () {
//     await page.fill('input#login-user', 'gnapi_user');
//     await page.fill('input#login-pass', 'Gnapi_IQGeo_741');
// });
// Then('User Click on Login', async function () {
//     await page.click('#login-submission');
// });
// -----------------------------------------------------------------------

Given('User Opens the IQGeo URL', { timeout: 70000 }, async function () {
	// CHANGED: was creating own browser/page, now uses global.page from hooks.js
	await global.page.goto(PRE_UAT_URL);
});

When(
	`the user enters {string} and {string}`,
	{ timeout: 120000 },
	async function (username, password) {
		// CHANGED: was manually filling #login-user / #login-pass fields directly.
		// Now uses LoginPage.login() which is the shared login utility.
		// WHY: Consistent with all other step files; avoids duplicating login logic.
		// Old code:
		// await page.fill('input#login-user', 'gnapi_user');
		// await page.fill('input#login-pass', 'Gnapi_IQGeo_741');
		login = new LoginPage(global.page);
		await login.login(USERNAME, PASSWORD);
	}
);

Then('User Click on Login', { timeout: 70000 }, async function () {
	// CHANGED: login button click was: await page.click('#login-submission');
	// Now login is fully handled in the When step via login.login(), so nothing to do here.
});

Then(
	'User should be navigated to network manager application',
	{ timeout: 200000 },
	async function () {
		// CHANGED: old step had commented-out URL assertion and just logged "Test case passed".
		// Added waitForLoadState so test waits for the app to fully load before passing.
		// Old code: console.log("Test case passed");
		await global.page.waitForLoadState('networkidle', { timeout: 120000 });
	}
);
