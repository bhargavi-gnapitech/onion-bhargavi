const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Measurement', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
});

When('User clicks on the Measurement tool', { timeout: 60000 }, async function () {
	await GigaPower.clickMeasurementTool();
});

When('User clicks on the map starting from one feature to another', { timeout: 60000 }, async function () {
	await GigaPower.drawMeasurement();
});

Then('User should be able to view length and area in selected units', { timeout: 60000 }, async function () {
	await GigaPower.isMeasurementResultVisible();
});
