    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  Given('Ticket table is displayed', { timeout: 600000 },async function () {
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



  When('the User inputs the ticket id in the search bar',{ timeout: 60000 }, async function () {
    await regression.searchAndExpandTicket('ATT-5407');
    await global.page.waitForTimeout(5000);
  });



  When('Clicks on checkbox of the ticket and details opens on the left hand side panel',{ timeout: 60000 }, async function () {
    // Click the checkbox using JavaScript execution
    await global.page.evaluate(() => {
        const checkbox = document.querySelector('input[aria-label="Select all"]');
        if (checkbox && checkbox.click) {
            checkbox.click();
        }
     });
        await global.page.waitForTimeout(5000);
  });



  When('Click on the Edit button Ticket Details tab',{ timeout: 600000 }, async function () {

    const ticketDetails = await page.locator('//span[text()="Ticket Details"]').nth(2);
    await ticketDetails.click();
    await global.page.waitForTimeout(5000);
  });



  Then('Project details are edited',{ timeout: 60000 }, async function () {
    await global.page.locator('.anticon.anticon-edit').nth(1).click();
    await global.page.waitForTimeout(5000);

    const input = await global.page.locator(`input.text.ui-input`).first();

    // Fill the field
    await input.fill('Alpha-Hyd');
    
    // Assertions
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('Alpha-Hyd');

    await global.page.locator(`//span[text()="Submit"]`).click();
    
    await global.page.waitForTimeout(5000);
  });