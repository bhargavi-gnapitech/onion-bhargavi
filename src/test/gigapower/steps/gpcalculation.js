
const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium ,expect} = require('@playwright/test');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');
const { LoginPage } = require('../../../../pages/login.js');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { IndexPage } = require('../../../../pages/index.js');

let page, browser,GigaPower,login;

  Given('User is logged as {string}', {timeout:200000},async function (string) {
   
    
    await global.page.goto("https://dev2.neon.iqgeo.cloud/pre-uat/login");
    login = new LoginPage(global.page);
    await login.login("construction_director", "iqgeo");
   

  });

 Given('User navigates into {string} section',{timeout:4000000}, async function (string) {
    index = new IndexPage(global.page);
          
    const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
    await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
    // Initialize the GigaPower class
    GigaPower = new gigapower(global.page);
    await GigaPower.handleNotificationDialog(global.page);
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
  });

 When('User navigates to the Projects Tab and locates the Ticket Number', {timeout:400000},async function () {
    
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    await GigaPower.searchAndExpandTicket('ATT-5009');
  });

 Then('Click on the Payments Tab and click on the milestone',{timeout:200000}, async function () {

    await GigaPower.clickPaymentsTab();  
    await global.page.waitForLoadState('networkidle', { timeout: 60000 });
    await GigaPower.clickMilestone();  
     
  
  });

 When('User calculates the equation \\(Total = \\(unit price * quantity) + sales tax)',{timeout:2000000}, async function () {

      await GigaPower.scrollToInvoiceRequestDataHeader(); 

      // Extract Com Qty value from input element
      const comQtyElement = await global.page.locator('input.ant-input-number-input');
      const comQty = parseFloat(await comQtyElement.inputValue());
       
  
      // Extract Unit Price from another input element
      const unitPriceElement = await global.page.locator(`(//input[@class='ant-input' and @type='number'])[1]`);
      const unitPrice = parseFloat(await unitPriceElement.inputValue());
      
  
      // Extract Sales Tax from input element
      const salesTaxElement = await global.page.locator(`(//input[@class='ant-input' and @type='number'])[2]`);
      const salesTax = parseFloat(await salesTaxElement.inputValue());
       
  
      // Extract Total from a div element (use textContent() instead of inputValue())
      const totalElement = await global.page.locator(`//td[contains(@class, 'ant-table-cell')]//div[starts-with(text(), '$')]`);
      
      const totalText = await totalElement.textContent(); // Await the promise
      const totalDisplayed = parseFloat(totalText.replace(/[\$,]/g, '')); // Remove "$" and commas and convert to number
      
  
      // Perform the calculation
      const calculatedTotal = (comQty * unitPrice) + salesTax;
  
      console.log(`Com Qty: ${comQty}, Unit Price: ${unitPrice}, Sales Tax: ${salesTax}, Calculated Total: ${calculatedTotal}, Total Displayed: ${totalDisplayed}`);

      // Validate that calculated total matches displayed total
      expect(calculatedTotal).toBe(totalDisplayed, 'The calculated total matches the displayed total.');
  

  });

 Then('User validates the equation based on the given details in the UI',{timeout:2000000}, async function () {

   const screenshot = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });

  });