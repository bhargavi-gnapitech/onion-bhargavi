const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { gigapower } = require('../../../../pages/apps/gigaPower'); // 
const { USERNAME, PASSWORD, PRE_UAT_URL } =
  require('../../../../base_lib/credentials');

let login;
let index;
let GigaPower; // 


// ================= GIVEN =================
Given('User is logged into Giga Power', { timeout: 300000 }, async function () {

  await global.page.goto(PRE_UAT_URL);

  login = new LoginPage(global.page);
  await login.login(USERNAME, PASSWORD);

  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

});


// ================= WHEN =================
When(
'User clicks on map icon at the bottom of the UI',
{ timeout: 600000 },
async function () {

 
  index = new IndexPage(global.page);
  await index.openApplication('testapp.html');

  
  await global.page.waitForLoadState('networkidle', {
    timeout: 300000
  });

  await global.page.waitForTimeout(8000);

 
  GigaPower = new gigapower(global.page);

  
  await GigaPower.btnAddObject.waitFor({ state: 'visible' });
  await GigaPower.btnAddObject.click();

  console.log(" Add Object clicked");
});


// ================= THEN =================
Then('Network manager application should be launched', { timeout: 300000 }, async function () 
{

  const mapCanvas = global.page.locator('canvas, .map, #map');

  await expect(mapCanvas.first()).toBeVisible({
    timeout: 180000
  });

  console.log("Map launched successfully");
});
