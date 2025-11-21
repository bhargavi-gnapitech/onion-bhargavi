const { Given, Then, When } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { attachScreenshot } = require('../../../support/hooks');

Given(`User Opens the ""IQGeo URL""`, { timeout: 600000 }, async function () {
	if (!global.page) {
		throw new Error('Page object is not initialized');
	}
	await global.page.goto('http://localhost:8083/iqgeo');

	// // Capture a screenshot after login
	// const screenshot = await global.page.screenshot();

	// // Attach the screenshot to the Cucumber report
	// await this.attach(screenshot, 'image/png');

	await attachScreenshot(global.page, this.attach);
});

When(
	`User inputs {string} and {string}, Click on Login`,
	{ timeout: 600000 },
	async function (username, password) {
		const LOGIN_PAGE = new LoginPage(page);
		LOGIN_PAGE.login(username, password);
		await attachScreenshot(global.page, this.attach);
	}
);
