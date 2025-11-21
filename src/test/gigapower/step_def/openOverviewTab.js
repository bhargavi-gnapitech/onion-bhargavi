const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { expect } = require('@playwright/test');
const { USERNAME, PASSWORD ,PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
let login;
let regression;

  Given('the {string} user is successfully authenticated', { timeout: 60000 },async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
  });



  When('the user open the {string} panel',{ timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user switch to the {string} mode',{ timeout: 60000 }, async function (string) {
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
     await regression.clickProjectsTab();
     
  });



  When('User inputs the ticket id in the search bar',{ timeout: 600000 }, async function () {

     await regression.searchAndExpandTicket('ATT-5403');
   

  });



  When('Open the ticket',{ timeout: 60000 }, async function () {

    await regression.doubleClickOnTicket('ATT-5403');

  });



  When('User moves on the {string} tab',{ timeout: 6000 }, async function (string) {
    await regression.clickDeliverablesTab();

    
  });



  Then('Overview tab is opened',{ timeout: 6000 }, async function () {
    // Assert that the tab content is visible
    const isVisible = await regression.tabDeliverable.isVisible();
    expect(isVisible).toBeTruthy();
    await global.page.waitForTimeout(5000);
  });