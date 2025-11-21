const { Given, When, Then, And, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../../../pages/login.js");
const { gigapower } = require("../../../../pages/apps/gigaPower.js");
const {
  IQGEO_USERNAME,
  IQGEO_PASSWORD,
} = require("../../../../base_lib/constants.js");

let login;

Given("User Opens the IQGeo URL", { timeout: 70000 }, async function () {
  login = new LoginPage(global.page);
});

When(
  `User inputs {string} and {string}`,
  { timeout: 120000 },
  async function (username, password) {
    await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
  }
);

Then("Click on Login", { timeout: 70000 }, async function () {
  await page.goto("http://localhost:8097/index");
  await page.waitForSelector(`a.box.app_options_box`);
  // Retrieve the page title
  const pageTitle = await page.title();
  // Assert the title
  expect(pageTitle).toBe("IQGeo Home");
});

Then(
  "User should be logged into application",
  { timeout: 70000 },
  async function () {
    //Assertion added if login was successful or not
    await page.waitForSelector(`a.box.app_options_box`);
    await expect(page).toHaveURL("http://localhost:8097/index");
  }
);
