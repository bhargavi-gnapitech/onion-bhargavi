 
         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium } = require('playwright');

         let browser;
         let page;
         When('the user enters valid username',{ timeout: 60000 }, async function () {
            browser = await chromium.launch({ headless: true });
            const context = await browser.newContext();
            page = await context.newPage();
            await page.goto('https://dev.onion.gnapitech.org/');
         });

   

         When('the user enters valid password',{ timeout: 60000 }, async function () {
            await page.fill('input#username', 'bhargavi.tallapaneni@gnapi.tech');
            await page.fill('input#password', 'Nethra@12345');
         });

  

         When('the user clicks on the Login button',{ timeout: 60000 }, async function () {
            await page.click("#kc-login");
           
         });

  

         Then('the user should be navigated to the Dashboard page',{ timeout: 60000 }, async function () {
            //Assertion can be added here to verify successful login
            console.log("Login Successful , successfully navigated to dashboard page");
         });