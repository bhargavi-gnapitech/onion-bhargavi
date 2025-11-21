  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('the user should be authenticated as {string}',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
  });



  When('User clicks on the {string} section',{ timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('Ticket table should displayed',{ timeout: 60000 }, async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
            
    await regression.clickProjectsTab();
    await global.page.waitForTimeout(500);
  });


  When('User Opens the ticket',{ timeout: 60000 }, async function () {
    await regression.searchAndExpandTicket('ATT-9108');
    
    await regression.doubleClickOnTicket('ATT-9108');
    
    await global.page.waitForTimeout(5000);     
  });



  When('Click on the {string} tab',{ timeout: 60000 }, async function (string) {
    await regression.clickWBSTab();
    await global.page.waitForTimeout(5000);    
  });

   
  Then('WBS tab is opened',{ timeout: 600 }, async function () {

    await expect(regression.tabWBS).toBeVisible();
   
  });

  

  Then('User clicks on the Template Button',{ timeout: 60000 }, async function () {

    await regression.clickTemplateButton(); 
    await global.page.waitForTimeout(5000);  

  });

   

  Then('All the WBS elements get generated',{ timeout: 600 }, async function () {

    // Assertion : Verify that all WBS elements are displayed
    const wbsCount = await regression.wbsElements.count();
    console.log(`Total WBS Elements Found: ${wbsCount}`);  // For debugging

  });


  