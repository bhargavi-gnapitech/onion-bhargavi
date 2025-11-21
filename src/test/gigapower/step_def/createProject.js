    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');

    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { arg ,geographicArea} = require('../../../../base_lib/data.js');
    const { locators } = require('../../../../base_lib/locators.js');
    const { expect } = require('@playwright/test');
    const { PASSWORD, PRE_UAT_USERNAME } = require('../../../../base_lib/credentials.js');
   
    let login;
    let regression;
  Given('User logged in as {string}', { timeout: 60000 },async function (string) {

    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    console.log(`Navigating to: ${BASE_URL}`);

    if (!BASE_URL) {
        throw new Error("BASE_URL is undefined! Check hooks.js setup.");
    }

    await global.page.goto(BASE_URL);
    login = new LoginPage(global.page);
    await login.login(PRE_UAT_USERNAME, PASSWORD);

  });



  Given('User navigate to the {string} section',{ timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_contractor.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();

  });



  Given('Projects table is displayed', { timeout: 60000 },async function () {
    
    
    await regression.clickProjectsTab(); 
           
    await global.page.waitForTimeout(500);    

   

  });



  Given('Clicks on {string}', { timeout: 60000},async function (string) {
   
    await regression.clickCreateProject();
    //await regression.clickOnGeographicSearchAreaButton(); 
    await global.page.waitForTimeout(5000);
  
  });


  Given('Fill in all the mandatory fields with project type field set to PSA', { timeout: 60000 },async function () {

    //await regression.selectSearchLocation(); 
   
    //await regression.selectokbutton();
   
    await regression.fillForm(arg.formData);
    await regression.fillDates();
  
    

});



  Given('Click on {string} button',  { timeout: 60000},async function (string) {
  
    await regression.clickUpdateAdditionalData();

    await regression.clickSubmitButton();

    await global.page.waitForTimeout(5000);

  });



  Then('A new PSA ticket is created with an unique ticket ID', {timeout: 60000 },async function () {

   // Assertion for success message to create new Ticket ID
    await expect(regression.successMessage).toBeVisible();
    await expect(regression.successMessage).toHaveText('Project is successfully created!');  


  });