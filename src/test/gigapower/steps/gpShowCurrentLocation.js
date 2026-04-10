const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

// Harish, 06-04-26: added missing let GigaPower declaration — was present in all other step files but not here
let GigaPower;
let login;
let index;

// Harish, 06-04-26: replaced loginAndOpenNetworkManager() with direct LoginPage and IndexPage calls
Given('User is in the Network Manager application for Show Current Location', { timeout: 300000 }, async function () {
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

When('User clicks on Show Current Location', { timeout: 60000 }, async function () {
	await GigaPower.clickShowCurrentLocation();
});

Then('User should be navigated to the current location on map', { timeout: 60000 }, async function () {
	await GigaPower.isMapVisible();
});
