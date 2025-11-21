const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { LoginPage } = require('../../../../pages/login.js');
const { IndexPage } = require('../../../../pages/index.js');

let page, browser,GigaPower,login;

  Given('User is authenticate as {string}',{timeout:200000}, async function (string) {

    await global.page.goto("https://dev2.neon.iqgeo.cloud/pre-uat/login");
    login = new LoginPage(global.page);
    await login.login("construction_director", "iqgeo");
  
  });



  Given('User moves into {string} section',{timeout:4000000}, async function (string) {

    index = new IndexPage(global.page);
          
    const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
    await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
    // Initialize the GigaPower class
    GigaPower = new gigapower(global.page);
    await GigaPower.handleNotificationDialog(global.page);
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    
  });



  When('User navigate to the {string} tab', {timeout:20000000},async function (string) {

   await GigaPower.clickApprovalTab();
    
   
    
  });



  When('User select any ticket under the {string} tab', {timeout:200000},async function (string) {

    await GigaPower.searchForItem('194185');
    await GigaPower.selectCheckbox();

   
    
  });



  When('User approves the selected milestone with no comments', {timeout:200000},async function () {

 
   await GigaPower. clickApproveButton();
   await GigaPower.clickCloseTab();

  
  
  });



  Then('User check the visibility of {string} and {string} in the Milestones tab with no comments based on the Milestone ID',{timeout:200000}, async function (string, string2) {
   
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    await GigaPower.searchAndExpandTicket('ATT-5462');
    
    await GigaPower.clickMilestoneTab();  //ORL001-Apopoka//expand2

    await GigaPower.searchMileId('194185');
    await GigaPower.clickMileID('194185');
    await global.page.waitForSelector('//h3[text()="Update"]', { state: 'visible' });

     });