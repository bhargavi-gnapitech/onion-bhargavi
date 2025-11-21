
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL ,BASE_URL, IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('the user has opened Design', { timeout: 600000 },async function () {
    //await global.page.goto(PRE_UAT_URL);
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.searchAndSelectDesign(`test_conflict_check`);
    await global.page.waitForTimeout(5000);
    await regression.clickOpenButton();
    await regression.expandToolbar();
  });



  When('the user clicks the Publish button', { timeout: 60000 },async function () {

    await regression.clickPublishDesign();

  });



  When('the Publish Data? dialog displays', { timeout: 60000 },async function () {
 

    await regression.handleDialog('Publish data?', 'OK');

  });



  When('the user clicks the OK button',{ timeout: 60000 }, async function () {

    //await regression.handleDialog('Confirm', 'OK');
   
    
  });



  Then('the app publishes the design changes to master',{ timeout: 6000 }, async function () {
   
    await regression.handleDialog('Information', 'Close'); 

  });