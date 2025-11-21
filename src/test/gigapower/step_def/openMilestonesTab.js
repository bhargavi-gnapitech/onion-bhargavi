  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test')
  const { USERNAME, PASSWORD ,PRE_UAT_URL} = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the {string} user is logged in successfully',{ timeout: 60000 }, async function (string) {
   await global.page.goto(PRE_UAT_URL);
   login =  new LoginPage(global.page);
   await login.login(USERNAME, PASSWORD);
  });



  When('the user access the {string} section',{ timeout: 60000 }, async function (string) {
     index = new IndexPage(global.page);
     await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user is switches to the {string} mode',{ timeout: 60000 }, async function (string) {
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
     await regression.clickProjectsTab();
  });



  When('the user inputs the ticket ID in the search bar',{ timeout: 60000 }, async function () {
     await regression.searchAndExpandTicket('ATT-5403');
  });



  When('opens the ticket',{ timeout: 60000 }, async function () {
   await regression.doubleClickOnTicket('ATT-5403');
  });



  When('navigate to the {string} tab',{ timeout: 6000 }, async function (string) {
   await regression.clickMilestonesTab();
  });



  Then('the Milestone page is loaded',{ timeout: 6000 }, async function () {

   // Assert that the tab content is visible
   const isVisible = await regression.tabMilestone.isVisible();
   expect(isVisible).toBeTruthy();
   await global.page.waitForTimeout(5000);
  });