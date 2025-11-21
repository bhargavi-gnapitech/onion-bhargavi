const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { CommsApp } = require('../../../../pages/apps/mywcom');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../../pages/login');
const { StandardApp } = require('../../../../pages/apps/standard');
const { gigapower } = require('../../../../pages/apps/gigaPower');

const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');
const { BASE_URL } = require('../../../../base_lib/constants');


let page, browser,GigaPower,login;

 Given('the user has signed in as {string}', { timeout: 120000 }, async function (username) {
  await global.page.goto("https://uat.neon.iqgeo.cloud",{ timeout: 60000 });
    login = new LoginPage(global.page);
    await login.login("automation", "iqgeo");

});

 Given('the user is access the {string} section', { timeout: 400000 }, async function (section) {
  index = new IndexPage(global.page);
          
    const adminLink = await index.openApplication(('mywcm_admin.html'),{timeout:400000});
    await global.page.waitForLoadState('networkidle', { timeout: 7000000 });
    // Initialize the GigaPower class
    GigaPower = new gigapower(global.page);
    await GigaPower.handleNotificationDialog(global.page);
    await global.page.waitForLoadState('networkidle', { timeout: 600000 });
    
});


  
 

When('User searches for {string} in the search field', { timeout: 400000}, async function (searchTerm) {

  await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

  await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();

 await global.page.waitForSelector("//input[@id='text-search' and contains(@class, 'rounded20')]", { timeout: 120000 });
  
  // Fill in the search term
  await global.page.fill("//input[@id='text-search' and contains(@class, 'rounded20')]", "Cabinet");

});

When('User clicks on the cabinet and selects {string}', { timeout: 120000 }, async function (selection) {
  
  await global.page.press("//input[@id='text-search']", 'Enter');

  await global.page.waitForLoadState('networkidle', { timeout: 60000 });

 
});


 Then('Cabinets are displayed', {timeout:200000},async function () {

  await global.page.waitForSelector('.sub-menu-indicator', { timeout: 1200000 });

  // Click on the menu
  const menu = await global.page.locator('.sub-menu-indicator');
  await menu.click();

  await global.page.waitForLoadState('networkidle', { timeout: 60000 });

  const all = await global.page.waitForSelector('//span[@class="suggestion-item-label" and text()="All"]');

  await all.click();

});

Then('User clicks on any one cabinet', {timeout:12000},async function () {
const cabi= await global.page.waitForSelector(`//div[@class='result-title' and @title='Show details' and text()='Cabinet: S 300 Century Dr']`);
await cabi.click();
 
});

 When('User right-clicks on the cabinet and selects the {string} option', {timeout:500000000},async function (option) {

  const cabinet = await global.page.locator(`//a[@id="cabinet/6868_anchor"]`);

  await global.page.waitForLoadState('networkidle', { timeout: 60000 });
 
  // Scroll into view only for this specific cabinet
  await cabinet.scrollIntoViewIfNeeded();
  await global.page.waitForLoadState('networkidle', { timeout: 60000 });


  // Wait for the element to be visible
  await cabinet.waitFor({ state: 'visible', timeout: 20000 });

  
  // Right-click on the specific cabinet element
  await cabinet.click({ button: 'right' });
  await global.page.waitForLoadState('networkidle', { timeout: 60000 });


  // Select the desired option from the context menu
  const element = await global.page.locator('//a[@rel="11" and contains(text(), "Fiber Testing Report")]');



  // Example interaction: clicking the element
  await element.click();

  await global.page.waitForSelector('//h3[text()="Fiber Testing Report"]', { timeout: 500000000 });
  await global.page.waitForLoadState('networkidle', { timeout: 60000 });

  
});

Then('User selects the download option for the required formats:',{timeout:400000}, async function (dataTable) {

  
  await global.page.waitForSelector('//h3[text()="Fiber Testing Report"]', { timeout: 500000000 });
  await global.page.waitForLoadState('networkidle', { timeout: 60000 });
  
 // await  GigaPower.clickDownloadButton();
  const downloadButton = await global.page.locator('button.primary-btn[value="{:download}"]');
  await downloadButton.click();
  
  const screenshot3 = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });

  

// Get the locator for the <select> element
const selectLocator = global.page.locator('#format_item');

// Select the "html" option from the dropdown
await selectLocator.selectOption({ label: 'html' });


//await  GigaPower.clickDownloadButton();
const downloadButton1 = await global.page.locator('button.primary-btn[value="{:download}"]');
await downloadButton1.click();


const screenshot = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });



// Get the locator for the <select> element
const selectLocator1 = global.page.locator('#format_item');

// Select the "html" option from the dropdown
await selectLocator1.selectOption({ label: 'xlsx' });
const downloadButton2 = await global.page.locator('button.primary-btn[value="{:download}"]');
await downloadButton2.click();


const screenshot1 = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });

 

  // Get the locator for the <select> element
 const selectLocator2 = global.page.locator('#format_item');
  
  // Select the "html" option from the dropdown
  await selectLocator2.selectOption({ label: 'csv' });
  
  // Optionally, if you need to click the download button afterward
  const downloadButton3 = await global.page.locator('button.primary-btn[value="{:download}"]');
  await downloadButton3.click();

  const screenshot2 = await global.page.screenshot({ path: `src/test/screenshots/closePage_${Date.now()}.png` });
  
});
