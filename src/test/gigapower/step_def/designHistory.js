
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { IQGEO_USERNAME,PASSWORD,PRE_UAT_URL,BASE_URL } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('the user is opened a Design', { timeout: 60000 },async function () {

    //await global.page.goto(PRE_UAT_URL);
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication(('att_network_manager.html'),{timeout:4000});
    regression = new Regression(global.page); 
    await regression.handleDialogClose();
    await global.page.waitForTimeout(5000);
    
    await regression.searchAndSelectDesign('test_conflict_check');//test_conflict_check
    await global.page.waitForTimeout(5000);
    await regression.clickOpenButton();
   
  });



  When('the user clicks the History link', { timeout: 60000 },async function () {

    await regression.performActionOnThirdElement(); 
    await global.page.waitForTimeout(5000);

  });


  Then('the app displays the Design History items in the left side panel',{ timeout: 60000 }, async function () {

    
    await regression.clickShowResultsGrid();
    await global.page.waitForTimeout(5000);
    // Assertion to check if the grid is visible
    const showGrid = await regression.gridVisible.isVisible();
    expect(showGrid).toBe(true);

    // Assertion to check if the records are displayed in the grid
    const gridCount = await regression.gridRows;
    expect(await gridCount.count()).toBeGreaterThan(0);

  });
