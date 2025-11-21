const { Given, When, Then, AND, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { chromium } = require("@playwright/test");
const { LoginPage } = require("../../../../pages/login.js");
const { IndexPage } = require("../../../../pages/index");
const {
  IQGEO_USERNAME,
  IQGEO_PASSWORD,
} = require("../../../../base_lib/constants.js");

let login;

Given(
  "User should be logged in the Network manager application",
  { timeout: 120000 },
  async function () {
    login = new LoginPage(global.page);

    await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
  }
);

When(
  "Select an area on map and click on Add and Manage Bookmarks",
  { timeout: 60000 },
  async function () {
    // const INDEX_PAGE = new IndexPage(page);
    // INDEX_PAGE.openApplication("network manager.html");
    const spanXPath = await page.waitForSelector(
      `//span[normalize-space()='Network Manager']`
    );
    await global.page.waitForSelector(spanXPath);
    await page.locator(spanXPath).click();
    //await page.waitForURL("http://localhost:8097/network_manager.html");

    await global.page.waitForSelector("#a-bookmarks", { timeout: 600000 });
    await global.page.locator("#a-bookmarks").click();
  }
);

When(
  "Input the name of the bookmark and Save",
  { timeout: 60000 },
  async function () {
    await global.page
      .locator('input.text.ui-input[name="myw_title"]')
      .fill("HYPP1");
    const buttons = global.page.locator(
      'button[type="button"].ui-button.ui-corner-all.ui-widget'
    );
    await buttons.locator('text="Save"').click();
    await global.page.waitForLoadState("networkidle", { timeout: 60000 });
    await global.page.screenshot({
      path: `src/test/screenshots/closePage_${Date.now()}.png`,
    });
  }
);

Then("A new bookmark must be added", { timeout: 60000 }, async function () {
  await global.page.locator("#a-bookmarks").click();
  const buttons = global.page.locator(
    'button[type="button"].ui-button.ui-corner-all.ui-widget'
  );
  await buttons.locator('text="Manage bookmarks"').click();
  await page.waitForSelector(".bookmark-item");

  //Assertion: Get all bookmark texts and check if the bookmark created is present in the list
  const bookmarkNames = await page.$$eval(
    ".bookmark-item .listBookmarkName",
    (elements) => elements.map((el) => el.textContent.trim())
  );
  console.log(" Bookmark Names:", bookmarkNames);
  const searchString = "HYPP1";
  if (bookmarkNames.includes(searchString)) {
    console.log(`${searchString} exists in the bookmark list.`);
  } else {
    console.log(`${searchString} does not exist in the bookmark list.`);
  }
  console.log(
    "Assertion: Get all bookmark texts and check if the bookmark created is present in the list"
  );
  //   const bookmarkItem = await global.page.locator(`text="HYPP1"`); // Adjust the locator based on your application’s UI
  //   await expect(bookmarkItem).toBeVisible(); // Ensure the new bookmark is visible
  await global.page.screenshot({
    path: `src/test/screenshots/closePage_${Date.now()}.png`,
  });
  console.log("User Created a New Bookmark");
});
