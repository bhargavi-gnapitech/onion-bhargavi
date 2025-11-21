const { Given, When, Then, And, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');

let login;

Given('User is logged in', { timeout: 70000 }, async function () {
	login =  new LoginPage(global.page);
});

When('User clicks on the logout button', { timeout: 70000 }, async function () {
	await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
});

Then(
	'User should be logged out of the application',
	{ timeout: 90000 },
	async function () {
		const GigaPower = new gigapower(global.page);
		GigaPower.handleNotificationDialog(global.page);

		await global.page.waitForLoadState('networkidle', { timeout: 120000 });
		await login.logout();
		await global.page.waitForTimeout(12000);

		await expect(global.page).toHaveURL('https://uat.neon.iqgeo.cloud/login');
		await expect(global.page).toHaveURL(`${BASE_URL}/login`);
	}
);
