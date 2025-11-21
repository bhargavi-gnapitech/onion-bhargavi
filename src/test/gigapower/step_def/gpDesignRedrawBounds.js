
    const { Given, When, Then } = require('@cucumber/cucumber');                                
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');    
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('the Design screen is open with a selected design',{timeout:400000}, async function () {
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



  When('the user clicks the Redraw Bounds button',{timeout:400000}, async function () {
        await regression.searchAndSelectDesign('design_tilson');
        await global.page.waitForTimeout(5000);
        await regression.clickOpenButton();
        await regression.expandToolbar();
        await global.page.locator(`//li[@title="Redraw Bounds"]`).click();
        await global.page.waitForTimeout(5000);
  });



  When('the app displays a new design bounds on the map and the app displays an Accept New Bounds dialog and user clicks on the OK button', {timeout:400000},async function () {
        await regression.handleDialog('Accept new bounds', 'OK');
        await global.page.waitForTimeout(5000);
  });



  Then('the app saves the new Design bounds',{timeout:400000}, async function () {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });

  });
