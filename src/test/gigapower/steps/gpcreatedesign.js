const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const { LoginPage } = require('../../../../pages/login');
const { IndexPage } = require('../../../../pages/index');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { arg } = require('../../../../base_lib/Input');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../../../base_lib/credentials');

let login;
let index;
let GigaPower;


// ================= @gpcreatedesign =================

// Step 1: Login and open test app
Given('User is logged in and opens the Network Manager', { timeout: 300000 }, async function () {

  await global.page.goto(PRE_UAT_URL);

  login = new LoginPage(global.page);
  await login.login(USERNAME, PASSWORD);
  await global.page.waitForLoadState('networkidle', { timeout: 120000 });
  console.log('✅ Logged in');

  // Click test_app tile from index page
  index = new IndexPage(global.page);
  await index.openApplication('testapp.html', { timeout: 400000 });

  await global.page.waitForLoadState('networkidle', { timeout: 300000 });
  await global.page.waitForTimeout(5000);

  GigaPower = new gigapower(global.page);
  console.log('✅ test_app opened, map loaded');

});


// Step 2: Click pencil icon and select Design
When('User clicks the pencil icon and selects Design', { timeout: 300000 }, async function () {

  // Click pencil (Add Object) button
  await global.page.locator('#a-createFeature').waitFor({ state: 'attached' });
  await global.page.locator('#a-createFeature').click({ force: true });
  console.log('✅ Pencil / Add Object clicked');

  await global.page.waitForTimeout(2000);

  // Select "Design" from the list
  await global.page.locator("//li[normalize-space(text())='Design']").click();
  console.log('✅ Design selected from list');

  await global.page.waitForTimeout(1000);

});


// Step 3: Draw 4 points on the map
When('User draws 4 points on the map', { timeout: 8000000 }, async function () {

  await GigaPower.drawPolygon(arg.design_coordinates);
  console.log('✅ 4 points drawn on map');

  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

});


// Step 4: Enter name and save
When('User enters a name and saves the design', { timeout: 300000 }, async function () {

  // Wait for New Design form
  await global.page.waitForSelector('text=New Design:', { timeout: 15000 });
  console.log('✅ New Design form visible');

  // Fill Name field via JS to trigger proper input events
  const designName = 'Design_' + Date.now();
  await global.page.evaluate((name) => {
    const input = document.querySelector('input.text.ui-input');
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, name);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, designName);
  console.log('✅ Name entered:', designName);

  await global.page.waitForTimeout(1000);

  // Click Save button
  await global.page.locator('button.ant-btn-primary.ant-btn-compact-first-item').click();
  console.log('✅ Save clicked');

  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

});


// Step 5: Verify design created
Then('New design is created successfully', { timeout: 60000 }, async function () {

  await global.page.waitForSelector(
    '//div[contains(@class, "feature-title")]',
    { timeout: 15000 }
  );

  console.log('✅ New design created successfully');

});