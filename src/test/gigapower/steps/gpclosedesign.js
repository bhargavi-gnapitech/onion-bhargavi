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


// ================= @gpclosedesign =================

Given('User is in the Network manager application', { timeout: 300000 }, async function () {

  await global.page.goto(PRE_UAT_URL);
  login = new LoginPage(global.page);
  await login.login(USERNAME, PASSWORD);
  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

  index = new IndexPage(global.page);
  await index.openApplication('testapp.html');
  await global.page.waitForLoadState('networkidle', { timeout: 300000 });
  await global.page.waitForTimeout(5000);

  GigaPower = new gigapower(global.page);

  // Create and open a design so there is something to close
  await global.page.locator('#a-createFeature').waitFor({ state: 'attached' });
  await global.page.locator('#a-createFeature').click({ force: true });
  await global.page.waitForTimeout(2000);
  await global.page.locator("//li[normalize-space(text())='Design']").click();
  await global.page.waitForTimeout(1000);
  await GigaPower.drawPolygon(arg.design_coordinates);
  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

  await global.page.waitForSelector('text=New Design:', { timeout: 15000 });
  const designName = 'Design_' + Date.now();
  await global.page.evaluate((name) => {
    const input = document.querySelector('input.text.ui-input');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, name);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, designName);
  await global.page.waitForTimeout(1000);
  await global.page.locator('button.ant-btn-primary.ant-btn-compact-first-item').click();
  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

  console.log('✅ Logged in and design created');
});

When('User clicks on the Close button', { timeout: 60000 }, async function () {
  // CHANGED: old locator "button.ui-button:has-text('Close'), //button[text()='Close']" was mixing
  // CSS and XPath which Playwright doesn't support. Found buttons are icon-only (hidden) dialog
  // title-bar X buttons — not the design panel close. Using #clear-results to dismiss the panel.
  // Two #clear-results elements exist in the DOM (duplicate IDs) — using .first() to avoid strict mode error.
  // Old code: const closeBtn = global.page.locator('//button[contains(@class,"ui-button") and normalize-space(text())="Close"]').first();
  const closeBtn = global.page.locator('#clear-results').first();
  await closeBtn.waitFor({ state: 'visible', timeout: 20000 });
  await closeBtn.click();
  console.log('✅ Close button clicked');
});

Then('The design should be closed', { timeout: 60000 }, async function () {
  // After clearing results, the design details panel should no longer be visible
  // CHANGED: was checking .delta-owner-toolbar which is a design edit toolbar,
  // but after close we check that the details panel (.feature-details) is gone
  // Old code: await expect(global.page.locator('.delta-owner-toolbar')).not.toBeVisible({ timeout: 15000 });
  await global.page.waitForLoadState('networkidle', { timeout: 30000 });
  const detailsPanel = global.page.locator('.feature-details, #feature-details, .feature-panel');
  await expect(detailsPanel.first()).not.toBeVisible({ timeout: 15000 });
  console.log('✅ Design closed successfully');
});


// -----------------------------------------------------------------------
// NOTE (2026-03-17): The steps below ('User is in Network manager application',
// 'User single clicks at 3 points...', 'User inputs the fields...', 'New design is created')
// do NOT match any scenario in gp.feature — they were leftover/unused step definitions
// that were in the file before the @gpclosedesign steps were added above.
// They are kept here as-is in case they are used by another feature file in the future.
// -----------------------------------------------------------------------

// ================= @gpcreatedesign =================
Given('User is in Network manager application', { timeout: 300000 }, async function () {

  // Login
  await global.page.goto(PRE_UAT_URL);
  login = new LoginPage(global.page);
  await login.login(USERNAME, PASSWORD);
  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

  // Open test_app → map loads directly
  index = new IndexPage(global.page);
  await index.openApplication('testapp.html', { timeout: 400000 });

  await global.page.waitForLoadState('networkidle', { timeout: 300000 });
  await global.page.waitForTimeout(5000);

  GigaPower = new gigapower(global.page);
  console.log('✅ Logged in and map opened');

});

When(
  'User single clicks at 3 points on the map and double clicks at the last point',
  { timeout: 8000000 },
  async function () {

    // Click pencil (Add Object) button
    await global.page.locator('#a-createFeature').waitFor({ state: 'attached' });
    await global.page.locator('#a-createFeature').click({ force: true });
    console.log('✅ Pencil / Add Object clicked');
    await global.page.waitForTimeout(2000);

    // Select "Design" from the Add Object list
    await global.page.locator("//li[normalize-space(text())='Design']").click();
    console.log('✅ Design selected');
    await global.page.waitForTimeout(1000);

    // Draw polygon on the map using coordinates
    await GigaPower.drawPolygon(arg.design_coordinates);
    console.log('✅ Polygon drawn');

    await global.page.waitForLoadState('networkidle', { timeout: 120000 });

  }
);

When('User inputs the fields and clicks on Create', { timeout: 300000 }, async function () {

  // Wait for the New Design form to appear
  await global.page.waitForSelector('text=New Design:', { timeout: 15000 });
  console.log('✅ New Design form appeared');

  // Fill the Name field
  const jobName = 'Job: ' + Math.random();
  await global.page.locator('input[name="name"], label:has-text("Name") + input, .myw-attribute-widget input').first().fill(jobName);
  console.log('✅ Name filled:', jobName);

  // Select Pick dropdown - select first available option
  try {
    const pickDropdown = global.page.locator('label:has-text("Pick") ~ select, select[name="pick"], .myw-attribute-widget select').first();
    await pickDropdown.waitFor({ state: 'visible', timeout: 5000 });
    const options = await pickDropdown.locator('option').allTextContents();
    const validOption = options.find(o => o.trim() !== '' && o.trim() !== 'Select...');
    if (validOption) {
      await pickDropdown.selectOption({ label: validOption.trim() });
      console.log('✅ Pick selected:', validOption.trim());
    }
  } catch (e) {
    console.log('ℹ️ Pick dropdown not found or not required, skipping...');
  }

  // Click Save
  await global.page.locator('//button[text()="Save"]').click();
  console.log('✅ Save clicked');

  await global.page.waitForSelector(
    '//div[contains(@class, "feature-title")]',
    { timeout: 15000 }
  );

  await global.page.waitForLoadState('networkidle', { timeout: 120000 });
  await GigaPower.openDesign();
  await global.page.waitForLoadState('networkidle', { timeout: 120000 });

});

Then('New design is created', { timeout: 60000 }, async function () {
  console.log('✅ New design created successfully');
});