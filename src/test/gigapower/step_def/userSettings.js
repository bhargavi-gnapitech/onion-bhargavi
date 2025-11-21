
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { USERNAME, PASSWORD ,PRE_UAT_URL} = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('User is logged in as {string}',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
  });



  When('selects Settings button on the bottom panel',{ timeout: 60000 }, async function () {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
  });



  When('then selects the Reporting tab',{ timeout: 60000 }, async function () {

    await regression.clickSettingsTab();
    //await regression.clickMapIcon();

    await global.page.waitForTimeout(5000);

  });



  Then('app displays Reporting page',{ timeout: 60000 }, async function () {
   //Assertion to convey that it is navigated Reporting Page Successfully after clicking Settings Tab
   const successMessage = await regression.reporting;
   await expect(successMessage).toBeVisible({ timeout: 50000 });

  });