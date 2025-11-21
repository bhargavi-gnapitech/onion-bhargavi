    const { Given, When, Then } = require('@cucumber/cucumber');
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { expect } = require('@playwright/test');
    const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
    let login;
    let regression;
  
    Given('the user should authenticated as {string}',{ timeout: 60000 }, async function (string) {
        await global.page.goto(PRE_UAT_URL);
        login =  new LoginPage(global.page);
        await login.login(USERNAME, PASSWORD);
    });



    When('User clicks the {string} section', { timeout: 60000 },async function (string) {
        index = new IndexPage(global.page);
        await index.openApplication(('mywcm_admin.html'),{timeout:4000});
    });



    When('Tickets table should displayed',{ timeout: 60000 }, async function () {
        regression = new Regression(global.page);
        await regression.handleDialogClose();
        
            
    });



    When('User clicks on Projects Icon',{ timeout: 6000 }, async function () {
       
        await regression.clickProjectsTab();
        await global.page.waitForTimeout(5000);
    });



    Then('Projects Page is displayed', { timeout: 6000 },async function () {
         // Assertion : Check if the Projects Tab is visible
         await expect(regression.btnProjects).toBeVisible();
    });



    When('User clicks on map Icon', { timeout: 6000 },async function () {
        await regression.clickMapIcon();
        await global.page.waitForTimeout(5000);
    });



    Then('Map Page is displayed',{ timeout: 6000 }, async function () {
        // Assertion : Check if the Map Tab is visible
        await expect(regression.btnMap).toBeVisible();
    });

   

    When('User clicks on Settings Icon', { timeout: 6000 },async function () {
        await regression.clickSettingsTab();
        await global.page.waitForTimeout(5000);
    });



    Then('Settings Page is displayed',{ timeout: 6000 }, async function () {
         // Assertion : Check if the Settings Tab is visible
         await expect(regression.btnSettings).toBeVisible();
    });
