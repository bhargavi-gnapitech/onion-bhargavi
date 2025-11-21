const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { LoginPage } = require('../../../../pages/login.js');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');

let page, browser,GigaPower,login;

Given('User authenticated in as {string}', { timeout: 120000 }, async function (username) {
  
  await global.page.goto("https://dev2.neon.iqgeo.cloud/pre-uat/login");
  login = new LoginPage(global.page);
  await login.login("construction_director", "iqgeo");
   await global.page.waitForLoadState('networkidle', { timeout: 90000 });
  
});



Given('User enters to the {string} section', { timeout: 4000000 }, async function (section) {
  index = new IndexPage(global.page);
          
  const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
  await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
  

  // Initialize the GigaPower class
  GigaPower = new gigapower(global.page);
  await GigaPower.handleNotificationDialog(global.page);
  await global.page.waitForLoadState('networkidle', { timeout: 60000 });

});


 When('User navigates to the Projects Tab and locates the Ticket Number to view the ticket details',{ timeout: 6000000 }, async function () {

  await global.page.waitForLoadState('networkidle', { timeout: 60000 });
  await GigaPower.searchAndExpandTicket('ATT-5009');

});

       
Then('User navigates on Overview Tab ,there is an edit icon next to the name that allows for editing the project name', {timeout:200000},async function () {
   
 
   await GigaPower.clickEditButton(); // Call the method to click the edit button
    
  
});

   
 When('User edits the project name', {timeout:120000}, async function () {

 

        await GigaPower.fillProjectName('XYZ123'); // Call the method to fill in the project name
        await global.page.waitForLoadState('networkidle', { timeout: 60000 });

    });


   

Then('Without refreshing the page, when the User clicks the close button \\(cross mark), reopening the project displays the updated project name', {timeout:20000}, async function () {
    


    await GigaPower.clickButton(); // Call the method to click the OK button
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    const screenshot = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });

});


   

When('User tries to save the project name without filling it in \\(i.e., the field is empty)', {timeout:20000},async function () {
    
 

  await GigaPower.clickEditButton(); // Click the edit button again
  await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    
});

   

Then('An error message is shown indicating that the project name cannot be empty', {timeout:20000}, async function () {



    await GigaPower.fillProjectName(''); // Clear the input
    await GigaPower.clickButton(); // Attempt to click the OK button
  
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    const screenshot = await global.page.screenshot({ path: `src/test/screenshots/error_${Date.now()}.png` });
});

