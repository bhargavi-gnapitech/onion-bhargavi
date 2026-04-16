const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;

async function openNetworkManagerApplication() {
	GigaPower = new gigapower(global.page);

	await global.page.goto(PRE_UAT_URL);
	const login = new LoginPage(global.page);
	await login.login(USERNAME, PASSWORD);
	await global.page.waitForLoadState('networkidle', { timeout: 120000 });

	const index = new IndexPage(global.page);
	await index.openApplication('testapp.html');
	await global.page.waitForLoadState('networkidle', { timeout: 300000 });
	await GigaPower.handleNotificationDialog(global.page);
}

Given('User is in the Network Manager application for Design Filter {word}', { timeout: 300000 }, async function (optionName) {
	await openNetworkManagerApplication();
});

When('User searches for design {string} in the map search', { timeout: 90000 }, async function (designName) {
	await GigaPower.searchDesignInMapSearch('design');
});

When('User selects the searched design result', { timeout: 90000 }, async function () {
	await GigaPower.hoverDesignSuggestionRow();
	await global.page.waitForTimeout(500);
});

Then('User clicks on {string} in the search category list', { timeout: 90000 }, async function (categoryName) {
	await GigaPower.clickSearchCategoryOption(categoryName);
});

When('User selects design {string} from results list', { timeout: 90000 }, async function (designLabel) {
	await GigaPower.selectDesignFromResultsList(designLabel);
});

Then('User clicks on the folder icon in design toolbar', { timeout: 90000 }, async function () {
	await GigaPower.clickDesignToolbarOpenIcon();
});

Then('User clicks on the listed bullet icon', { timeout: 90000 }, async function () {
	await GigaPower.clickDesignToolbarListBulletIcon();
});

Then('User clicks on {word} option', { timeout: 90000 }, async function (optionName) {
	await GigaPower.clickDesignToolbarSubMenuOption(optionName);
	await global.page.waitForTimeout(5000);
});