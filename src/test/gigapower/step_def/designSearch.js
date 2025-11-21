  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { IQGEO_USERNAME, PASSWORD ,PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the User should logged in as {string}', { timeout: 60000 },async function (string) {
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
   // await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
  });



  When('the user clicks on the {string} application', { timeout: 60000 },async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
  });



  When('the design name is typed into the search field', { timeout: 60000 },async function () {
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await global.page.waitForTimeout(5000);
  });


  When('the user clicks on the design to open it', { timeout: 60000 },async function () {
    
    await regression.searchAndSelectDesign('test_234');
    await global.page.waitForTimeout(5000);
  });



  Then('the selected design is displayed and highlighted on the map',{ timeout: 60000 }, async function () {

      //  Assertion to validate the Design Name 
    await regression.clickOpenButton();
    const designNameElement = await regression.designNameElement;
    const designNameText = await designNameElement.textContent(); // Extract the text content
    expect(designNameText.trim()).toBe('Design:  test_234'); 


  });