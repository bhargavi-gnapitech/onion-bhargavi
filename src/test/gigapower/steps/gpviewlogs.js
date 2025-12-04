const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { LoginPage } = require('../../../../pages/login.js');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');

let page, browser,GigaPower,login;
         Given('user should be authenticated as {string}',{timeout:40000}, async function (string) {
            await global.page.goto("https://uat.neon.iqgeo.cloud");
            login = new LoginPage(global.page);
            await login.login("automation", "iqgeo");
            
         });

  

         When('User navigate to the Projects Tab and locates the Ticket Number and opens the Ticket to view its details',{timeout:400000}, async function () {
            GigaPower = new gigapower(global.page);
            await GigaPower.handleNotificationDialog(global.page);
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });

         });

   

         When('User clicks on the Milestone tab to switch to the milestone section', {timeout:400000}, async function () {
           
            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.searchAndExpandTicket('ATT-5197');
         });

  

         When('User clicks on the milestone row in MilestoneTab {string}',{timeout:400000},  async function (string) {
          
            
            await GigaPower.clickMilestoneTab();


         });

  

         Then('User should be able to see the View Logs Button in the UPDATE section',{timeout:400000},  async function () {
            
            await GigaPower.clickSelectMilestoneRow();

         });



         Then('after clicking on the View Logs Button, User can see details of the ERP submissions for the milestone',{timeout:400000},  async function () {
           
       
           await GigaPower.clickViewLogsButton(); 
         });