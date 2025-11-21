const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');
const { expect } = require('@playwright/test');
const { USERNAME,PASSWORD ,PRE_UAT_URL} = require('../../../../base_lib/credentials.js');

  Given('User Opens the {string}', { timeout: 6000 },async function (string) {

    await global.page.goto(PRE_UAT_URL);
   

  });



  When('User inputs valid {string} and {string}',{ timeout: 60000 }, async function (string, string2) {
    
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);

  });



  When('Click on Login',{ timeout: 600000 }, async function () {
   
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_contractor.html'),{timeout:4000});

   

  });



  Then('User should be navigated to Landing page',{ timeout: 6000 }, async function () {

    const expectedUrl = 'https://dev2.neon.iqgeo.cloud/pre_uat_72/mywcm_contractor.html';
    const currentUrl = await global.page.url();

    // Assert that the current URL matches the expected URL
    
    expect(currentUrl).toBe(expectedUrl);
    console.log("✅ User successfully navigated to the landing page:", currentUrl);
    await global.page.waitForTimeout(5000);
   
    
    
  });