 
         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium } = require('playwright');

         let browser;
         let page;
         Given('User log in Network Manager application',{ timeout: 60000 }, async function () {
            browser = await chromium.launch({ headless: true });
            const context = await browser.newContext();
            page = await context.newPage();
            await page.goto('https://dev2.neon.iqgeo.cloud/iqgeo_dev/login');
         });

 

         When('User clicks on Construction Manager application',{ timeout: 60000 }, async function () {
           await page.fill('input#login-user', 'sunaina');
           await page.fill('input#login-pass', 'iqgeo');
           await page.click('#login-submission');
         });



         Then('Construction Manager application is loaded successfully.',{ timeout: 60000 }, async function () {
            await page.click("//a[@href='mywcm_manager.html']");
            console.log("Construction Manager application is loaded successfully.");
            await browser.close();
         });
