const { expect } = require('@playwright/test');
const { StandardApp } = require('./standard');

// import { drawPolygonOnCanvas } from '../pages/standard/create_design';
class CommsApp extends StandardApp {
	/**
	 *
	 * @param {import('@playwright/test').page} page
	 */
	constructor(page) {
		super(page);
	}

	/**
	 *
	 * @param {*} args  We can pass key value pairs as args
	 * example: we can pass objectId , coordinates of design,...etc
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-06
	 */
	async CreateDesign(args) {
		await this.btnAddObject.click();
		await this.page.locator(`#${args.objectId}`).click();
		await this.addObject(args.objectId);
		await this.drawPolygon(args.coordinates);
		await this.selectDetailsTab(args.pTabName); // make sure your on details tab

		await this.designDetails(args.designName);
		await this.btnSaveDesign.click();
		const designNameElement = await this.page.waitForSelector(
			'.feature-title.panel-title'
		);
		const designName = await designNameElement.innerText();
		console.log('🚀👊 ~ file: mywcom.js:34 ~ designName:', designName);
		expect(designName).toBe('Design: ' + args.designName);
	}
	
	async CreateBookmark ()  {
		await this.page.locator ("#a-bookmarks").click();
		await this.page.locator (`//*[@id="create-bookmark"]/div/table/tr[1]/td/input`)
		.fill("test_name");
		await this.page.locator(".primary-btn.ui-button.ui-corner-all.ui-widget:nth-of-type(3)")
		.click();
        await this.page.locator ("#a-bookmarks").click();
     

}

}
module.exports = { CommsApp };