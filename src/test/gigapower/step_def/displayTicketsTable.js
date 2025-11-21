         const { Given, When, Then } = require('@cucumber/cucumber');
         const { LoginPage } = require('../../../../pages/login.js');
         const { IndexPage } = require('../../../../pages/index.js');
         const { Regression } = require('../../../../pages/apps/regression.js');
         const { expect } = require('@playwright/test');
         const { PASSWORD, PRE_UAT_URL , PRE_UAT_USERNAME } = require('../../../../base_lib/credentials.js');
         

         Given('User should logged in  {string}',{ timeout: 60000 }, async function (string) {
           
            await global.page.goto(PRE_UAT_URL);
            login = new LoginPage(global.page);
            await login.login(PRE_UAT_USERNAME, PASSWORD);

         });

   

         When('User clicks on application {string}', { timeout: 60000 },async function (string) {
           
            index = new IndexPage(global.page);
            await index.openApplication(('mywcm_contractor.html'),{timeout:4000});

         });

   

         Then('User should be navigated to Projects table',{ timeout: 600000 }, async function () {

            
            const regression = new Regression(global.page); 
            await regression.handleDialogClose();
            
            await regression.clickProjectsTab();
            await global.page.waitForTimeout(500);
            
            // Assertion: Check if the 'Create Project' button is visible
            await expect(regression.createProject.nth(2)).toBeVisible();
            await global.page.waitForTimeout(5000);

           
         });