const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');

let login, index, GigaPower;
let bookmark_title = `Bookmark_title_` + Math.random();

Given('User should in the Network manager application', { timeout: 60000 }, async function () {
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

When('User searches for place {string} and selects the first result', { timeout: 20000 }, async function (placeName) {
	await GigaPower.searchAndSelectPlace(placeName);
	await global.page.waitForTimeout(1000);
});

When('User clicks on Add and Manage Bookmarks', { timeout: 15000 }, async function () {
	await GigaPower.btnAddAndMangeBookmark.click();
	await global.page.waitForTimeout(1000);
});

When('Input the name of the bookmark and Save', { timeout: 15000 }, async function () {
	await GigaPower.ipBookmarkTitle.fill(bookmark_title);
	await global.page.waitForTimeout(500);
	await GigaPower.bookmarkTabButtons('Save');
	await global.page.waitForTimeout(1000);
});

Then('A new bookmark must be added', { timeout: 20000 }, async function () {
	await GigaPower.btnAddAndMangeBookmark.click();
	await global.page.waitForTimeout(1000);
	await GigaPower.bookmarkTabButtons('Manage bookmarks');
	await global.page.waitForTimeout(1000);

	await global.page.waitForSelector('.bookmark-item', { timeout: 5000 });

	const bookmarkNames = await global.page.$$eval(
		'.bookmark-item .listBookmarkName',
		(elements) => elements.map((el) => el.textContent.trim())
	);

	console.log('Bookmark Names:', bookmarkNames);

	if (bookmarkNames.includes(bookmark_title)) {
		console.log(`${bookmark_title} exists in the bookmark list.`);
	} else {
		console.log(`${bookmark_title} does not exist in the bookmark list.`);
	}
});
