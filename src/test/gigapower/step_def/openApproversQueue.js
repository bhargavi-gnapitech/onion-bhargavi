  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL ,USERNAME ,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the user loggged in as  {string}',{ timeout: 60000 },  async function (string) {
     await global.page.goto(PRE_UAT_URL);
     login =  new LoginPage(global.page);
     await login.login(USERNAME, PASSWORD);
  });



  When('User moves on the {string} application',{ timeout: 60000 },  async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('User Clicks on the Ticket Manager tab',{ timeout: 60000 },  async function () {
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
     await regression.clickProjectsTab();
     await global.page.waitForTimeout(500);
  });



  When('User clicks on Open Approvals button',{ timeout: 60000 },  async function () {
    await regression.clickApprovalTab();
    await global.page.waitForTimeout(5000);
  });



  Then('Approvers queue with tabs: Pending, Other is opened',{ timeout: 60000 },  async function () {
    // Click on the Pending tab
    await regression.clickOthersTab();

    // Assert To Verify that both Pending and Others tabs are visible
    await regression.verifyTabsVisibility();
    
  });



  Then('the user only sees items where they are either the Primary or Secondary approver',{ timeout: 60000 },  async function () {
   
    // Assert To Verify that Primary Approver and Secondary Approver columns are visible
    await regression.verifyApproversVisibility();
  });