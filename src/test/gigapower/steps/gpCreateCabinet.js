const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { CommsApp } = require('../../../../pages/apps/mywcom.js');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login.js');
const { StandardApp } = require('../../../../pages/apps/standard.js');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
const { BASE_URL } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');
const { arg } = require('../../../../base_lib/Input.js');
const { performCanvasOperationAndSelectDate } = require('../../../../pages/apps/utils');

let login;
let GigaPower;

  Given('User logged in the Network manager application', 	{ timeout: 600000 }, async function () {

   const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);

		index = new IndexPage(global.page);
          
		await index.openApplication(('att_network_manager.html'),{timeout:400000});

		GigaPower = new gigapower(global.page);
		regression = new Regression(global.page); 
    await regression.handleDialogClose();
		await global.page.waitForLoadState('networkidle', { timeout: 80000 });
    await global.page.check('input[type="checkbox"][id="deltas"][overlay_name="deltas"]');
    await global.page.waitForLoadState('networkidle', { timeout: 6000 });
    await GigaPower.searchAndSelectDesign('test_design_1');
    //await global.page.locator(`//li[@title='Open' and contains(@style, 'open.svg')]`).click();
    
    



		
   
  });



  When('Click on Add object, select cabinet and place it in existing design', { timeout: 600000 },async function () {

    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    await global.page.waitForTimeout(5000);
    await GigaPower.btnAddObject.click();

    await global.page.locator(`#${arg.object}`).click();

    await global.page.waitForTimeout(500);
    
    
    
  });



  When('Input details and click on create',{ timeout: 60000 }, async function () {
    
    await performCanvasOperationAndSelectDate(global.page, 0.3, 0.4);
  });



  Then('New cabinet\\(C1) should be created',{ timeout: 60000 }, async function () {
       
     await GigaPower.fillForm(arg.designDetails);
     await page.waitForLoadState('networkidle', { timeout: 6000 });
     await global.page.locator("(//div[contains(@class, 'ant-select-selector')])[1]").click();  // [2] = 2nd element
     await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='85C']").click();

     await page.waitForLoadState('networkidle', { timeout: 6000 });
     // Click the calendar icon
     await global.page.locator('.ui-datepicker-trigger').click();

     // Select today's date (highlighted with class like 'ui-state-highlight')
     await global.page.locator('.ui-datepicker-today a').click();

    
   

   
     await page.waitForLoadState('networkidle', { timeout: 6000 });
   
     await regression.clickButtonSave();
      await global.page.waitForTimeout(5000);

      // Assert the current URL matches the expected URL
      const expectedUrl = 'https://dev2.neon.iqgeo.cloud/pre_uat_72/att_network_manager.html';
      await expect(global.page).toHaveURL(expectedUrl, { timeout: 5000 }); 

      // Log for debugging 
      console.log(`Current URL is: ${await global.page.url()}`);
    
    
  });