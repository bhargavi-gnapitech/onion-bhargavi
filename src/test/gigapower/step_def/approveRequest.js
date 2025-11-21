  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL ,USERNAME ,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the user {string} is successfully logged in', { timeout: 60000 },async function (string) {

    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);

  });



  When('the user opens the {string} application',{ timeout: 60000 }, async function (string) {

    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});

  });



  When('the user clicks on the Ticket Manager tab',{ timeout: 60000 }, async function () {
  
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    
  });


  When('the user clicks on the Open Approvals button',{ timeout: 60000 }, async function () {
    
    await regression.clickApprovalTab();
    
  });



  When('the user opens the Pending tab and selects a specific record',{ timeout: 60000 }, async function () {

    await regression.searchAndSelectTicket('ATT-5759');

  });



  When('Clicks on Approve button',{ timeout: 60000 }, async function () {

    await regression.clickApproveButton();
    
  });



  Then('Request is approved',{ timeout: 60000 }, async function () {

    // Adding Assertions to Verify "Approve" Button is Disabled 
    await expect(regression.btnApprove).toBeDisabled();
    await global.page.waitForTimeout(5000);
    
  });