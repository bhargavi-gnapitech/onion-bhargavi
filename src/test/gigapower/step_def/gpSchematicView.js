  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;

  Given('the Network Manager application is launched', { timeout: 600000 },async function () {
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



  When('User selects a feature\\(cabinet, building, pole, etc) onto the map',{ timeout: 600000 }, async function () {
    await regression.clickOnFeature( 33.3102015348764,-111.85959757675741 );  //Building Coordinates[33.310184186559056,-111.85932748582438(UUB coordinates)]
    await global.page.waitForTimeout(5000);
  });


  When('clicks on Schematic view',{ timeout: 600000 }, async function () {
    await global.page.waitForSelector(`//li[@title="Schematic view"]`);
    await global.page.locator(`//li[@title="Schematic view"]`).click();
    await global.page.waitForTimeout(5000);
  });



  Then('User is able to view the schematic design of selected feature',{ timeout: 600000 }, async function () {
    //Screenshot to check Schematic View Network displayed 
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await global.page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });
  });