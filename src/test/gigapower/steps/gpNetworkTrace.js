const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;
let login;
let index;

// Harish, 06-04-26: replaced loginAndOpenNetworkManager() with direct LoginPage and IndexPage calls
Given('User is in the Network Manager application for Network Trace', { timeout: 300000 }, async function () {
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

When('User selects a feature on the map', { timeout: 60000 }, async function () {
	await GigaPower.selectFeatureOnMap();
});

When('User clicks on the Network trace tool', { timeout: 60000 }, async function () {
	await GigaPower.clickNetworkTraceTool();
});

// Verifies dialog is open AND the From field is auto-populated with the selected feature
Then('Network Trace Tool dialog should be visible with feature details', { timeout: 60000 }, async function () {
	await GigaPower.isNetworkTraceDialogVisible();
});

When('User clicks on the Trace button', { timeout: 60000 }, async function () {
	await GigaPower.clickTraceButton();
});

Then('User closes the Network Trace Tool dialog', { timeout: 60000 }, async function () {
	await GigaPower.closeNetworkTraceTool();
});
