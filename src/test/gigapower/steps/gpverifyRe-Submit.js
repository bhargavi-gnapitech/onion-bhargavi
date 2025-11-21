        const { Given, When, Then } = require('@cucumber/cucumber');
        const { chromium ,expect} = require('@playwright/test');
        const { gigapower } = require('../../../../pages/apps/gigaPower');
        const { LoginPage } = require('../../../../pages/login.js');
        const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
        const { IndexPage } = require('../../../../pages/index.js');

        let GigaPower,login;

         Given('User should be able to logged in as {string}', {timeout:200000},async function (string) {

            await global.page.goto("https://dev2.neon.iqgeo.cloud/neha/mywcm_admin.html");
            login = new LoginPage(global.page);
            await login.login("construction_director", "iqgeo");

         });

   

         Given('User navigate into the {string} section', {timeout:4000000},async function (string) {
           
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            GigaPower = new gigapower(global.page);
            await GigaPower.handleNotificationDialog(global.page);
            
            
            
         });

  

         When('User navigates into to the SAP Queue Tab and pick  any one record based on the ERP Status as {string}',{timeout:200000}, async function (string) {
           
            await global.page.waitForLoadState('networkidle', { timeout: 6000000});
           
            await global.page.waitForSelector(`//span[@role='img' and @aria-label='interaction' and contains(@class, 'anticon anticon-interaction')]`);
            await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
            await global.page.locator(`//span[@role='img' and @aria-label='interaction' and contains(@class, 'anticon anticon-interaction')]`).click();

         });

   

         Then('User should click Re-Submit Button under SAP Queue Tab', {timeout:200000},async function () {
            await global.page.waitForLoadState('networkidle', { timeout: 6000000});
            await GigaPower.searchForItem('ATT-5401');
            await GigaPower.selectCheckbox();
            const resubmitButton = global.page.locator('//button/span[text()="Re-Submit"]');
            await resubmitButton.click();
            await global.page.waitForLoadState('networkidle', { timeout: 6000000});
            await global.page.locator(`//span[@class='ant-modal-close-x']/span[@aria-label='close']`).click();

         });

  

         When('User searches that record in the search ticket field',{timeout:200000}, async function () {
           await global.page.waitForLoadState('networkidle', { timeout: 6000000});
           await GigaPower.searchAndExpandTicket('ATT-5401');
            
         });

  

         When('User should clicks on the Milestone tab to switch to the milestone section', {timeout:200000},async function () {
           
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickTicketsInfoTabs('Milestones');

         });


         When('User should clicks on the milestone row which is ERP Status as {string}', {timeout:2000000},async function (string) {
           
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            const paginationButton = global.page.locator(`//ul[contains(@class, 'ant-pagination')]//li[@title='2']`);
            await paginationButton.waitFor({ state: 'visible', timeout: 60000 });
            await paginationButton.click();
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickTicketsInfoTabs('Failed');
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            const updateHeading = global.page.locator(`//h3[text()="Update"]`);
            await expect(updateHeading).toBeVisible();

         });

   

         Then('User should be able to see the {string} Button in the UPDATE section', {timeout:200000},async function (string) {
           
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickViewLogsButton(); 
           
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            

         });