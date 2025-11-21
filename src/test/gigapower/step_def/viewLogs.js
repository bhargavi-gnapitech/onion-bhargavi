  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { USERNAME, PASSWORD,  PRE_UAT_URL } = require('../../../../base_lib/credentials.js');

  const { expect } = require('@playwright/test');
  let login;
  let regression;

  Given('the user loggged as with the username {string}',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
  });



  When('User moves on the {string} section',{ timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('User opens ticket in ticket manager tab', { timeout: 60000 },async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    await regression.searchAndExpandTicket('ATT-9108');
    await regression.doubleClickOnTicket('ATT-9108');
    await global.page.waitForTimeout(5000);
  });



  When('User click on {string} tab',{ timeout: 6000 }, async function (string) {
    await regression.clickPaymentTab();
  });



  When('User clicks on a Purachase Order record', { timeout: 6000 },async function () {
  
    await regression.clickMsZeroItem();
  });



  When('Clicks on View Logs button under Update Section',{ timeout: 60000 }, async function () {
   
    await regression.clickViewLogs();
    await global.page.waitForTimeout(5000);
  });



  Then('Logs of Purchase Order opens in a pop-up window',{ timeout: 60000 }, async function () {
    //Assertion to add invoices after clicking view Logs Button
    await expect(regression.logsDisplay).toBeVisible();
  });