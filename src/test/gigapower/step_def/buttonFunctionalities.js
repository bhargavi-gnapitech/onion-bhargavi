        const { Given, When, Then } = require('@cucumber/cucumber');
        const { LoginPage } = require('../../../../pages/login.js');
        const { IndexPage } = require('../../../../pages/index.js');
        const { Regression } = require('../../../../pages/apps/regression.js');
        const { expect } = require('@playwright/test');
        const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
        
        let login;
        let regression;
        
         Given('the user loggged in with the username {string}', { timeout: 60000 },async function (string) {
            await global.page.goto(PRE_UAT_URL);
            login =  new LoginPage(global.page);
            await login.login(USERNAME, PASSWORD);
         });

   

         When('User is clicks on the {string} section',{ timeout: 60000 }, async function (string) {
            index = new IndexPage(global.page);
            await index.openApplication(('mywcm_admin.html'),{timeout:4000});
         });

   

         When('User open the ticket in ticket manager tab', { timeout: 60000 },async function () {
            regression = new Regression(global.page); 
            await regression.handleDialogClose();
            await regression.clickProjectsTab(); 
            await global.page.waitForTimeout(500);
            await regression.searchAndExpandTicket('ATT-9154');
            await global.page.waitForTimeout(500);
            await regression.doubleClickOnTicket('ATT-9154');
         });

 

         When('User Clicks on the {string} tab', { timeout: 60000 },async function (string) {
            
            await regression.clickPaymentTab();
         });

  

         When('User clicks on New record added to table', { timeout: 60000 },async function () {
            
            await regression.clickMsOneItem();
         });

   

         When('Clicks on Submit button',{ timeout: 60000 }, async function () {
           
           await regression.clickSubmitButton();

         });

  

         Then('Purchase order is submitted',{ timeout: 60000 }, async function () {
             //  // Wait for the success message to appear
             const successMessageSelector = '//div[contains(text(),"Success!")]'; // Use string selector
             await global.page.waitForSelector(successMessageSelector, { timeout: 60000 });

            // // Optionally, you can log or validate the success message
            const successMessage = await global.page.locator(successMessageSelector);
            const messageText = await successMessage.textContent();
            console.log(`Success message: ${messageText}`);
            await global.page.waitForTimeout(5000);
         });

        When('Clicks on unsubmit button',{ timeout: 60000 }, async function () {

           await regression.clickUnsubmitButton();
           await global.page.waitForTimeout(5000);
         });

  

         Then('Purchase order is unsubmitted and is brought back to the New status',{ timeout: 60000 }, async function () {

           // Adding Assertions to Verify "Approve" Button is Disabled 
              await expect(regression.btnUnsubmit).toBeDisabled();
            

         });

         When('Clicks on Delete button',{ timeout: 60000 }, async function () {
            
            await regression.clickDeleteAndConfirm();
         });

 

         Then('Purchase order is deleted',{ timeout: 60000 }, async function () {
           // Assert that the confirmation message appears
           await expect(page.locator('.ant-popconfirm-title')).toHaveText('Confirm to delete item');
         });
