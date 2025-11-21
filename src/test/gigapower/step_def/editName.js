const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login.js');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { IndexPage } = require('../../../../pages/index.js');
const { Regression } = require('../../../../pages/apps/regression.js');
const { USERNAME, PASSWORD , PRE_UAT_URL} = require('../../../../base_lib/credentials.js');
const { expect } = require('@playwright/test');
let login,GigaPower,regression;

  Given('User should logged in as {string}', { timeout: 600000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(USERNAME, PASSWORD);
    
   
  });



  Given('User moves to the {string} section', { timeout: 600000 },async function (string) {

    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});

    
  });



  Given('Overview tab is open', { timeout: 600000 }, async function () {

  await global.page.waitForLoadState('networkidle', { timeout: 800000 });

   regression = new Regression(global.page); 
  await regression.handleDialogClose();
 
  await regression.clickProjectsTab();
  await global.page.waitForTimeout(5000);
     
  });



  When('User clicks on edit button on the name field', { timeout: 600000 },async function () {
    await regression.searchAndExpandTicket('ATT-5403');
   
    await regression.doubleClickOnTicket('ATT-5403');

    await global.page.waitForTimeout(5000);
    

});



  When('A dialog appears and new name is input',{ timeout: 6000 }, async function () {

    await regression.clickEditButton1();

    await global.page.waitForTimeout(5000);

    await regression.fillProjectName();


  
  });



  When('Click on Ok button',{ timeout: 60000 }, async function () {

    await regression.clickOkButton();
    await global.page.waitForTimeout(5000);



   
  });



  Then('Name of the project is edited', { timeout: 6000},async function () {
    //Assertion to Verify the Name of the Project is Updated or Not
    const nameElement = await global.page.locator('#pd-overview-name');
    expect(await nameElement.innerText()).toBe('TEST123');

    
  });