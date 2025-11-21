
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { PASSWORD, PRE_UAT_URL , PRE_UAT_USERNAME } = require('../../../../base_lib/credentials.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
 
  const { arg } = require('../../../../base_lib/data.js');
  const { expect } = require('@playwright/test');
  let login;
  let regression;
  
  Given('the user is authenticated as {string}',{ timeout: 600000 }, async function (string) {
     await global.page.goto(PRE_UAT_URL);
     login = new LoginPage(global.page);
     await login.login(PRE_UAT_USERNAME, PASSWORD);
  });

  Given('User move into the {string} section', { timeout: 600000 },async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_contractor.html'),{timeout:4000});
  });

  Given('Tickets table page is displayed',{ timeout: 6000000}, async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    await global.page.waitForTimeout(5000);
    await regression.clickCreateProject();
  });



  Given('Click on {string}',  { timeout: 600000},async function (string) {
    
    await regression.clickOnGeographicSearchAreaButton();
    
    await global.page.waitForTimeout(5000);
   
    
  });



  Given('Do not fill in all the mandatory fields',{ timeout: 600000}, async function () {
    await regression.clickFirstTableRow();
   
    await regression.clickokbutton();
    console.log("fill form method started");
    await regression.fillForm(arg.formData);
    await global.page.waitForTimeout(5000);
    await regression.clickDycom();

  });



  Given('Clicks on {string} button',{timeout: 6000}, async function (string) {
     
    await regression.clickSubmitButton();
  });



  Then('UI displays alerts if mandatory fields are left blank', {timeout: 60000},async function () {
   
  
    await regression.clickUpdateAdditionalData();

    await regression.selectAndClickValues();
  
    await global.page.waitForLoadState('networkidle', { timeout: 5000 });

    await regression.clickValidateButton();

    await regression.clickSaveButton1();

    await regression.clickSubmitButton();

    await global.page.waitForTimeout(5000);

    //Assert To Validate the Error Message if we leave the fields as Empty

    const AlertMessage = await regression.firstAlertMessage; // 1-based index in XPath
    await expect(AlertMessage).toBeVisible({ timeout: 5000 });
    await expect(AlertMessage).toHaveText('Please select estimated dates!');
 
  });