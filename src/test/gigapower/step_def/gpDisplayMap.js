  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the user navigates to the {string}', { timeout: 60000 }, async function (string) {
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
     //await global.page.goto(PRE_UAT_URL);
  });



  When('User inputs {string} and {string}', { timeout: 60000 }, async function (string, string2) {
    
    login =  new LoginPage(global.page);

  });



  When('the user clicks on the login option', { timeout: 60000 }, async function () {

    await login.login(IQGEO_USERNAME, PASSWORD);
  });



  When('the user clicks on {string} from the application list', { timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
  });



  Then('User should be navigated to Network Manager Application', { timeout: 60000 }, async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await global.page.waitForTimeout(5000);
    // Assertion : Verify URL after login to the map page
    await expect(page).toHaveURL('https://dev2.neon.iqgeo.cloud/pre_uat_72/att_network_manager.html');
    await global.page.waitForTimeout(5000);
  });