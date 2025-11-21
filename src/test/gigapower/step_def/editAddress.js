const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { IndexPage } = require('../../../../pages/index.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { expect } = require('@playwright/test');
const { USERNAME, PASSWORD , PRE_UAT_URL} = require('../../../../base_lib/credentials.js');

let login,regression;

  Given('User should log in as {string}',{ timeout: 600000 }, async function (string) {

     await global.page.goto(PRE_UAT_URL);
     login =  new LoginPage(global.page);
     await login.login(USERNAME, PASSWORD);
    
  });



  Given('User moves into the {string} section',{ timeout: 600000 }, async function (string) {

    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
    
  });



  Given('Overview tab opened',{ timeout: 600000 }, async function () {

    await global.page.waitForLoadState('networkidle', { timeout: 800000 });

     regression = new Regression(global.page); 
    await regression.handleDialogClose();

   
    await regression.clickProjectsTab();
    await global.page.waitForTimeout(5000);
    
  });



  When('User clicks on edit button on the address field', { timeout: 600000 },async function () {

    await regression.searchAndExpandTicket('ATT-5403');

    await regression.doubleClickOnTicket('ATT-5403');
   

    await global.page.waitForTimeout(5000);
    
  });



  When('A dialog appears and new address is input', { timeout: 6000},async function () {

    await regression.clickEditButton2();

    await global.page.waitForTimeout(5000);
    await regression.fillAddressDetails();

});



  When('Click  Ok button', { timeout: 60000 },async function () {

    await regression.clickOkButton();
    await global.page.waitForTimeout(5000);
    
  });



  Then('Address of the project is edited',{ timeout: 60000 }, async function () {
     //Assertion to Verify the Address of the Project is Updated or Not
    const addressElement = await global.page.locator('span#pd-overview-address:has-text("AL,HYD,HYD,134567")');
    expect(await addressElement.innerText()).toBe('AL,HYD,HYD,134567');
   
  });