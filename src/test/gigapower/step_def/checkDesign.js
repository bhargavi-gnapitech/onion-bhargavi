
  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { expect } = require('@playwright/test');
  const { PRE_UAT_URL , IQGEO_USERNAME,PASSWORD } = require('../../../../base_lib/credentials.js');
  let login;
  let regression;
  Given('the user has opened a Design',{ timeout: 600000 }, async function () {
      // await global.page.goto(PRE_UAT_URL);
      const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
      await global.page.goto(BASE_URL);
      login =  new LoginPage(global.page);
      await login.login(IQGEO_USERNAME, PASSWORD);
      index = new IndexPage(global.page);
      await index.openApplication(('att_network_manager.html'),{timeout:4000});
      regression = new Regression(global.page); 
      await regression.handleDialogClose();
      await regression.searchAndSelectDesign('test_conflict_check');
      await global.page.waitForTimeout(5000);
      await regression.clickOpenButton();
  });



  When('the user clicks the Check Design button',{ timeout: 60000 }, async function () {

        await regression.expandToolbar();

  });



  When('the Check Design dialog opens and the user selects the Conflicts and Design Rules options',{ timeout: 60000 }, async function () {

        await regression.clickCheckDesign();

        
  });



  When('the user selects the Start button',{ timeout: 60000 }, async function () {

        await regression.clickStartButton();
        await global.page.waitForTimeout(5000);

  });



  Then('The app runs the design checks and displays the issues',{ timeout: 60000}, async function () {
      // Assert that the 'Start' button is disabled after clicking
      const isDisabled = await regression.startButton.isDisabled();
      if (!isDisabled) {
          throw new Error('The Start button is not clicked thats why it is Enable still');
      } else {
          console.log('The Start button is disabled as expected.');
      }
      await global.page.waitForTimeout(5000);
  });