const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');

const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants');

let login, GigaPower;


Given(
	'User is in the Network manager application',
	{ timeout: 600000 },
	async function () {
		login = new LoginPage(global.page);
		await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
		await page.waitForLoadState('networkidle', { timeout: 60000 });

		GigaPower = new gigapower(global.page);
		await GigaPower.handleNotificationDialog(global.page);

		await GigaPower.bottomNavTab('Map');



		await global.page.locator('#text-search').click();
		await global.page.locator('#text-search').fill('CLD');

		await global.page.locator(`[title=" Design:  CLD"]`).click();

		await page.waitForLoadState('networkidle', { timeout: 60000 });
	}
);


When('User clicks on the Close button', { timeout: 60000 }, async function () {
	const closeButton = page.locator(`#delta-owner-tools > li[title="Close"]`);
	await closeButton.click();
});

Then('The design should be closed', { timeout: 60000 }, async function () {
	const designElement = page.locator(`#delta-owner-tools > li[title="Open"]`);
	await expect(designElement).toBeEnabled();
});
