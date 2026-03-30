const { When, Then } = require('@cucumber/cucumber');
const { ConfigPage } = require('../../../../pages/apps/config.js');
const { expect } = require('@playwright/test');


let config;

// -----------------------------------------------------------------------
// Configuration page validation steps
// -----------------------------------------------------------------------

Then('User should be navigated to the Configuration page', { timeout: 60000 }, async function () {
	config = new ConfigPage(global.page);
	await config.validateConfigPage();
	console.log('✅ User is on the Configuration page:', global.page.url());
});

Then('User should see {string} section in Configuration', { timeout: 30000 }, async function (sectionName) {
	config = new ConfigPage(global.page);
	await global.page.pause()
	await config.isSectionVisible(sectionName);
});

When('User opens the {string} section in Configuration', { timeout: 60000 }, async function (sectionName) {
	config = new ConfigPage(global.page);
	await config.openSectionByName(sectionName);
	console.log(`✅ Opened section "${sectionName}" in Configuration`);
});

When('User opens the config section by href {string}', { timeout: 60000 }, async function (sectionHref) {
	config = new ConfigPage(global.page);
	await config.openSection(sectionHref);
});
