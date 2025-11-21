  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { USERNAME, PASSWORD ,PRE_UAT_URL} = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the {string} user logs in successfully', { timeout: 60000 }, async function (string) {
   await global.page.goto(PRE_UAT_URL);
   login =  new LoginPage(global.page);
   await login.login(USERNAME, PASSWORD);
  });



  When('the user navigates to the {string} panel', { timeout: 60000 }, async function (string) {
      index = new IndexPage(global.page);
      await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user changes to the {string} mode', { timeout: 60000 }, async function (string) {
       regression = new Regression(global.page); 
       await regression.handleDialogClose();
       await regression.clickProjectsTab();
  });



  When('the user enters the ticket ID in the search field', { timeout: 60000 }, async function () {
       await regression.searchAndExpandTicket('ATT-5403');
  });


  When('views the ticket', { timeout: 60000 }, async function () {

     await regression.doubleClickOnTicket('ATT-5403');
  });



  When('User click on the {string} tab', { timeout: 6000 }, async function (string) {

     await regression.clickWBSTab();
  });



  Then('WBS tab is displayed',  { timeout: 6000 },async function () {
    // Assert that the tab content is visible
     const isVisible = await regression.tabWBS.isVisible();
     expect(isVisible).toBeTruthy();
     await global.page.waitForTimeout(5000);
  });