const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { expect } = require('@playwright/test');
const { PRE_UAT_URL ,USERNAME ,PASSWORD } = require('../../../../base_lib/credentials.js');
let login;
let regression;

  Given('the user is logged in as {string}',{ timeout: 60000 }, async function (string) {
      await global.page.goto(PRE_UAT_URL);
      login =  new LoginPage(global.page);
      await login.login(USERNAME, PASSWORD);
  });


  When('the user navigates to the {string} application', { timeout: 60000 },async function (string) {
      index = new IndexPage(global.page);
      await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user selects the Ticket Manager tab',{ timeout: 60000 }, async function () {
      regression = new Regression(global.page); 
      await regression.handleDialogClose();
      await regression.clickProjectsTab();
      await global.page.waitForTimeout(500);
  });



  When('the user presses the Open Approvals button',{ timeout: 60000 }, async function () {
      await regression.clickApprovalTab();
      await global.page.waitForTimeout(5000);
  });



  When('User clicks on Pending tab and one particlar record',{ timeout: 600000 }, async function () {

    await regression.searchAndSelectTicket("ATT-5791");
    


  });



  When('Clicks on View Details button', { timeout: 60000 },async function () {
    await regression.clickViewDetailsButton();
    await global.page.waitForTimeout(5000);
  });



  Then('PO and invoice requiring approval are navigated to Payment section',{ timeout: 60000 }, async function () {
    
    //Assert to Verify whether its navigated to Payment section after clciking View Details Button
    const isVisible = await regression.tabPayment.isVisible();
    expect(isVisible).toBeTruthy();
    await global.page.waitForTimeout(5000);
  });
