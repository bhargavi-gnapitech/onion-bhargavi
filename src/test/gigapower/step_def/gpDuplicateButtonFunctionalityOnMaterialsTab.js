    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
    let beforeCount;
  Given('the user is on the Materials tab',{ timeout: 600000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
        const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
        await global.page.goto(BASE_URL);
        login =  new LoginPage(global.page);
        await login.login(IQGEO_USERNAME, PASSWORD);
        index = new IndexPage(global.page);
        await index.openApplication(('mywcm_admin.html'),{timeout:4000});
        regression = new Regression(global.page); 
        await regression.handleDialogClose();
        await global.page.waitForTimeout(5000);
        await regression.clickProjectsTab(); 
        await global.page.waitForTimeout(5000);
  });



  When('User clicks on a Materials element and clicks on Duplicate button',{ timeout: 600000 }, async function () {
        await regression.searchAndExpandTicket('ATT-5407');
        await global.page.waitForTimeout(500);
        await regression.doubleClickOnTicket('ATT-5407');
        await regression.clickMaterialsTab();
  });



  When('fields get auto-populated duplicated in the Insert section and clicks on Save button in the Insert section',{ timeout: 600000 }, async function () {
        beforeCount = await global.page.locator(`//td[text()="New"]`).count();
        await global.page.locator(`//td[text()="New"]`).click();
        await global.page.locator(`//span[text()="Duplicate"]`).click();
        await global.page.waitForTimeout(5000);
        await regression.clickSaveButton();

  });



  Then('Materials element duplicated is inserted into Materials table',{ timeout: 600000 }, async function () {
       const afterCount = await global.page.locator(`//td[text()="New"]`).count(); // Count after
       expect(afterCount).toBeGreaterThan(beforeCount); // Validate one or more rows added
  });