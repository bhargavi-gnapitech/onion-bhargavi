
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { USERNAME, PASSWORD ,PRE_UAT_URL} = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('the {string} user is authenticated',{ timeout: 60000 }, async function (string) {

      await global.page.goto(PRE_UAT_URL);
      login =  new LoginPage(global.page);
      await login.login(USERNAME, PASSWORD);
  });



  When('the user opens the {string} section', { timeout: 60000 },async function (string) {
     index = new IndexPage(global.page);
     await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user switches to the {string} tab', { timeout: 60000 },async function (string) {
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
     await regression.clickProjectsTab();
  });



  When('the user finds the ticket using its ID',{ timeout: 60000 }, async function () {
    await regression.searchAndExpandTicket('ATT-9108');
  });



  When('User clicks on Deliverables tab',{ timeout: 60000 }, async function () {
    
      await regression.doubleClickOnTicket('ATT-9108');

      await global.page.waitForTimeout(500);
      await regression.clickDeliverablesTab();
      

      await global.page.waitForTimeout(5000);
  });



  When('User clicks on button Click to Upload',{ timeout: 60000 }, async function () {

      await regression.clickToUpload();

      
 });



  When('Uploads the document and fills in necessary Title and Notes',{ timeout: 60000 }, async function () {

    await regression.uploadFile();

    // Wait for the upload process
    await global.page.waitForTimeout(5000);
  });



  When('Clicks on Upload button',{ timeout: 60000 }, async function () {
   
    await regression.clickUploadButton();

    await global.page.waitForTimeout(5000);
  });



  Then('Project related documents get uploaded',{ timeout: 600000 }, async function () {
    //Assertion to validate success message after clicking on Upload Button
    const successMessage = await regression.validation;
    await expect(successMessage).toBeVisible({ timeout: 50000 });

  });