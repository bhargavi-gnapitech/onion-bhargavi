// New steps file for @gpCreateDesignExact scenario
// Creates a design boundary using exact lat/lon coordinates via the Go Coordinates dialog
// instead of random map clicks. Reuses page object methods from gpExactMeasurement
// but uses unique step text to avoid Cucumber ambiguous step errors
// Harish, 05-04-26

const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

let GigaPower;

Given('User is in the Network Manager application for Create Design Exact', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await GigaPower.loginAndOpenNetworkManager();
});

When('User clicks the pencil icon and selects Design mode', { timeout: 60000 }, async function () {
	await GigaPower.clickPencilAndSelectDesign();
});

When('User clicks on the map to start the design boundary', { timeout: 60000 }, async function () {
	await GigaPower.clickOnMapToStartMeasurement();
});

When('User right-clicks on the map to add a design boundary point', { timeout: 60000 }, async function () {
	await GigaPower.rightClickOnMap();
});

When('User clicks on Go Coordinates to set a design point', { timeout: 60000 }, async function () {
	await GigaPower.clickGoCoordinatesMenuItem();
});

// Before: addCoordinate() was used for the first point but the random map click
//         had already filled row 1, causing it to create a 2nd row → 5 points total
// After : overwriteFirstCoordinate() clears row 1 and replaces it with the exact
//         coordinate → stays at 4 points
// Harish, 05-04-26
When('User overwrites the first design point with coordinate {string} {string}', { timeout: 60000 }, async function (lat, lon) {
	await GigaPower.overwriteFirstCoordinate(lat, lon);
});

When('User enters design point coordinate {string} {string}', { timeout: 60000 }, async function (lat, lon) {
	await GigaPower.addCoordinate(lat, lon);
});

When('User closes the design coordinates dialog', { timeout: 60000 }, async function () {
	await GigaPower.closeCoordinatesDialog();
});

When('User enters the design name {string} and saves', { timeout: 300000 }, async function (name) {
	await GigaPower.enterDesignNameAndSave(name);
});

Then('New design is created with exact coordinates successfully', { timeout: 60000 }, async function () {
	await global.page.waitForSelector('text=New Design:', { state: 'hidden', timeout: 20000 });
	console.log('✅ New Design form closed — design saved successfully');
	await global.page.keyboard.press('Escape');
	await global.page.waitForTimeout(1000);
});
