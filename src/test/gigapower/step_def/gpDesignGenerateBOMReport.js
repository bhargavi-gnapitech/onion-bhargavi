
    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { PRE_UAT_URL , IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('user has opened a Design', { timeout: 600000 },async function () {
    // Write code here that turns the phrase above into concrete actions
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await global.page.waitForTimeout(5000);
  });



  When('the user clicks the Generate BOM Report button',{ timeout: 60000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    await regression.searchAndSelectDesign('test_conflict_check');
    await global.page.waitForTimeout(5000);
    await regression.clickOpenButton();
    await regression.expandToolbar();
  });



  Then('the Generate BOM? dialog displays',{ timeout: 600000 }, async function () {
    await global.page.locator(`//li[@title='Generate BOM report']`).click();
    await global.page.waitForTimeout(5000);
  });



  Then('the user clicks on the OK button',{ timeout: 60000 }, async function () {
    await global.page.locator(`//button[text()='OK']`).click();
    await global.page.waitForTimeout(5000);
  });



  Then('the app creates and displays the Bill of Materials report',{ timeout: 60000 }, async function () {

    await expect(page.locator('h3', { hasText: 'Bill of Materials' })).toBeVisible();
    const text = await page.locator('h3').textContent();
    console.log(text);


  });



  Then('the user can view it or download it',{ timeout: 60000 }, async function () {
    await global.page.locator(`//button[text()='Download']`).click();
    await global.page.waitForTimeout(5000);
  });