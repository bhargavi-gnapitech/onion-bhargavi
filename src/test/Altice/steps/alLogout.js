const { Given, When, Then, And, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../../../pages/login.js");
const {
  IQGEO_USERNAME,
  IQGEO_PASSWORD,
} = require("../../../../base_lib/constants.js");

let login;

Given("User is logged in", { timeout: 120000 }, async function () {
  login = new LoginPage(global.page);
  await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);
});

When("User clicks on the logout button", { timeout: 70000 }, async function () {
  await login.logout();
});

Then(
  "User should be logged out of Altice application",
  { timeout: 70000 },
  async function () {
    await global.page.waitForTimeout(5000);
    await expect(global.page).toHaveURL("http://localhost:8097/login");
  }
);
