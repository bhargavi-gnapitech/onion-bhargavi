
 const { Given, When, Then } = require('@cucumber/cucumber');

 const { CommsApp } = require('../../../../pages/apps/mywcom.js');
 
 const { LoginPage } = require('../../../../pages/login.js');
 const { StandardApp } = require('../../../../pages/apps/standard.js');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
 const { Regression } = require('../../../../pages/apps/regression.js');
 const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
 const { IndexPage } = require('../../../../pages/index.js');
 const { arg } = require('../../../../base_lib/Input.js');
 
 let login;
 let GigaPower;
 

  Given('User is on the Network manager application',{ timeout: 600000 }, async function () {

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


  When('Click on Add object, select Building\\(B1) and place it in existing design below handhole\\(U2) created',{ timeout: 600000 }, async function () {
   
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    await global.page.waitForTimeout(5000);
    await GigaPower.btnAddObject.click();
    await global.page.locator(`#${arg.objectId2}`).click();
  });



  When('Input all required details and click on create',{ timeout: 60000 }, async function () {

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

        // Calculate the new position (e.g., 50 pixels to the left of "Pole_3")
    const newPoleX2 = newPoleX1+50 ; // Adjust the offset as needed
    const newPoleY2 = newPoleY1; // Same vertical position as "Pole_1"

        // Calculate the new position (e.g., 50 pixels to the left of "Pole_4")
    const newPoleX3 = newPoleX2+50 ; // Adjust the offset as needed
    const newPoleY3 = newPoleY2; // Same vertical position as "Pole_1"

          // Calculate the new position (e.g., 70 pixels to the left of "Pole_1")
    const newPoleX4 = newPoleX3+70 ; // Adjust the offset as needed
    const newPoleY4 = newPoleY3; // Same vertical position as "Pole_1"
              // Calculate the new position (e.g., 50 pixels to the left of "Pole_1")
    const newPoleX5 = newPoleX4+70 ; // Adjust the offset as needed
    const newPoleY5 = newPoleY4; 

   const newPoleX6 = newPoleX1-70 ; // Adjust the offset as needed
   const newPoleY6 = newPoleY1; 

   const offsetY = 100; // Adjust this value to control the vertical distance between U1 and U2
   const u2PoleX = newPoleX6;
   const u2PoleY = newPoleY6 + offsetY;
   await global.page.waitForTimeout(500);

   const offsetX = 70; // Adjust this value to control the vertical distance between U1 and U2
   const u2PoleX1 = u2PoleX;
   const u2PoleY1 = u2PoleY + offsetX;

   // Move the mouse to the calculated position and click to place UUB (U2)
   await global.page.mouse.move(u2PoleX1, u2PoleY1);
   await global.page.mouse.click(u2PoleX1, u2PoleY1);
   await global.page.waitForTimeout(5000);
    }
});

  Then('New Building\\(B1)  should be created', { timeout: 60000 },async function () {
    await GigaPower.fillForm(arg.building);
    await global.page.locator("(//div[contains(@class, 'ant-select-selector')])[1]").click();  // [2] = 2nd element
    await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='AOP-CO']").click();
    await global.page.waitForTimeout(5000);
    await regression.clickButtonSave();
    await global.page.waitForTimeout(5000);
});
