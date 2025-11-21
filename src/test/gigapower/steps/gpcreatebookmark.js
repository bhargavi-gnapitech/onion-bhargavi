const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../../../pages/login');
const { gigapower } = require('../../../../pages/apps/gigaPower');
const { IQGEO_USERNAME, IQGEO_PASSWORD } = require('../../../../base_lib/constants.js');

let login, GigaPower;
let bookmark_title = `Bookmark_title` + Math.random();

Given('User should in the Network manager application', { timeout: 120000 }, async function () {
  
  // Initialize the login page
  login = new LoginPage(global.page);

  // Initialize the GigaPower class
  GigaPower = new gigapower(global.page);

 

  // Perform login
  await login.login(IQGEO_USERNAME, IQGEO_PASSWORD);


		await GigaPower.handleNotificationDialog(global.page);
		
	}
);


When(
  'Select an area on map and click on Add and Manage Bookmarks',
  { timeout: 120000 },
  async function () {
    
    
    // Navigate to the Map tab
	await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();
   // await GigaPower.bottomNavTab('Map');

    

    // Click on the Add and Manage Bookmarks button
    await GigaPower.btnAddAndMangeBookmark.click();
  }
);

When(

	'Input the name of the bookmark and Save',
	{ timeout: 60000 },
	async function () {
		await GigaPower.ipBookmarkTitle.fill(bookmark_title);
		await GigaPower.bookmarkTabButtons('Save');

	}
);

Then('A new bookmark must be added', { timeout: 60000 }, async function () {
	
	//await GigaPower.bottomNavTab('Map');
	await global.page.waitForSelector(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`);

	await global.page.locator(`//div[span[@role='img' and @aria-label='environment' and contains(@class, 'anticon-environment')]]`).click();
	await GigaPower.btnAddAndMangeBookmark.click();
	await GigaPower.bookmarkTabButtons('Manage bookmarks');

	await global.page.waitForSelector('.bookmark-item');

	
	const bookmarkNames = await page.$$eval(
		'.bookmark-item .listBookmarkName',
		(elements) => elements.map((el) => el.textContent.trim())
	);
	console.log(' Bookmark Names:', bookmarkNames);
	const searchString = bookmark_title;
	if (bookmarkNames.includes(searchString)) {
		console.log(`${searchString} exists in the bookmark list.`);
	} else {
		console.log(`${searchString} does not exist in the bookmark list.`);
	}

});
