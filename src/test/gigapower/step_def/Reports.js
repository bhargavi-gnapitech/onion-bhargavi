  const { Given, When, Then } = require('@cucumber/cucumber');
  const { LoginPage } = require('../../../../pages/login.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
  const { IQGEO_USERNAME, PASSWORD,PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
 
  const { REPORTS, FORMAT } = require('../../../../base_lib/Reports.js');
  const { expect } = require('@playwright/test');
  let login;
  let regression;
  
  Given('the user {string} is logged in',{ timeout: 60000 }, async function (string) {
    await global.page.goto(PRE_UAT_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
  });

  When('the user enters the {string} dashboard', { timeout: 60000 },async function (string) {
    index = new IndexPage(global.page);
    await index.openApplication(('mywcm_admin.html'),{timeout:4000});
  });



  When('the user switch to the {string} interface',{ timeout: 60000 }, async function (string) {
    regression = new Regression(global.page); 
    await regression.handleDialogClose(); 
    await regression.clickSettingsTab();
    
  });

  When('Select the report required from dropdown',{ timeout: 60000 }, async function () {
   
    await regression.selectReportTypeOption(REPORTS.PROJECT_REPORT);
  });



  When('Select the report format\\(csv\\/pdf)',{ timeout: 60000 }, async function () {
    
    await regression.selectFormatOption(FORMAT.CSV);
    
  });



  When('Fill in required fields and click on button Run Report',{ timeout: 60000 }, async function () {

    await regression.clickRunReportButton(); 
    await global.page.waitForTimeout(5000);

  });



  Then('Report is downloaded in selected format',{ timeout: 60000 }, async function () {
    //Screenshot to validate whether report is generated or not
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `F:/repos/onion/src/test/screenshots-${timestamp}.png` });

  });