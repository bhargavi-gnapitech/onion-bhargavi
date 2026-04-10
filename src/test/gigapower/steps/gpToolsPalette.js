const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;
let login;
let index;

// Harish, 06-04-26: replaced loginAndOpenNetworkManager() with direct LoginPage and IndexPage calls
Given('User is in the Network Manager application for Tools Palette', { timeout: 300000 }, async function () {
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

When('User clicks on Tools Palette', { timeout: 60000 }, async function () {
	await GigaPower.clickToolsPalette();
});

Then('User should be able to view the added tools to the application in a side panel', { timeout: 60000 }, async function () {
	await GigaPower.isToolsPanelVisible();
});

// SL 3B - Verifies each important tool is accessible inside the Tools Palette
Then('User verifies {string} tool is accessible', { timeout: 60000 }, async function (toolName) {
	await GigaPower.verifyToolsPaletteOption(toolName);
});
