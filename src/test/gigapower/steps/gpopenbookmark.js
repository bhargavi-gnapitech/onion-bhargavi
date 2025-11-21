const { Given, When, Then, AND, After } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const {
	IQGEO_USERNAME,
	IQGEO_PASSWORD,
} = require('../../../../base_lib/constants');

let login, GigaPower;

Given(
	'User was in the Network manager application',
	{ timeout: 600000 },
	async function () {
		login = new LoginPage(global.page);
		await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
		GigaPower = new gigapower(global.page);

		await GigaPower.handleNotificationDialog(global.page);
	}
);

When('User clicks on Manage bookmarks', { timeout: 120000 }, async function () {
	//await GigaPower.bottomNavTab('Map');
	await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();
	await GigaPower.btnAddAndMangeBookmark.click();
	await GigaPower.bookmarkTabButtons('Manage bookmarks');
});

When(
	'select the feature to be opened and click on Go to button',
	{ timeout: 120000 },
	async function () {
	
		GigaPower.openExistingBookmark('test');
		await page.waitForLoadState('networkidle', { timeout: 60000 });
	}
);

Then('The selected bookmark is opened', { timeout: 120000 }, async function () {
	await GigaPower.btnCloseMangeBookmark.click();
	console.log(' Selected Bookmark should be opened ,close the tab ');
});
