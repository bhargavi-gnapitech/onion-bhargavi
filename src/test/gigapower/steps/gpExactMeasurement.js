const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Exact Measurement', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
});

When('User searches for {string} to navigate the map', { timeout: 60000 }, async function (location) {
	console.log(`🔍 Searching for: ${location}`);
	await GigaPower.searchAndZoomToLocation(location);
});

When('User clicks on the Measurement tool for exact measurement', { timeout: 60000 }, async function () {
	await GigaPower.clickMeasurementTool();
});

When('User searches for {string} as the second location', { timeout: 60000 }, async function (location) {
	console.log(`🔍 Searching second location: ${location}`);
	await GigaPower.searchAndZoomToLocation(location);
});

When('User draws measurement on the current map view', { timeout: 60000 }, async function () {
	await GigaPower.drawMeasurement();
});

Then('User should see the exact distance logged in selected units', { timeout: 60000 }, async function () {
	await GigaPower.isMeasurementResultVisible();
});
