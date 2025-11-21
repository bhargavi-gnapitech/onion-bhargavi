
const { Given, When, Then } = require('@cucumber/cucumber');                                
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');    
const { Regression } = require('../../../../pages/apps/regression.js');
const { expect } = require('@playwright/test');
const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
let login;
let regression;
  Given('the user enters the Design screen', {timeout:400000},async function () {
   // Write code here that turns the phrase above into concrete actions
       const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
       await global.page.goto(BASE_URL);
       login =  new LoginPage(global.page);
       await login.login(IQGEO_USERNAME, PASSWORD);
       index = new IndexPage(global.page);
       await index.openApplication(('att_network_manager.html'),{timeout:4000});
       regression = new Regression(global.page); 
       await regression.handleDialogClose();
       await global.page.waitForTimeout(5000);
  });



  When('the user clicks the Import button',{timeout:400000}, async function () {
    await regression.searchAndSelectDesign('test_234');
    await global.page.waitForTimeout(5000);
    await regression.clickOpenButton();
    await regression.expandToolbar();
    await global.page.locator(`//li[@title="Import data"]`).click();
    await global.page.waitForTimeout(5000);
  });



  Then('the app displays Drop Zip File Here and the user drops a CDIF zip file in the dialog',{timeout:40000}, async function () {

    const locator = await global.page.locator("//div[text()='Drop zip file here (or click to browse)']");
    await locator.click({force:true});
    await global.page.waitForTimeout(5000);

  });



  Then('the app enables the Preview, Import buttons and the user clicks the Import button',{timeout:40000}, async function () {
   
     // Upload file directly using setInputFiles on the hidden input
     const fileInput = global.page.locator('input[type="file"][name="file"]');
     await fileInput.setInputFiles("C:\\Users\\BhargaviTallapaneni\\GW_LOC_CHANGE2_CDIF.Mar-10-2025_15-28-54 (1).zip");
     await global.page.waitForTimeout(5000);
    
  });



  Then('the app imports the CDIF design data',{timeout:40000}, async function () {
    
    await global.page.locator(`//button[text()='Import']`).click({force:true});
    await global.page.waitForTimeout(5000);
    // Wait for the success message to appear for Assertion
    const successMessage = global.page.locator('text=Import Complete');
    await expect(successMessage).toBeVisible({ timeout: 10000 })
    
  });
  
