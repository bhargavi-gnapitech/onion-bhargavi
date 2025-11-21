const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
// const gigaPower = require('../../../../src/pages/apps/gigaPower');
const { gigapower } = require('../../../../pages/apps/gigaPower');

const { LoginPage } = require('../../../../pages/login.js');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');

        let page, browser,GigaPower,login;

         Given('the user is signed in with the role {string}',{timeout:200000}, async function (string) {
           
            await global.page.goto("https://dev2.neon.iqgeo.cloud/pre-uat/login");
            login = new LoginPage(global.page);
            await login.login("construction_dycom", "iqgeo");
            
             
         });



         Given('User switches into {string} area', {timeout:4000000},async function (string) {
           
            
            index = new IndexPage(global.page);
                
            const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
            await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
            // Initialize the GigaPower class
            GigaPower = new gigapower(global.page);
            await GigaPower.handleNotificationDialog(global.page);
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            

         });


         When('User navigates into to the Projects Tab and locates the Ticket Number', {timeout:400000},async function () {

            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            await GigaPower.searchAndExpandTicket('ATT-5436');
            

         });


         Then('Click on the Payments Tab and After creating the MS-{int}, I clicked the submit button',{timeout:40000000}, async function (int) {
          
            await GigaPower.clickPaymentsTab();  
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });

            await GigaPower.interactWithNewCell();
          
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickSubmitButton();
           
            //  // Wait for the success message to appear
             const successMessageSelector = '//div[contains(text(),"Success!")]'; // Use string selector
             await global.page.waitForSelector(successMessageSelector, { timeout: 60000 });

            // // Optionally, you can log or validate the success message
            const successMessage = await global.page.locator(successMessageSelector);
            const messageText = await successMessage.textContent();
            console.log(`Success message: ${messageText}`);
            const screenshot1 = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickCloseButton();
            
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            // // Navigate to the Map tab
            // 
            await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

            await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();

            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickLogoutLink();
           
          
         });

   

         Then('login as construction_manager And checked in approvals tab :No duplicate entries were found for the same milestone payment.', {timeout:40000000},async function () {  
          
            await login.login("construction_director", "iqgeo");
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            await GigaPower.handleNotificationDialog(global.page);
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            await GigaPower.clickApprovalTab();
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            await GigaPower.searchForItem('ATT-5009');
            await global.page.waitForLoadState('networkidle', { timeout: 600000 });
            const screenshot = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });


         });