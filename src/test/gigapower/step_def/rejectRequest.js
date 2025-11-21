  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL ,USERNAME ,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('{string} has signed in to the application',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
  });



  When('the user accesses the {string} module',{ timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user opens the Ticket Manager section',{ timeout: 60000 }, async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    await global.page.waitForTimeout(500);
  });



  When('the user activates the Open Approvals action',{ timeout: 60000 }, async function () {
    await regression.clickApprovalTab();
    await global.page.waitForTimeout(5000);
  });



  When('the user navigates to the Pending tab and chooses a record',{ timeout: 60000 }, async function () {
    await regression.searchAndSelectTicket('ATT-5972');
    await global.page.waitForTimeout(5000);
  });



  When('Clicks on Reject button', { timeout: 60000 },async function () {
   await regression.clickRejectButton();
   
   
  });



  Then('Request is rejected', { timeout: 60000 },async function () {
    // Adding Assertions to Verify "Reject" Button is Disabled 
        await expect(regression.btnReject).toBeDisabled();
        await global.page.waitForTimeout(5000);
  });
