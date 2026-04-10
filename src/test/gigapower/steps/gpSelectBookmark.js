const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');

let login, index, GigaPower;

// Harish, 08-04-26
Given('User is in the Network Manager application for Select Bookmark', { timeout: 60000 }, async function () {
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

When('User clicks on the star and opens Manage Bookmarks', { timeout: 15000 }, async function () {
	await GigaPower.btnAddAndMangeBookmark.click();
	await global.page.waitForTimeout(1000);
	await GigaPower.bookmarkTabButtons('Manage bookmarks');
	await global.page.waitForTimeout(1000);
});

When('User selects bookmark {string} and clicks zoom', { timeout: 15000 }, async function (bookmarkName) {
	await GigaPower.selectBookmarkByName(bookmarkName);
	await GigaPower.clickBookmarkZoom(bookmarkName);
});

Then('The map should navigate to the bookmarked location and dialog is closed', { timeout: 15000 }, async function () {
	await global.page.waitForTimeout(3000);
	await GigaPower.closeManageBookmarks();
});
