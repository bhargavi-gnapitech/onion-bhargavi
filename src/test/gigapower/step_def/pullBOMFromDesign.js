
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { USERNAME, PASSWORD , PRE_UAT_URL} = require('../../../../base_lib/credentials.js');
  
  let login;
  let regression;
  
  Given('the {string} user logged in successfully',{ timeout: 60000 }, async function (string) {
      await global.page.goto(PRE_UAT_URL);
      login =  new LoginPage(global.page);
      await login.login(USERNAME, PASSWORD);
  });



  When('the user navigates to the {string} section', { timeout: 60000 },async function (string) {
        index = new IndexPage(global.page);
        await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user selects the {string} tab',{ timeout: 60000 }, async function (string) {
        regression = new Regression(global.page); 
        await regression.handleDialogClose();
        await regression.clickProjectsTab();
  });


  When('the user searches for the ticket by its ID', { timeout: 60000 },async function () {
        await regression.searchAndExpandTicket('ATT-9108');
  });



  When('the user accesses the {string} tab',{ timeout: 60000 }, async function (string) {

       await regression.doubleClickOnTicket('ATT-9108');
       await global.page.waitForTimeout(500);
       await regression.clickMaterialsTab();
  });



  When('User clicks on the New button',{ timeout: 60000 }, async function () {

      
      await regression.clickNewButton();
  });



  When('Clicks on Pull from BOM button and add or removes materials',{ timeout: 600000 }, async function () {
       
      await regression.clickPullBOMButton();
      await global.page.waitForTimeout(50000);

  });


  When('Clicks on Save button',{ timeout: 60000 }, async function () {

      await regression.clickSaveButton();

  });



  Then('Materials from Design\'s BOM are added and removed',{ timeout: 60000 }, async function () {
      //Assertion for getting to know whether how many materials has been added
      const snippets = await page.locator('span.anticon.anticon-snippets').count();
      console.log(`Number of materials are added after clicking BOM: ${snippets}`);
  });