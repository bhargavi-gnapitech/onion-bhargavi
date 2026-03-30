const { expect } = require('@playwright/test');

class IndexPage {
	constructor(page) {
		this.page = page;
		this.lkLogout = page.locator('#logout-link');
		this.iqgeoLogo = page.locator('.iqgeo-logo, img[alt="IQGeo"], .logo');
		this.appCards = page.locator('a.box.app_options_box');
	}

	/**
	 * Logout of the app by clicking on the logout link
	 * 2024-08-01  Mohanish   Created
	 */
	async logout() {
		await this.lkLogout.click();
	}

	/**
	 * Validate that the user is on the correct Index / Landing page.
	 * Checks the URL ends with /index and that app cards are visible.
	 */
	async validateIndexPage() {
		await this.page.waitForLoadState('networkidle', { timeout: 60000 });
		const currentUrl = this.page.url();
		expect(currentUrl).toContain('/index');
		console.log('✅ Validated Index page URL:', currentUrl);

		// At least one app card should be visible
		await expect(this.appCards.first()).toBeVisible({ timeout: 15000 });
		console.log('✅ App cards are visible on the Index page');
	}

	/**
	 * Check if a specific application is visible on the index page by its display name.
	 * @param {string} appName - e.g. "Configuration", "Comms", "Standard"
	 */
	async isApplicationVisible(appName) {
		const card = this.page.locator(`a.box.app_options_box:has-text("${appName}")`);
		await expect(card).toBeVisible({ timeout: 10000 });
		console.log(`✅ Application "${appName}" is visible on the Index page`);
	}

	/**
	 * openApplication(appHref) -->
	 * appHref is usually an HREF element for the app
	 * example: appHref --> "standard.html", "mywcom.html", "config.html"
	 *
	 * 2024-08-01  Mohanish   Created
	 */
	async openApplication(appHref) {
		console.log('appHref: ', appHref);
		try {
			const appCard = this.page.locator(`a.box.app_options_box[href="${appHref}"]`);
			await expect(appCard).toBeVisible({ timeout: 15000 });
			await appCard.click();
			await this.page.waitForLoadState('networkidle', { timeout: 60000 });
		} catch (error) {
			console.error('Error clicking app option:', error);
			throw error;
		}
	}

	/**
	 * Open application card by its display name instead of href.
	 * @param {string} appName - visible text on the card, e.g. "Configuration"
	 */
	async openApplicationByName(appName) {
		const card = this.page.locator(`a.box.app_options_box:has-text("${appName}")`);
		await expect(card).toBeVisible({ timeout: 15000 });
		await card.click();
		await this.page.waitForLoadState('networkidle', { timeout: 60000 });
		console.log(`✅ Opened application: "${appName}"`);
	}
}

module.exports = { IndexPage };
