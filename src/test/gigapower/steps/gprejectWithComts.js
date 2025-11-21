const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
 
let page, browser,GigaPower,login;

         Given('the User logs in as {string}', {timeout:200000},async function (string) {

              await global.page.goto("https://dev2.neon.iqgeo.cloud/pre-uat/login");
              login = new LoginPage(global.page);
              await login.login("construction_director", "iqgeo");
          
         });

  

         Given('User goes to the {string} section', {timeout:4000000},async function (string) {

            index = new IndexPage(global.page);
          
            const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
            await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
            // Initialize the GigaPower class
            GigaPower = new gigapower(global.page);
            await GigaPower.handleNotificationDialog(global.page);
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
           
         });

  

         When('User switches to the {string} tab',{timeout:200000}, async function (string) {
           
            await GigaPower.clickApprovalTab();
         });

   
         When('User picks any ticket under the {string} tab',{timeout:200000}, async function (string) {
           
            await GigaPower.searchForItem('192377');
            await GigaPower.selectCheckbox();
        
         });

  

         When('User rejects the selected milestone with comments',{timeout:200000}, async function () {
           
            await GigaPower.clickText() ;
            await GigaPower.clickRejectButton();
            await GigaPower.clickCloseTab();
         });


         Then('User verifies the visibility of {string} and {string} in the Milestones tab with comments based on the Milestone ID',{timeout:200000}, async function (string, string2) {
          
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.searchAndExpandTicket('ATT-5417');
            
            await GigaPower.clickMilestoneTab();

            await GigaPower.searchMileId('192377');
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.clickMileID('192377');
            await global.page.waitForSelector('//h3[text()="Update"]', { state: 'visible' });
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
         });