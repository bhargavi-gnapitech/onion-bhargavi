const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const {
	IQGEO_USERNAME,
	IQGEO_PASSWORD,
} = require('../../../../base_lib/constants');

let login, GigaPower;

Given(
	'User in the Network manager application',
	{ timeout: 600000 },
	async function () {
		login = new LoginPage(global.page);

		await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);

		GigaPower = new gigapower(global.page);

		await GigaPower.handleNotificationDialog(global.page);

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });
		await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();
		//await GigaPower.bottomNavTab('Map');

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });
	}
);

When(
	'Select a design and click on Open',
	{ timeout: 200000 },
	async function () {
		//await GigaPower.bottomNavTab('Map');
		await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });

		await global.page.locator('#text-search').click();

		await global.page.locator('#text-search').fill('CLD');

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });

		await global.page.locator(`[title=" Design:  CLD"]`).click();

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });

		const openButton = await global.page.locator(
			`#delta-owner-tools > li[title="Open"]`
		);
		await openButton.click();

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });
	}
);

Then(
	'Design toolbar should open on the map',
	{ timeout: 70000 },
	async function () {
		// Validate that the design toolbar is visible on the map
		const toolbar = page.locator(`#delta-owner-map-watermark`); // Adjust selector as needed
		await global.page.waitForLoadState('networkidle', { timeout: 60000 });
		await expect(toolbar).toBeVisible(); // Ensure the toolbar is visible
	}
);
