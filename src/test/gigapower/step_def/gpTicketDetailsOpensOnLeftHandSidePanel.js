
    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');

    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
   
    let login;
    let regression;
  Given('Tickets table is displayed', { timeout: 600000 }, async function () {
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



  When('User inputs ticket id in the search bar', { timeout: 60000 }, async function () {
    await regression.searchAndExpandTicket('ATT-5403');
    await global.page.waitForTimeout(5000);
  });



  When('Clicks on checkbox of the ticket', { timeout: 60000 }, async function () {
    // Click the checkbox using JavaScript execution
    await global.page.evaluate(() => {
    const checkbox = document.querySelector('input[aria-label="Select all"]');
    if (checkbox && checkbox.click) {
        checkbox.click();
    }
 });
    await global.page.waitForTimeout(5000);
  });



  Then('Ticket details opens on the left hand side panel', { timeout: 60000 }, async function () {
    //Assert to Validate that the ticket details are opened on the left hand side panel
    const ticketTitleLocator = page.locator('.ticket-form-layout-title-selected-tickets').first();
    await expect(ticketTitleLocator).toHaveText('Selected Tickets:  ATT-5403');
    await global.page.waitForTimeout(5000);
  });