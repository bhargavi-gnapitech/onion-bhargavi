const { expect } = require('@playwright/test');
const { GnapiPage } = require('../base_lib/GnapiMapUtils');
const { attachScreenshot } = require('../src/support/hooks');

class LoginPage {
	constructor(page) {
		console.log('page:', typeof page);
		this.page = page; //fixme: move this to superclass
		this.ipUsername = page.locator('#login-user');
		this.ipPassword = page.locator('#login-pass');
		this.btnSubmit = page.locator('#login-submission');
		this.btnLogout = page.locator('//a[contains(@class, "ant-typography") and text()="Logout"]');

	}
	async gotoLoginPage() {
		await this.page.goto('https://uat.neon.iqgeo.cloud');
	}

	/**
	 * Login Function
	 *
	 * * 2024-08-01  Mohanish   Created
	 * */
	async login(pUserName, pPassword) {
		try {
			await this.ipUsername.fill(pUserName);
			await this.ipPassword.fill(pPassword);
			await this.btnSubmit.click();
			// // Wait for and assert that the unique element is visible after login
			// await expect(
			// 	this.page.locator(`body[data-myw-user="${pUserName}"]`)
			// );

			//fixme: Check for logout link
		} catch (error) {
			console.error('Login Function: ', error);
		}
		// await attachScreenshot(global.page, this.attach);
	}
	async logout() {
		await this.btnLogout.click();
	}
}

   module.exports = { LoginPage };