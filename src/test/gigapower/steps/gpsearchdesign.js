const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');

let login, GigaPower;

Given('User should be in the Network manager application', { timeout: 600000 }, async function () {
   
  
    login =  new LoginPage(global.page);
  
    await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);

    await page.waitForLoadState('networkidle', { timeout: 120000 });
  
    const GigaPower =  new gigapower(global.page);

	await GigaPower.handleNotificationDialog(global.page);

	await page.waitForLoadState('networkidle', { timeout: 120000 });
		//await GigaPower.bottomNavTab('Map');
		await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();
     
    
    });



When(
	'User inputs the design name in the search field',
	{ timeout: 60000 },
	async function () {

		await global.page.locator('#text-search').click();
		await global.page.locator('#text-search').fill('CLD');
	}
);

When(
	'Clicks on the design to be opened',
	{ timeout: 60000 },
	async function () {
		await global.page.waitForLoadState('networkidle', { timeout: 60000 });

		await global.page.locator(`[title=" Design:  CLD"]`).click();

		
		await page.waitForLoadState('networkidle', { timeout: 60000 });
	}
);

Then(
	'Design is selected and highlighted on map',
	{ timeout: 80000 },
	async function () {
		await page.locator('//*[@id="delta-owner-tools"]/li[1]').click();

		await page.waitForLoadState('networkidle', { timeout: 90000 });

		const designtitle = page.locator(`.feature-title.panel-title`);

		await global.page.waitForLoadState('networkidle', { timeout: 60000 });

		//Assertion after searching design ,design should be highlighted

		await expect(designtitle).toContainText(' Design:  CLD');

	}
);
