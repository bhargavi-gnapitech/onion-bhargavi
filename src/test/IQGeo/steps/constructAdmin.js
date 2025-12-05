
         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium } = require('playwright');

         let browser;
         let page;
         Given('User was logged in Network Manager application',{ timeout: 60000 }, async function () {
           browser = await chromium.launch({ headless: true });
           const context = await browser.newContext();
           page = await context.newPage();
           await page.goto('https://dev2.neon.iqgeo.cloud/iqgeo_dev/login');
         });

  

         When('User clicks on Construction Admin application', { timeout: 60000 },async function () {
           await page.fill('input#login-user', 'sunaina');
           await page.fill('input#login-pass', 'iqgeo');
           await page.click('#login-submission');
         });

   

         Then('Construction Admin application is loaded successfully.',{ timeout: 60000 }, async function () {
            await page.click("//a[@href='mywcm_admin.html']");
            console.log("Construction Admin application is loaded successfully.");
            await browser.close();
         });