  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PASSWORD, PRE_UAT_URL , PRE_UAT_USERNAME } = require('../../../../base_lib/credentials.js');
  
  let login,regression;
  Given('the user authenticated as {string}',{ timeout: 600000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login = new LoginPage(global.page);
    await login.login(PRE_UAT_USERNAME, PASSWORD);
  });

  Given('User clicks into the {string} section',{ timeout: 600000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_contractor.html'),{timeout:4000});
  });

  Given('Tickets page is displayed', { timeout: 600000 },async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    
  });

  When('User clicks on the expand button', { timeout: 6000000 },async function () {
   
   await regression.clickPHX001();
   

  });



  When('clicks on right arrow',{ timeout: 600000 }, async function () {

    await regression.clickRightArrow();
    await global.page.waitForTimeout(5000);
   
  });



  Then('Next page is displayed and number of tickets on the opened page is displayed',{ timeout: 60000 }, async function () {
     //Assertion to check whether it is clicked right arrow to go into Next page or not
    await expect(regression.rightClick).toBeVisible({ timeout: 5000 });

  });



  When('User clicks on left arrow',{ timeout: 60000 }, async function () {

    await regression.clickLeftArrow();
    await global.page.waitForTimeout(5000);
  });



  Then('previous page is displayed and number of tickets on the opened page is displayed',{ timeout: 6000 }, async function () {
    //Assertion to check whether it is clicked left arrow to go into previous page or not
    await expect(regression.leftClick).toBeVisible({ timeout: 5000 });
  });



  When('User selects a page number',{ timeout: 60000 }, async function () {
    
    await regression.clickSelectedPage();
    await global.page.waitForTimeout(5000);
  
  });



  Then('Selected page is displayed and number of tickets on the opened page is displayed',{ timeout: 6000 }, async function () {
    //Assetion to check whether it is selected page as per requirement or not
    await expect(regression.selectedClick).toBeVisible({ timeout: 5000 });
  });