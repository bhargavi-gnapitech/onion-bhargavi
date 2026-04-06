const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Network Trace', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
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
