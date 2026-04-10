const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;
let printPage;
let login;
let index;

// Harish, 06-04-26: replaced loginAndOpenNetworkManager() with direct LoginPage and IndexPage calls
Given('User is in the Network Manager application for Print', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await global.page.goto(PRE_UAT_URL);
	login = new LoginPage(global.page);
	await login.login(USERNAME, PASSWORD);
	await global.page.waitForLoadState('networkidle', { timeout: 120000 });
	index = new IndexPage(global.page);
	await index.openApplication('testapp.html');
	await global.page.waitForLoadState('networkidle', { timeout: 300000 });
	await global.page.waitForTimeout(5000);
});

// Before: assigned printPage to a new tab and set global.page = printPage —
//         the recording stopped capturing after the tab switch because the
//         new tab had its own separate (unattached) video stream.
// After : clickPrintMap() now returns the same page navigated to the print URL,
//         so global.page reassignment is no longer needed and recording is continuous.
// Harish, 30-03-26
When('User clicks on Print', { timeout: 60000 }, async function () {
	printPage = await GigaPower.clickPrintMap();
});

When('A new window opens with the opened map region', { timeout: 60000 }, async function () {
	const url = printPage.url();
	expect(url).toContain('layout=print');
});

When('User selects the template format and enters the title and clicks on print', { timeout: 60000 }, async function () {
	await GigaPower.fillAndSubmitPrint(printPage);
});

Then('Selected map region should be printed', { timeout: 60000 }, async function () {
	const url = printPage.url();
	expect(url).toContain('layout=print');
});
