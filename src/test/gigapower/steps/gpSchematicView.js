const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Schematic View', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
});

// 'User selects a feature on the map' step is already defined in gpNetworkTrace.js
// Cucumber will reuse it across both scenarios automatically

When('User clicks on Schematic view', { timeout: 60000 }, async function () {
	await GigaPower.clickSchematicView();
});

Then('User should be able to view the schematic design of selected feature', { timeout: 60000 }, async function () {
	await GigaPower.isSchematicViewVisible();
});
