 
        
             const { Given, When, Then } = require('@cucumber/cucumber');
            const { LoginPage } = require('../../../../pages/login.js');
            const { IndexPage } = require('../../../../pages/index.js');
            const { Regression } = require('../../../../pages/apps/regression.js');
            const { expect } = require('@playwright/test');
            const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
            let login;
            let regression;
         Given('the user navigates to the Tickets section',{ timeout: 600000000 }, async function () {
           // Write code here that turns the phrase above into concrete actions
                   const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
                   await global.page.goto(BASE_URL);
                   login =  new LoginPage(global.page);
                   await login.login(IQGEO_USERNAME, PASSWORD);
                   index = new IndexPage(global.page);
                   await index.openApplication(('mywcm_admin.html'),{timeout:4000})
                   regression = new Regression(global.page); 
                   await regression.handleDialogClose();
                   await global.page.waitForTimeout(5000);
                   await regression.clickProjectsTab(); 
                   await global.page.waitForTimeout(5000);
         });

   

         When('User clicks on the {string} button on the top left corner',{ timeout: 6000000 }, async function (string) {
                  await regression.searchAndExpandTicket('ATT-5403');
                  await global.page.waitForTimeout(5000);
                  await global.page.locator(`.anticon anticon-delete-column`).click();
         });

  

         When('User selects and deselects a column',{ timeout: 60000 }, async function () {
           
         });

   

         Then('UI displays only the selected columns',{ timeout: 60000 }, async function () {
           
         });
