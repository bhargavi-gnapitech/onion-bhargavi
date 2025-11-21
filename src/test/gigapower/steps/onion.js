const { Given, When, Then } = require('@cucumber/cucumber');

Given('the user is on the Onion login page', async function () {
  await this.page.goto('https://ppl-ri-dist.perftest.iqgeo.cloud/');
});

When('the user enters a valid username', async function () {
  await this.page.fill('#username', 'your_username'); 
});

When('the user enters a valid password', async function () {
  await this.page.fill('#password', 'your_password'); 
});

When('the user clicks on the Login button', async function () {
  await this.page.click('#loginButton'); 
});

Then('the user should be successfully logged in', async function () {
 console.log("login success!");
});


