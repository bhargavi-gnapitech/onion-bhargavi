         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium } = require('playwright');

         let browser;
         let page;
         Given('User Network Manager application', { timeout: 60000 },async function () {
           browser = await chromium.launch({ headless: false });
           const context = await browser.newContext();
           page = await context.newPage();
           await page.goto('https://dev2.neon.iqgeo.cloud/iqgeo_dev/login');
         });

  

         When('User clicks on Comms application', { timeout: 60000 },async function () {
          await page.fill('input#login-user', 'sunaina');
          await page.fill('input#login-pass', 'iqgeo');
          await page.click('#login-submission');
         });


         When('Clicks on logout button.', { timeout: 60000 },async function () {
          console.log("Test case passed");
          await browser.close();
         });
