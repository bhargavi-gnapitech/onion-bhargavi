         const { Given, When, Then } = require('@cucumber/cucumber');
         const { chromium  } = require('playwright');
         const { expect } = require('@playwright/test');


         let browser;
         let page;

         When('the user clicks on the profile icon on the left side',{ timeout: 600000 }, async function () {
          browser = await chromium.launch({ headless: false });
          const context = await browser.newContext();
          page = await context.newPage();
          await page.goto('https://dev.onion.gnapitech.org/');
          await page.fill('input#username', 'bhargavi.tallapaneni@gnapi.tech');
          await page.fill('input#password', 'Nethra@12345');
          await page.click("#kc-login");
          await page.getByText('BV', { exact: true }).click({ force: true });

         });

   

         When('the user selects Settings option',{ timeout: 60000 }, async function () {
          await page.getByText('Settings', { exact: true }).click();

         });

   

         When('the user navigates to the Projects module',{ timeout: 60000 }, async function () {
           await page.getByText('Projects', { exact: true }).click();

         });


         When('the user clicks on Add Project button',{ timeout: 60000 }, async function () {
           await page.getByRole('button', { name: 'Add Project' }).click();

         });

 

         When('the user enters project name',{ timeout: 60000 }, async function () {
           await page.getByPlaceholder('Enter Project Name').fill('Automation');

         });


         When('the user enters project description',{ timeout: 60000 }, async function () {
           await page.locator('.tiptap.ProseMirror').click();
           await page.keyboard.type('This project is created for automation testing purpose.');

         });

   

         When('the user clicks on Save button',{ timeout: 60000 }, async function () {
          await page.getByRole('button', { name: 'Save' }).click();
          await page.waitForTimeout(5000); // Wait for 5 seconds to ensure project is created

         });

  

         Then('the project should be created successfully',{ timeout: 60000 }, async function () {
         //Assert/Validation for project tab to be visible after project creation
           const projectsHeader = page.locator('h5.MuiTypography-h5', { hasText: 'Projects' });
           await expect(projectsHeader).toBeVisible();
           console.log("✔ 'Projects' tab is visible after project creation");
         });