const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');

let login, index, GigaPower;

// Harish, 08-04-26
Given('User is in the Network Manager application for Home Page Bookmark', { timeout: 60000 }, async function () {
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
When('User clicks on the Home page bookmark icon', { timeout: 15000 }, async function () {
    await GigaPower.homeBtn.click();
});
Then('User should be able to see the Home page bookmark icon and navigate to the home page bookmark location', { timeout: 15000 }, async function () {
    
    await global.page.waitForTimeout(5000);   
});