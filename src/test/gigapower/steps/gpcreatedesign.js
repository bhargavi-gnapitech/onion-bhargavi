const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { CommsApp } = require('../../../../pages/apps/mywcom.js');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login.js');
const { StandardApp } = require('../../../../pages/apps/standard.js');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { Regression } = require('../../../../pages/apps/regression.js');

const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { BASE_URL } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');
const { arg } = require('../../../../base_lib/Input.js');

let login;
let GigaPower;
let regression;
let Standard
Given(
	'User is in Network manager application',
	{ timeout: 60000000 },
	async function () {

		
		await global.page.goto("https://dev2.neon.iqgeo.cloud/pre_uat_72");
		login = new LoginPage(global.page);
		await login.login("admin", "iqgeo");

		index = new IndexPage(global.page);
          
		await index.openApplication(('att_network_manager.html'),{timeout:400000});
		regression = new Regression(global.page); 
		await regression.handleDialogClose();
		
		GigaPower = new gigapower(global.page);
		
		Standard = new StandardApp(global.page);

		await GigaPower.btnAddObject.click();

		await global.page.locator(`#${arg.objectId}`).click();

		//await GigaPower.drawPolygon(arg.design_coordinates);

		await GigaPower.fillForm(arg.designDetails);
		
		 // Click the calendar icon
        await global.page.locator('.ui-datepicker-trigger').click();

        // Select today's date (highlighted with class like 'ui-state-highlight')
        await global.page.locator('.ui-datepicker-today a').click();
		// Click the 3rd dropdown with class 'ui-select'
await global.page.locator("(//div[contains(@class, 'ui-select')])[3]").click();

// Select "HLD" from the dropdown
await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='HLD']").click();
  await global.page.waitForTimeout(5000);
		await global.page.waitForLoadState('networkidle', { timeout: 120000 });
	}
);

When(
	'User single clicks at 3 points on the map and double clicks at the last point',
	{ timeout: 8000000 },
	async function () {
		await GigaPower.drawPolygon(arg.design_coordinates);
		await page.waitForLoadState('networkidle', { timeout: 120000 });
		await global.page.locator('//button[text()="Save"]').click();
		console.log('----------------in insert pole block 2 created design');

		await global.page.waitForSelector(
			'//div[contains(@class, "feature-title")]',
			{ timeout: 15000 }
		);
		await global.page.waitForLoadState('networkidle', { timeout: 120000 });
		await GigaPower.openDesign();
		await global.page.waitForLoadState('networkidle', { timeout: 120000 });
		

	}
);

When(
	'User inputs the fields and clicks on Create',
	{ timeout: 60000 },
	async function () {
		console.log("design created with specific co-ordinates");

	}
);

Then(
	'New design is created', 
	{ timeout: 60000 },
	 async function () {
		
	console.log(' new design got created ');

	

	

});
