const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');

let login, index, sharableLink;

let GigaPower;

// Harish, 08-04-26
Given('User is in the Network Manager application for Share Map', { timeout: 60000 }, async function () {
	GigaPower = new gigapower(global.page);

	await global.page.goto(PRE_UAT_URL);

	login = new LoginPage(global.page);
	await login.login(USERNAME, PASSWORD);
	await global.page.waitForLoadState('networkidle', { timeout: 10000 });

	index = new IndexPage(global.page);
	await index.openApplication('testapp.html');
	await global.page.waitForLoadState('networkidle', { timeout: 15000 });

	await GigaPower.handleNotificationDialog(global.page);
});
When('User clicks on the Share Map icon', { timeout: 15000 }, async function () {
	await GigaPower.clickShareMap();
});

Then('User copies the shareable link', { timeout: 15000 }, async function () {
	sharableLink = await GigaPower.getShareableLink();
	await GigaPower.clickCopyLink();
});

Then('User should be able to open the shared map link in a new tab and see the same map view', { timeout: 30000 }, async function () {
	await GigaPower.openShareableLinkInNewTab(sharableLink);
});
