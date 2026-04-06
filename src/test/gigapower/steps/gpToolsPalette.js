const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Tools Palette', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
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
