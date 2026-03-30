const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Show Current Location', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
});

When('User clicks on Show Current Location', { timeout: 60000 }, async function () {
	await GigaPower.clickShowCurrentLocation();
});

Then('User should be navigated to the current location on map', { timeout: 60000 }, async function () {
	await GigaPower.isMapVisible();
});
