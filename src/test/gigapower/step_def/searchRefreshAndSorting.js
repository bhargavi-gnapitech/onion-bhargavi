  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL ,USERNAME ,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('{string} is authenticated in the system',{ timeout: 60000 }, async function (string) {
     await global.page.goto(PRE_UAT_URL);
     login =  new LoginPage(global.page);
     await login.login(USERNAME, PASSWORD);
  });



  When('the user switches to the {string} section',{ timeout: 60000 }, async function (string) {
     index = new IndexPage(global.page);
     await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user navigates to the Ticket Manager screen',{ timeout: 60000 }, async function () {
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
     await regression.clickProjectsTab();
     await global.page.waitForTimeout(500);
  });



  When('the user selects the Open Approvals option',{ timeout: 60000 }, async function () {
     await regression.clickApprovalTab();
     await global.page.waitForTimeout(5000);
  });



  Then('User clicks on refresh button',{ timeout: 60000 }, async function () {
    // await global.page.locator(`button.ant-btn.ant-btn-circle.ant-btn-default.ant-btn-icon-only`).click();
    await regression.clickRefreshButton();
    await global.page.waitForTimeout(5000);
  });



  Then('Approvers queue is refreshed',{ timeout: 60000 }, async function () {
   // Step 1: Capture an element’s state before refresh (like text, value, or visibility)
    const initialContent = await regression.columnHeader.innerText();

    // Step 2: Locate and click the refresh button
    await regression.clickRefreshButton();
    // Step 3: Wait for the page to reload
    await page.waitForLoadState('load');

    // Step 4: Assert that the content remains the same after the refresh
    const newContent =await regression.columnHeader.innerText();
    expect(initialContent).toBe(newContent);
    
  });



  Then('User hovers over the column header and clicks on it & based on the display text during hovering',{ timeout: 600000 }, async function () {


    await regression.clickColumnHeader();
});



  Then('A column gets sorted in ascending order, descending order and sorting is cancelled',{ timeout: 60000 }, async function () {
    
    await regression.handleSorting();

  });

  When('User inputs in the search field',{ timeout: 60000 }, async function () {
    
    await regression.searchTicket.fill("ATT-5631");  // Use this.ticketID
    
  });



  Then('Search results are displayed',{ timeout: 60000 }, async function () {
      // Use the locator from regression.js
       await regression.getSearchResultsCount();
      // Verify visibility of all records
      await regression.verifySearchResultsVisibility();
    
   
    
  });

