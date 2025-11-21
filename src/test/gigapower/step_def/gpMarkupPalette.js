
    const { Given, When, Then } = require('@cucumber/cucumber');                                
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');    
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('the user is using the NMT app',{timeout:400000}, async function () {
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



  When('the user clicks the Markup Palette',{timeout:400000}, async function () {
    const markupPaletteIcon = await global.page.locator('li#a-edit-mode').nth(2);
    await markupPaletteIcon.click();
    await global.page.waitForTimeout(50000);
  });



  Then('the app should displays the options on the right side panel',{timeout:400000}, async function () {
    
  });