        const { Given, When, Then } = require('@cucumber/cucumber');
        const { chromium } = require('@playwright/test');
        const { CommsApp } = require('../../../../pages/apps/mywcom.js');
        const { expect } = require('@playwright/test');
        const { LoginPage } = require('../../../../pages/login.js');
        const { StandardApp } = require('../../../../pages/apps/standard.js');
        const { gigapower } = require('../../../../pages/apps/gigaPower.js');
        const { Regression } = require('../../../../pages/apps/regression.js');
        const { IQGEO_USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials.js');
        
        const { IndexPage } = require('../../../../pages/index.js');
        const { arg } = require('../../../../base_lib/Input.js');
        const { performCanvasOperation } = require('../../../../pages/apps/utils');
        const { calculateNewPosition } = require('../../../../pages/apps/utils');
        const { clickOnCanvas } = require('../../../../pages/apps/utils');
       

        let login;
        let GigaPower;

        Given('User is successfully navigated to the Network Manager application',{ timeout: 600000 }, async function () {
         
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

  

         When('Click on Add object, select UUB\\(type:Handhole) and place it in existing design left to the pole\\(P4) created',{ timeout: 60000 }, async function () {
         await global.page.waitForLoadState('networkidle', { timeout: 6000 });
         await global.page.waitForTimeout(5000);
         await GigaPower.btnAddObject.click();
         await global.page.locator(`#${arg.objectId1}`).click();
            
         });

 

         When('Input all the provided details and click on create', { timeout: 60000 },async function () {
         
            

         await GigaPower.fillForm(arg.manHole1);
         await global.page.waitForTimeout(500);
        // const spec=await global.page.locator(`//span[@class='spec-edit-btn']`);
         //await spec.click();
         // await global.page.locator(`input[type='search'][class='text'][aria-controls='spec-grid-table']`).fill("HH30X60");
         // await global.page.locator(`//tr[@id='spec-grid-manhole_spec/HH30x60']`).click();
            
          await global.page.locator("(//div[contains(@class, 'ant-select-selector')])[1]").click();  // [2] = 2nd element
     await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='FP']").click();
          await global.page.locator("(//div[contains(@class, 'ant-select-selector')])[3]").click();  // [2] = 2nd element
     await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='85C']").click();
         await regression.selectDropdownOptionByIndex(page, 2, 'Yes');
         await global.page.waitForTimeout(5000);

         });

         Then('New UUB\\(U1-handole) should be created', { timeout: 60000 },async function () {
            
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

         // Store newPoleX6 and newPoleY6 in the shared context
         this.newPoleX6 = newPoleX6;
         this.newPoleY6 = newPoleY6;


         // Move the mouse to the calculated position and click to place UUB (U2)
         await global.page.mouse.move(newPoleX6, newPoleY6);
         await global.page.mouse.click(newPoleX6 ,newPoleY6);

         await global.page.waitForTimeout(5000);

         await regression.clickButtonSave();
      }
         await global.page.waitForTimeout(5000);
                     
            
         });

      Then('Create another UUB\\(U2) below the UUB\\(U1)',{ timeout: 60000}, async function () {

      const newPoleX6 = this.newPoleX6;
      const newPoleY6 = this.newPoleY6;

      if (newPoleX6 === undefined || newPoleY6 === undefined) {
         throw new Error("newPoleX6 and newPoleY6 are not defined. Ensure the previous step executed correctly.");
      }

      await GigaPower.btnAddObject.click();
      await global.page.locator(`#${arg.objectId1}`).click();

      await GigaPower.fillForm(arg.manHole);
      await global.page.waitForTimeout(500);

         
          await global.page.locator("(//div[contains(@class, 'ant-select-selector')])[1]").click();  // [2] = 2nd element
     await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='FP']").click();
          await global.page.locator("(//div[contains(@class, 'ant-select-selector')])[3]").click();  // [2] = 2nd element
     await global.page.locator("//div[contains(@class, 'ant-select-item-option-content') and text()='85C']").click();
         await regression.selectDropdownOptionByIndex(page, 2, 'Yes');
         await global.page.waitForTimeout(5000);
      
      await global.page.waitForTimeout(5000);

      const offsetY = 100; // Adjust this value to control the vertical distance between U1 and U2
      const u2PoleX = newPoleX6;
      const u2PoleY = newPoleY6 + offsetY;

      // Move the mouse to the calculated position and click to place UUB (U2)
      await global.page.mouse.move(u2PoleX, u2PoleY);
      await global.page.mouse.click(u2PoleX, u2PoleY);
      await global.page.waitForTimeout(5000);

      await regression.clickButtonSave();
      await global.page.waitForTimeout(5000);

  });
