
        const { Given, When, Then } = require('@cucumber/cucumber');                                
        const { LoginPage } = require('../../../../pages/login.js');
        const { IndexPage } = require('../../../../pages/index.js');    
        const { Regression } = require('../../../../pages/apps/regression.js');
        const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
        const { gigapower } = require('../../../../pages/apps/gigaPower');
        let login;
        let regression,GigaPower;
         Given('the user has opened the Network Manager application',{timeout:400000}, async function () {
           const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
           await global.page.goto(BASE_URL);
           login = new LoginPage(global.page);
           await login.login(IQGEO_USERNAME, PASSWORD);
           index = new IndexPage(global.page);
           await index.openApplication('att_network_manager.html', { timeout: 4000 });
           regression = new Regression(global.page);
           await regression.handleDialogClose();
           await global.page.waitForTimeout(5000);
         });

  

         When('User clicks on the Add and manage bookmarks button',{timeout:400000}, async function () {
            GigaPower = new gigapower(global.page);
            await GigaPower.btnAddAndMangeBookmark.click();
            
         });

 

         When('clicks on Manage bookmarks button and selects the bookmark to be opened',{timeout:40000}, async function () {

            await GigaPower.bookmarkTabButtons('Manage bookmarks');
           
         });

  

         When('clicks on Go to button', {timeout:40000},async function () {

            GigaPower.openExistingBookmark('test');
		    await page.waitForLoadState('networkidle', { timeout: 60000 });

         });

 

         Then('Saved bookmark area is opened on the map',{timeout:40000}, async function () {

            await GigaPower.btnCloseMangeBookmark.click();
            await global.page.waitForTimeout(5000);
            console.log(' Selected Bookmark should be opened ,close the tab ');
         });