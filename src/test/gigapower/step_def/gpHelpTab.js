
    const { Given, When, Then } = require('@cucumber/cucumber');                                
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');    
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('the User is in Network Manager application',{timeout:400000}, async function () {
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



  When('User clicks on Help tab on the left-hand side',{timeout:400000}, async function () {
       await page.click('ul.tabControl_nav li:text("Help")');
       await global.page.waitForTimeout(5000);
  });



  Then('Details, patches, versions info, and help document are displayed',{timeout:400000}, async function () {
       // Assert that it contains the expected text
       const helpText = page.locator('div.help-small-text').nth(0);
       await expect(helpText).toContainText('assets, customers, addresses, businesses');
       await global.page.waitForTimeout(5000);
  });