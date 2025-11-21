         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium } = require('playwright');

         let browser;
         let page;
         Given('User Network Manager application', { timeout: 60000 },async function () {
           browser = await chromium.launch({ headless: false });
           const context = await browser.newContext();
           page = await context.newPage();
           await page.goto('http://localhost:8083/iqgeo');
         });

  

         When('User clicks on Comms application', { timeout: 60000 },async function () {
          await page.fill('input#login-user', 'admin');
          await page.fill('input#login-pass', '_mywWorld_');
          await page.click('#login-submission');
         });


         When('Clicks on logout button.', { timeout: 60000 },async function () {
          console.log("Test case passed");
          await browser.close();
         });
