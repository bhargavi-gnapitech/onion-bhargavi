const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;
let login;
let index;

// Harish, 06-04-26: replaced loginAndOpenNetworkManager() with direct LoginPage and IndexPage calls
Given('User is in the Network Manager application for Exact Measurement', { timeout: 300000 }, async function () {
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

When('User clicks on the Measurement tool for exact measurement', { timeout: 60000 }, async function () {
	await GigaPower.clickMeasurementTool();
});

When('User clicks on the map to start measurement', { timeout: 60000 }, async function () {
	await GigaPower.clickOnMapToStartMeasurement();
});

When('User right-clicks on the map to open the context menu', { timeout: 60000 }, async function () {
	await GigaPower.rightClickOnMap();
});

When('User clicks on Go Coordinates from the context menu', { timeout: 60000 }, async function () {
	await GigaPower.clickGoCoordinatesMenuItem();
});

// Before: two separate steps called addFirstCoordinate() and addSecondCoordinate()
// After : both steps now call the single combined addCoordinate() which handles
//         any number of coordinates automatically
// Harish, 05-04-26
When('User enters the first coordinate {string} {string}', { timeout: 60000 }, async function (lat, lon) {
	await GigaPower.addCoordinate(lat, lon);
});

When('User closes the Coordinates dialog', { timeout: 60000 }, async function () {
	await GigaPower.closeCoordinatesDialog();
});

When('User enters the second coordinate {string} {string}', { timeout: 60000 }, async function (lat, lon) {
	await GigaPower.addCoordinate(lat, lon);
});

// Added to change the length unit dropdown in the Measurement Tool dialog
// Harish, 05-04-26
When('User changes the length unit to {string}', { timeout: 60000 }, async function (unit) {
	await GigaPower.selectLengthUnit(unit);
});

Then('User should see the exact distance logged in selected units', { timeout: 60000 }, async function () {
	await GigaPower.isMeasurementResultVisible();
});
