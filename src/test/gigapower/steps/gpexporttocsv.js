const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { LoginPage } = require('../../../../pages/login.js');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');
const fs = require('fs');
const csvParser = require('csv-parser');

let page, browser,GigaPower,login,readCsvHeading;

         Given('User should logged as {string}', { timeout: 120000 }, async function (string) {

            await global.page.goto("https://dev2.neon.iqgeo.cloud/pre-uat/login");
            login = new LoginPage(global.page);
            await login.login("construction_director", "iqgeo");
           
         });

   

         Given('User navigates into the {string} section', { timeout: 400000 }, async function (string) {
            
            index = new IndexPage(global.page);
          
            const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
            await global.page.waitForLoadState('networkidle', { timeout: 7000000 });

         });


         When('User navigates to the Projects Tab and locates the Ticket Number and opens the Ticket to view its details',{ timeout: 6000000 }, async function () {
           // Initialize the GigaPower class
            GigaPower = new gigapower(global.page);
            await GigaPower.handleNotificationDialog(global.page);

         });

   

         When('User clicks on the material request tab to switch into the material request section', {timeout:400000},async function () {

            await global.page.waitForLoadState('networkidle', { timeout: 60000 });
            await GigaPower.searchAndExpandTicket('ATT-6235');

         });

  

         When('After creating a new material request and adding the material request data in the material request tab, user selects the material request they wish to export as a CSV file', {timeout:400000},async function () {
             
             await GigaPower.clickMaterialRequestTab();

         });

  

         When('User clicks the {string} button',{timeout:400000}, async function (string) {

         await GigaPower.selectRow("17");

         });

   

         Then('User should be able to export the data list of the selected material request into a CSV file',{timeout:400000}, async function () {
            
          
          
         const download = await GigaPower.exportToCSV();
         const downloadPath = await download.path();
         console.log(`Download completed: ${downloadPath}`);
     
         // Parse and read CSV
         const csvFilePath = downloadPath;
         await new Promise((resolve, reject) => {
             fs.createReadStream(csvFilePath)
                 .pipe(csvParser())
                 .on('headers', (headers) => {
                     console.log('CSV Headers:', headers);
                     resolve();
                 })
                 .on('error', (err) => {
                     reject(err);
                 });
               });


      });