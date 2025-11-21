
    const { Given, When, Then } = require('@cucumber/cucumber');                                
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');    
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('the user is currently using the Network Manager',{timeout:400000}, async function () {
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



  When('User clicks on Go to Home Bookmark button',{timeout:40000}, async function () {
         
    // Click on the Go to Home Bookmark button
    await global.page.locator(`//li[@title="Go to home bookmark"]`).click();
    await global.page.waitForTimeout(5000);
  });



  Then('User is navigated to the bookmarked location',{timeout:40000}, async function () {
    //Screenshot to view the bookmarked location
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });
    await global.page.waitForTimeout(5000);
  });
