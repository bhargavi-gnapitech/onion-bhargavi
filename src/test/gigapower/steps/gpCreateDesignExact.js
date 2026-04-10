// New steps file for @gpCreateDesignExact scenario
// Creates a design boundary using exact lat/lon coordinates via the Go Coordinates dialog
// instead of random map clicks. Reuses page object methods from gpExactMeasurement
// but uses unique step text to avoid Cucumber ambiguous step errors
// Harish, 05-04-26

const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let GigaPower;
let login;
let index;

// Harish, 06-04-26: replaced loginAndOpenNetworkManager() with direct LoginPage and IndexPage calls
Given('User is in the Network Manager application for Create Design Exact', { timeout: 300000 }, async function () {
	GigaPower = new gigapower(global.page);
	await global.page.goto(PRE_UAT_URL);
	login = new LoginPage(global.page);
	await login.login(USERNAME, PASSWORD);
	await global.page.waitForLoadState('networkidle', { timeout: 120000 });
	index = new IndexPage(global.page);
	await index.openApplication('testapp.html');
	await global.page.waitForLoadState('networkidle', { timeout: 300000 });
	// Harish, 07-04-26: 5s was not enough for map tiles to render in this test —
	//                   other tests have more steps before drawing which gives tiles time to load,
	//                   this test goes straight to pencil click so we wait for canvas + extra render time
	await global.page.waitForSelector('#map_canvas', { state: 'visible', timeout: 60000 });
	await global.page.waitForTimeout(8000);
});

When('User clicks the pencil icon and selects Design mode', { timeout: 60000 }, async function () {
	await GigaPower.clickPencilAndSelectDesign(); // we already have functions use them 
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

// Harish, 07-04-26: searches for a place on the map after validation to visually confirm design location in recording
Then('User searches for place {string} on the map', { timeout: 60000 }, async function (place) {
	await GigaPower.searchAndZoomToLocation(place);
});

// Harish, 07-04-26: stored design name in this.designName so the Then step can access it for validation
When('User enters the design name {string} and saves', { timeout: 300000 }, async function (name) {
	this.designName = name;
	await GigaPower.enterDesignNameAndSave(name);
});

// Harish, 07-04-26: replaced keyboard.press('Escape') with validation that checks
//                   div.panel-title contains "Design:" confirming the design was saved and displayed
Then('New design is created with exact coordinates successfully', { timeout: 60000 }, async function () {
	await global.page.waitForSelector('text=New Design:', { state: 'hidden', timeout: 20000 });
	await global.page.waitForTimeout(1000);
	// Validate the design title panel is visible and shows a "Design: <number>" heading
	await global.page.waitForSelector('div.panel-title:has-text("Design:")', { state: 'visible', timeout: 15000 });


});
