 
         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium } = require('playwright');

         let browser;
         let page;
         Given('User is logged in Network Manager application',{ timeout: 60000 }, async function () {
           browser = await chromium.launch({ headless: true });
           const context = await browser.newContext();
           page = await context.newPage();
           await page.goto('https://dev2.neon.iqgeo.cloud/iqgeo_dev/login');
           await page.fill('input#login-user', 'sunaina');
           await page.fill('input#login-pass', 'iqgeo');
           await page.click('#login-submission');
         });

   

         When('User clicks on logout button.',{ timeout: 60000 }, async function () {
          await page.click('#logout-link');
         });