const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;
let login;
let index;

//Harish 09-04-26
Given('User is in the Network Manager application for Layers', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await global.page.goto(PRE_UAT_URL);
	login = new LoginPage(global.page);
	await login.login(USERNAME, PASSWORD);
	await global.page.waitForLoadState('networkidle', { timeout: 120000 });
	index = new IndexPage(global.page);
	await index.openApplication('testapp.html');
	await global.page.waitForLoadState('networkidle', { timeout: 300000 });
	await global.page.waitForTimeout(5000);
});

When('User clicks on the Layers tab', { timeout: 60000 }, async function () {
	await GigaPower.clickLayersTab();
});

When('User scrolls to find the layer {string}', { timeout: 60000 }, async function (layerName) {
	await GigaPower.scrollToLayer(layerName);
});

When('User unchecks the layer {string}', { timeout: 60000 }, async function (layerName) {
	await GigaPower.uncheckLayer(layerName);
});

Then('The layer {string} should be unchecked', { timeout: 60000 }, async function (layerName) {
	await GigaPower.isLayerUnchecked(layerName);
});

When('User checks the layer {string} again', { timeout: 60000 }, async function (layerName) {
	await GigaPower.recheckLayer(layerName);
});

Then('The layer {string} should be checked', { timeout: 60000 }, async function (layerName) {
	await GigaPower.isLayerChecked(layerName);
});
