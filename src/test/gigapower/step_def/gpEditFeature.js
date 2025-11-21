
            const { Given, When, Then } = require('@cucumber/cucumber');
            const { LoginPage } = require('../../../../pages/login.js');
            const { IndexPage } = require('../../../../pages/index.js');
            const { Regression } = require('../../../../pages/apps/regression.js');
            const { expect } = require('@playwright/test');
            const { IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
            let login;
            let regression;
         Given('the user accesses the Network Manager',{ timeout: 60000 }, async function () {
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


         When('User clicks on the feature on the map',{ timeout: 60000 }, async function () {
            await regression.clickOnFeature( 33.3102015348764,-111.85959757675741 );  //Building Coordinates[33.310184186559056,-111.85932748582438(UUB coordinates)]
            
         });

  

         When('Clicks on Edit button',{ timeout: 60000 }, async function () {
           await global.page.locator(`#details-editable`).click();
         
         });

   

         Then('The user is able to edit fields of selected feature',{ timeout: 60000 }, async function () {
            const houseNumberInput = global.page.locator('div[name="House Number"] input');
            const streetDirectionInput = global.page.locator('div[name="Street Direction"] input');
        
            await houseNumberInput.waitFor({ timeout: 10000 });
            await houseNumberInput.fill('681');
            
            await streetDirectionInput.waitFor({ timeout: 10000 });
            await streetDirectionInput.fill('S');
        
            // Optional: Assert before save
            await expect(houseNumberInput).toHaveValue('681');
            await expect(streetDirectionInput).toHaveValue('S');
        
            await global.page.locator(`//button[text()="Save"]`).click();
          
         });