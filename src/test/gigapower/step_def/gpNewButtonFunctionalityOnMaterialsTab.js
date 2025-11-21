    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;

  Given('Materials tab is opened',{ timeout: 600000 }, async function () {
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



  When('User clicks on New button,Insert section will appears at the bottom',{ timeout: 60000 }, async function () {
    await regression.searchAndExpandTicket('ATT-5407');
    await global.page.waitForTimeout(500);
    await regression.doubleClickOnTicket('ATT-5407');
    await regression.clickMaterialsTab();
    await regression.clickNewButton();
    await global.page.waitForTimeout(5000);
  });



  When('user clicks on add button',{ timeout: 60000 }, async function () {
    await regression.clickAddButton();
    await global.page.waitForTimeout(5000);
  });



  When('All fields are input and clicks on Save button',{ timeout: 6000000 }, async function () {
    const taskCode = await page.locator('.ant-btn.css-dev-only-do-not-override-1t32hyu.ant-btn-circle.ant-btn-default.ant-btn-icon-only').nth(2);
    await taskCode.click(); 
    await global.page.locator(`//tr[@data-row-key="1"]`).click();
    await global.page.locator(`//span[text()="Ok"]`).click();
    const materialCode = await page.locator('.ant-btn.css-dev-only-do-not-override-1t32hyu.ant-btn-circle.ant-btn-default.ant-btn-icon-only').nth(3);
    await materialCode.click(); 
    await global.page.locator(`//tr[@data-row-key="0000031969"]`).click();
    await global.page.locator(`//span[text()="Ok"]`).click();
    await global.page.locator('.ant-input-number-input').nth(4).fill('4'); // 0-based index, so 4 = 5th element
    await regression.clickSaveButton();
    await global.page.waitForTimeout(5000);
  });



  Then('A new Materials element is added into the table',{ timeout: 60000 }, async function () {
    //Assertion to perform whether New record is added or not
    const newStatusCell = page.locator('td.ant-table-cell', { hasText: 'New' });
    await expect(newStatusCell).toBeVisible();
    await global.page.waitForTimeout(5000);
  });