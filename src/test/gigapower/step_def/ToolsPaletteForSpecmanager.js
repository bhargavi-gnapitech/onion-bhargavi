
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL , USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('User is in Network Manager application',{ timeout: 600000 }, async function () {
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
  });

  When('User clicks on Tools Palette',{ timeout: 6000 }, async function () {
   await global.page.locator(`#a-tools-mode`).click();
   await global.page.locator(`#specManagerDialog.dialog-tooltip-container`).click();
   await global.page.waitForTimeout(5000);

  });



  Then('User is able to view the added tools to the application in a side panel',{ timeout: 6000 }, async function () {
   
  });



  Then('The user clicks on the Spec Manager Tool',{ timeout: 6000 }, async function () {
    
  });



  Then('The user should be able to perform the actions in Spec Manager Tool',{ timeout: 6000 }, async function () {
    
  });