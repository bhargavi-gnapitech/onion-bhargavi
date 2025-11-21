  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL ,USERNAME ,PASSWORD } = require('../../../../base_lib/credentials.js');
  
  let login;
  let regression;

  Given('{string} is authorized in the application',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
  });



  When('the user access the {string} module', { timeout: 60000 },async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user switches to the {string} interface',{ timeout: 60000 }, async function (string) {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    await global.page.waitForTimeout(500);
  });



  When('User clicks on Sap Queue button',{ timeout: 60000 }, async function () {
  
    await regression.clickSecondInteractionIcon();
    await global.page.waitForTimeout(5000);

  });



  When('Clicks on the record to be re-submitted',{ timeout: 60000 }, async function () {
  
    await regression.searchAndSelectTicket("ATT-5241");
  });



  When('Clicks on the Re-Submit button',{ timeout: 60000 }, async function () {
   await regression.clickReSubmitButton();
   await global.page.waitForTimeout(5000);
  });



  Then('Record is re-submitted to ERP', { timeout: 60000 },async function () {
    //Assertion to validate the Success Message if the record is re-submitt
   
    const AlertMessage = await regression.firstAlertMessage; 
    await expect(AlertMessage).toBeVisible({ timeout: 5000 });
    await expect(AlertMessage).toHaveText('SAP Queue updated!');
  });