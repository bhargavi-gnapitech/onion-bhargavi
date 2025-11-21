        const { Given, When, Then } = require('@cucumber/cucumber');
        const { chromium ,expect} = require('@playwright/test');
        const { gigapower } = require('../../../../pages/apps/gigaPower');
        const { LoginPage } = require('../../../../pages/login.js');
        const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
        const { IndexPage } = require('../../../../pages/index.js');

        let page,GigaPower,login;

         Given('User should be logged in as {string}', {timeout:200000},async function (string) {
            await global.page.goto("https://dev2.neon.iqgeo.cloud/neha/mywcm_admin.html");
            login = new LoginPage(global.page);
            await login.login("construction_director", "iqgeo");
         });

  

         Given('User switches into the {string} area', {timeout:40000000},async function (string) {
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            GigaPower = new gigapower(global.page);
            await GigaPower.handleNotificationDialog(global.page);

            await global.page.waitForLoadState('networkidle', { timeout: 6000000});
           
            await global.page.waitForSelector(`//span[@role='img' and @aria-label='interaction' and contains(@class, 'anticon anticon-interaction')]`);
            await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
            await global.page.locator(`//span[@role='img' and @aria-label='interaction' and contains(@class, 'anticon anticon-interaction')]`).click();
            
           
         });

   

         When('User navigates into to the SAP Queue Tab and pick one record based on the ERP Status as {string}',{timeout:2000000}, async function (string) {

           await global.page.locator(`//input[@class='ant-input' and @type='text']`).fill('ATT-6513');
            await global.page.waitForLoadState('networkidle', { timeout: 700000 });
           
            await global.page.locator(`//span[@class='ant-modal-close-x']/span[@aria-label='close']`).click();
          
         });

   

         When('User search that record in the search ticket field',{timeout:200000}, async function () {
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.searchAndExpandTicket('ATT-6513');
         });

         
  
         When('User click on the Milestone tab to switch to the milestone section',{timeout:200000}, async function () {
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickTicketsInfoTabs('Milestones');
            
            const screenshot3 = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });

           });

         When('User clicks on the milestone row which is ERP Status as {string}', {timeout:200000},async function (string) {
           await global.page.waitForLoadState('networkidle', { timeout: 60000 });
         //   
           await GigaPower.clickTicketsInfoTabs('Failed');
           await global.page.waitForLoadState('networkidle', { timeout: 60000 });
           const updateHeading = global.page.locator(`//h3[text()="Update"]`);
           await expect(updateHeading).toBeVisible();
         });

   

         Then('User should be able to see the {string} Button under view logs button in the UPDATE section',{timeout:200000}, async function (string) {
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            const retryButton = global.page.locator('//button/span[text()="Retry Send to ERP"]');
            await retryButton.click();
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            
            await GigaPower.clickViewLogsButton(); 
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
         });