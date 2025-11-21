
    const { Given, When, Then } = require('@cucumber/cucumber');                                
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');    
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('the user is viewing the Design screen',{timeout:400000}, async function () {
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



  When('the user clicks the Fix Conflicts button', {timeout:400000 },async function () {
   
    await regression.searchAndSelectDesign('test_234');
    await global.page.waitForTimeout(5000);
    await regression.clickOpenButton();
    await regression.expandToolbar();
    await global.page.locator(`(//li[@title="Fix conflicts"])[2]`).click();
    
  });



  Then('the Fix Conflicts? dialog displays and the user clicks the OK button',{timeout:40000}, async function () {
   
    await regression.handleDialog('Fix conflicts?', 'OK');

  });



  Then('the Confirm dialog displays and the user clicks OK button',{timeout:400000}, async function () {
    
    await regression.handleDialog('Information','Close');
   
  });



  Then('the app runs the fix conflicts process',{timeout:40000}, async function () {
  
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });
  });
