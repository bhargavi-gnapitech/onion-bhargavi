  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { USERNAME ,PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
  
  let login;
  let regression;
  
  Given('the user logs in with the username {string}',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login( USERNAME , PASSWORD);
  });
  When('User is click on the {string} section',{ timeout: 60000 }, async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });
  When('User opens the ticket in ticket manager tab',{ timeout: 600000 }, async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await regression.clickProjectsTab();
    await global.page.waitForTimeout(500);
    await regression.searchAndExpandTicket('ATT-9108');
    await global.page.waitForTimeout(5000);
    await regression.doubleClickOnTicket('ATT-9108');

  
   
   
  });
  When('Clicks on the {string} tab', { timeout: 6000 },async function (string) {
    await regression.clickPaymentTab();
  });
  When('User clicks on New button in payment tab',{ timeout: 6000 }, async function () {
    
    await regression.clickNewButton();
    await global.page.waitForTimeout(5000);
  });

  When('Clicks on Add button under Invoice Request Data',{ timeout: 6000 }, async function () {
    await regression.clickAddButton();
    
  });

  When('Fills in all the fields and clicks on Save button',{ timeout: 600000 }, async function () {

    await regression.performActions();
    await regression.clickSaveButton();
    await global.page.waitForTimeout(5000);
  });

  Then('New purchase order is created', { timeout: 60000 },async function () {
    
    // Assert All "New" Elements Are Visible
    const newOrders = await regression.newPurchaseOrder;
    const count = await newOrders.count();
    
    for (let i = 0; i < count; i++) {
        expect(await newOrders.nth(i).isVisible()).toBeTruthy();
    }
  });