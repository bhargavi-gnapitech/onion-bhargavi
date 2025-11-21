const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { expect } = require('@playwright/test');
const { PRE_UAT_URL} = require('../../../../base_lib/credentials.js');



  Given('User should Open the {string}',{ timeout: 600000 }, async function (string) {
      await global.page.goto(PRE_UAT_URL);
         

  });



  When('User inputs invalid {string} or {string}',{ timeout: 600000 }, async function (string, string2) {

    login = new LoginPage(global.page);
    await login.login("username", "iqgeo");
    
  });



  When('Clicks on Login button',{ timeout: 600000 },  async function () {
   

    const expectedUrl = 'https://dev2.neon.iqgeo.cloud/pre_uat_72/mywcm_contractor.html';
    const currentUrl = await global.page.url();
    
    // Assert that the current URL matches the expected URL
        
    expect(currentUrl).not.toBe(expectedUrl);
    //console.log("✅ User successfully navigated to the landing page:", currentUrl);
    await global.page.waitForTimeout(5000);
    

  
   
  });



  Then('App should display a username or password is invalid error message',{ timeout: 6000 },  async function () {
    
   // Locate the error message element by ID and assert its text content
   const errorMessage = await page.locator('#login_message');
   await expect(errorMessage).toHaveText('Invalid credentials or not an authorised user');

  });