const { Given, When, Then, And, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { BASE_URL } = require('../../../../base_lib/constants');

let login, GigaPower;

Given('User is logged into Giga Power', { timeout: 600000 }, async function () {
	// await global.page.goto('https://dev2.neon.iqgeo.cloud/pre-uat/login');
	login =  new LoginPage(global.page);
	await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
	await page.waitForLoadState('networkidle', { timeout: 60000 });

	GigaPower = new gigapower(global.page);
	await GigaPower.handleNotificationDialog(global.page);
});

When(
	'User clicks on map icon at the bottom of the UI',
	{ timeout: 120000 },
	async function () {
		
	await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();
	}
);

Then(
	'Network manager application should be launched',
	{ timeout: 120000 },
	async function () {
		const screenshot = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });
		const detailsPanel = page.locator(`.tabControl_nav.noselect`); // Adjust selector as needed
		await global.page.waitForLoadState('networkidle', { timeout: 60000 });
		await expect(detailsPanel).toBeVisible(); // Ensure the detailsPanel is visible

	}
);
