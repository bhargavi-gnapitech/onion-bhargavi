const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { arg1} = require('../../../../base_lib/data.js');
const { expect } = require('@playwright/test');
const { PRE_UAT_URL , IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
let login;
let regression;
  Given('user is using the NMT app',{ timeout: 600000 }, async function () {
        const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
        await global.page.goto(BASE_URL);
        login =  new LoginPage(global.page);
        await login.login(IQGEO_USERNAME, PASSWORD);
        index = new IndexPage(global.page);
        await index.openApplication(('att_network_manager.html'),{timeout:4000});
        regression = new Regression(global.page); 
        await regression.handleDialogClose();
  });



  When('user clicks on the Structure Palette',{ timeout: 60000 }, async function () {

    const structurePaletteIcon = page.locator('li#a-edit-mode').nth(0);
    await structurePaletteIcon.click();
    
   });

   Then('app displays right side options:structures\\(to add to map)',{ timeout: 600000 }, async function () {
    
    await global.page.locator('li.palette-btn:has-text("HH 24x36x24")').click();
    await global.page.waitForTimeout(5000);
    await regression.clickOnFeature(33.31083013649645, -111.85774752906897);
    await global.page.waitForTimeout(5000);
    await regression.fillFormUsingSpan(arg1);
    await global.page.waitForTimeout(5000);
    await regression.saveButton1.click();
    await global.page.waitForTimeout(5000);
    //Screenshot to check whether options displayed in right side or not
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });

  });
