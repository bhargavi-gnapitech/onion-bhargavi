  const { Given, When, Then } = require('@cucumber/cucumber');
  const { chromium } = require('@playwright/test');
  const { CommsApp } = require('../../../../pages/apps/mywcom.js');
  const { expect } = require('@playwright/test');
  const { LoginPage } = require('../../../../pages/login.js');
  const { StandardApp } = require('../../../../pages/apps/standard.js');
  const { gigapower } = require('../../../../pages/apps/gigaPower.js');
  const { Regression } = require('../../../../pages/apps/regression.js');
 
  const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
  const { BASE_URL } = require('../../../../base_lib/constants.js');
  const { IndexPage } = require('../../../../pages/index.js');
  const { arg } = require('../../../../base_lib/Input.js');


  let login;
  let GigaPower;
  let regression;

  Given('User should land on the Network Manager application',	{ timeout: 600000 }, async function () {
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login =  new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);

    index = new IndexPage(global.page);
      
    await index.openApplication(('att_network_manager.html'),{timeout:400000});

    GigaPower = new gigapower(global.page);
     regression = new Regression(global.page); 
     await regression.handleDialogClose();
    await global.page.waitForLoadState('networkidle', { timeout: 80000 });
    await global.page.check('input[type="checkbox"][id="deltas"][overlay_name="deltas"]');
    await global.page.waitForLoadState('networkidle', { timeout: 6000 });
    await GigaPower.searchAndSelectDesign('test_design_1');
    

  });



  When('Click on Add object, select pole and place it in existing design left to the cabinet created',{ timeout: 600000 }, async function () {

   await global.page.waitForLoadState('networkidle', { timeout: 6000 });
   await global.page.waitForTimeout(5000);
   await GigaPower.btnAddObject.click();
   await global.page.locator(`#${arg.objectId_pole}`).click();
  
  });



When('Input all the available details and click on create', { timeout: 60000 },async function () {

    await global.page.waitForLoadState('networkidle', { timeout: 6000 });
  

     // Locate the canvas
     const canvas = await global.page.locator('#map_canvas');

     // Get the canvas dimensions
     const boundingBox = await canvas.boundingBox();

     if (boundingBox) {
     const { x, y, width, height } = boundingBox;
     console.log(`Width: ${width}, Height: ${height}`);

     // Assume "Pole_1" is at a specific position on the canvas
     // For example: "Pole_1" is at 30% width and 50% height
     const pole1X = x+ (width * 0.3);
     const pole1Y = y+ (height * 0.5);

     // Calculate the new position (e.g., 50 pixels to the left of "Pole_1")
     const newPoleX = pole1X ; // Adjust the offset as needed
     const newPoleY = pole1Y-50; // Same vertical position as "Pole_1"

     // Calculate the new position (e.g., 70 pixels to the left of "Pole_2")
     const newPoleX1 = newPoleX+70 ; // Adjust the offset as needed
     const newPoleY1 = newPoleY; // Same vertical position as "Pole_1"

    // Move the mouse and click at the new position
     await global.page.mouse.move(newPoleX1, newPoleY1);
     await global.page.mouse.click(newPoleX1, newPoleY1);
}
+
     await GigaPower.designDetails('pole_4');
 		 // Locate the dropdown and select "Yes"
    
     await regression.selectDropdownOptionByIndex(page, 2, 'Yes');//Ground-->Yes 
    
    

  });



   Then('New pole\\(P1) should be created', { timeout: 60000 },async function () {
    await global.page.waitForLoadState('networkidle', { timeout: 6000 });
    await GigaPower.detailsTabBtnSave.click();
    await global.page.waitForTimeout(6000);
  });



   Then('Create three more poles\\(P2, P3, P4)',{ timeout: 600 }, async function () {
    
  });