
const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { expect } = require('@playwright/test');
const { BASE_URL,PRE_UAT_URL , USERNAME,PASSWORD, IQGEO_USERNAME } = require('../../../../base_lib/credentials.js');
let login;
let regression;                                
  Given('the user is accessing the NMT app',{ timeout: 600000 }, async function () {
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
  });



  When('user clicks on the Equipment Palette',{ timeout: 600000 }, async function () {
    const equipmentPaletteIcon = page.locator('li#a-edit-mode').nth(1);
    await equipmentPaletteIcon.click();
    await global.page.waitForTimeout(5000);
  
  });



  Then('the options are displayed in the right-side panel',{ timeout: 6000 }, async function () {
    //Screenshot to check whether options displayed in right side or not
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });
  });