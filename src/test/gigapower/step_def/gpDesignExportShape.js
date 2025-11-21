
    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { PRE_UAT_URL , IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('the user is on the Design screen',{ timeout: 600000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await global.page.waitForTimeout(5000);
  });



  When('the user selects the Export button',{ timeout: 60000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    await regression.searchAndSelectDesign('test_conflict_check');
    await global.page.waitForTimeout(5000);
  });



  Then('the Export Design popup appears',{ timeout: 60000 }, async function () {
    await regression.clickExportButton();
  });



  Then('then the user clicks the Shape button',{ timeout: 60000 }, async function () {
    await regression.clickExportShape();
  });



  Then('the system saves the exported file in the Downloads folder',{ timeout: 60000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    await regression.handleDialog('Export test_conflict_check', 'Close');   
    //Screenshot to view the download file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });
    await global.page.waitForTimeout(5000); 
  });