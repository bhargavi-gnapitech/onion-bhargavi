const { expect } = require('@playwright/test');

class ConfigPage {
	/**
	 * Page object for the IQGeo Configuration page (localhost:8085/config.html#/)
	 *
	 * DOM structure (from live inspection):
	 *   <div id="menuView">
	 *     <div class="link-box">
	 *       <a class="link" href="#/applications">
	 *         <span class="title">Applications</span>
	 *       </a>
	 *     </div>
	 *     ...
	 *   </div>
	 */
	constructor(page) {
		this.page = page;
		this.menuView    = page.locator('div#menuView');
		this.sectionCards = page.locator('a.link');
	}

	// ─── Page validation ────────────────────────────────────────────────────────

	/**
	 * Validate the user is on the Configuration page.
	 * Checks URL contains 'config' and the section menu is rendered.
	 */
	async validateConfigPage() {
		await this.page.waitForLoadState('networkidle', { timeout: 60000 });
		const currentUrl = this.page.url();
		expect(currentUrl).toContain('config');
		console.log('✅ Validated Configuration page URL:', currentUrl);

		// Wait for the SPA section menu to render (renders after networkidle)
		await expect(this.sectionCards.first()).toBeVisible({ timeout: 15000 });
		console.log('✅ Configuration section cards are visible');
	}

	// ─── Section interactions ───────────────────────────────────────────────────

	/**
	 * openSection(sectionHref) — mirrors openApplication() in index.js
	 * Pass the href directly.
	 * example: sectionHref → "#/applications", "#/roles", "#/users"
	 */
	async openSection(sectionHref) {
		console.log('sectionHref: ', sectionHref);
		try {
			const section = this.page.locator(`a.link[href="${sectionHref}"]`);
			await expect(section).toBeVisible({ timeout: 15000 });
			await section.click();
			await this.page.waitForLoadState('networkidle', { timeout: 30000 });
			console.log(`✅ Opened section: "${sectionHref}"`);
		} catch (error) {
			console.error('Error clicking config section:', error);
			throw error;
		}
	}

	/**
	 * openSectionByName(sectionName) — mirrors openApplicationByName() in index.js
	 * Pass the display name shown on the card.
	 * example: sectionName → "Applications", "Roles", "Users"
	 */
	async openSectionByName(sectionName) {
		const section = this.page.locator(`a.link:has-text("${sectionName}")`);
		await expect(section).toBeVisible({ timeout: 15000 });
		await section.click();
		await this.page.waitForLoadState('networkidle', { timeout: 30000 });
		console.log(`✅ Opened section: "${sectionName}"`);
	}

	/**
	 * isSectionVisible(sectionName) — mirrors isApplicationVisible() in index.js
	 * Pass the display name shown on the card.
	 * example: sectionName → "Applications", "Roles", "Settings"
	 */
	async isSectionVisible(sectionName) {
		const section = this.page.locator(`a.link:has-text("${sectionName}")`);
		await expect(section).toBeVisible({ timeout: 10000 });
		console.log(`✅ Section "${sectionName}" is visible on the Configuration page`);
	}
}

module.exports = { ConfigPage };
