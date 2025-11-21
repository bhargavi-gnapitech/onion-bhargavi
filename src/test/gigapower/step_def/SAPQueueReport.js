
     const { Given, When, Then } = require('@cucumber/cucumber');
     const { LoginPage } = require('../../../../pages/login.js');
     const { IndexPage } = require('../../../../pages/index.js');
     const { Regression } = require('../../../../pages/apps/regression.js');
    
     const { IQGEO_USERNAME, PASSWORD,PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
     const { REPORTS, FORMAT } = require('../../../../base_lib/Reports.js');
     const { expect } = require('@playwright/test');
     let login;
     let regression;

  Given('the {string} user has successfully authenticated',{ timeout: 60000 }, async function (string) {
     await global.page.goto(PRE_UAT_URL);
     login =  new LoginPage(global.page);
     await login.login(IQGEO_USERNAME, PASSWORD);
  });



  When('the user opens the {string} panel',{ timeout: 60000 }, async function (string) {
     index = new IndexPage(global.page);
     await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user switches to the {string} mode',{ timeout: 60000 }, async function (string) {
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
     await regression.clickSettingsTab();
  });

  When('chooses the desired report from the dropdown',{ timeout: 60000 }, async function () {
    
     await regression.selectReportTypeOption(REPORTS.ERP_REPORT);
  });



  When('specifies the report format as CSV or PDF', { timeout: 60000 },async function () {
     await regression.selectFormatOption(FORMAT.PDF);
  });



  When('populates the mandatory fields and executes {string}',{ timeout: 60000 }, async function (string) {

     await regression.fillDateAndTimezone();
     await regression.clickRunReportButton();
    
  });



  Then('the report is generated and saved in the chosen format',{ timeout: 60000 }, async function () {
   
     //Screenshot to validate whether report is generated or not
     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
     await page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });
  });