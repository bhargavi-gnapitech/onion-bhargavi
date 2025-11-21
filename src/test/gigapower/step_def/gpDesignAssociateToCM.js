
const { Given, When, Then } = require('@cucumber/cucumber');                                
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');    
const { Regression } = require('../../../../pages/apps/regression.js');
const { expect } = require('@playwright/test');
const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
const data = require('../../../../base_lib/data1.js');
let login;
let regression;
 Given('the user is on the Design Page',{ timeout: 600000 },async function () {

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



  Given('the user has populated the Project Number field with a valid CM Project Number',{ timeout: 60000 }, async function () {
    await regression.searchAndSelectDesign('test_234');
    await global.page.waitForTimeout(5000);
    await global.page.locator(`#details-editable`).click();
     // Locate the first Project Number field
     const projectNumberField = await global.page.locator(`(//textarea[contains(@class,"text ui-input")])[1]`);


     // Clear the existing value
     await projectNumberField.fill('');
 
     // Fill with new value
     await projectNumberField.fill(data.projectNumber);
 
     // Verify if the value is entered correctly
     await expect(projectNumberField).toHaveValue(data.projectNumber);
 
     // Click Save (if needed)
     await page.click('button:has-text("Save")'); // Adjust selector if necessary

     await global.page.waitForTimeout(5000);
  });



  When('the user clicks the Associate To CM button',{ timeout: 600000 }, async function () {
     
    await global.page.locator(`//button[text()='Associate to CM']`).click();
    await global.page.waitForTimeout(5000);
  });



  Then('the app displays the Associate CM Project dialog',{ timeout: 60000 }, async function () {
    // Locate the "Associate CM Project" element
    const associateToCM = await global.page.locator('span:has-text("Associate CM Project")');

    // Assert that it's visible
    await expect(associateToCM).toBeVisible();
  });



  Then('then the user clicks the OK button', { timeout: 60000 },async function () {

    await regression.handleDialog('Associate CM Project', 'OK');
    await global.page.waitForTimeout(5000);

  });



  Then('then the app populates the CM Project Tracking field with the CM Ticket Number',{ timeout: 60000 }, async function () {
    // Locate the 13th CM Project Tracking field
    const cmProjectTracking = await global.page.locator('.feature-edit-input > div').nth(12); // Index starts from 0, so 13th element is 12

    // Assert visibility
    await expect(cmProjectTracking).toBeVisible();

    // Get and print the ticket number
    const ticketNumber = await cmProjectTracking.textContent();
    console.log(`CM Project Tracking Ticket Number: ${ticketNumber.trim()}`);
  });
