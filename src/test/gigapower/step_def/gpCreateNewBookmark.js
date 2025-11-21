    const { Given, When, Then } = require('@cucumber/cucumber');                                
    const { LoginPage } = require('../../../../pages/login.js');
    const { IndexPage } = require('../../../../pages/index.js');    
    const { Regression } = require('../../../../pages/apps/regression.js');
    const { IQGEO_USERNAME, PASSWORD } = require('../../../../base_lib/credentials.js');
    const { gigapower } = require('../../../../pages/apps/gigaPower');
    let login;
    let regression,GigaPower;
    let bookmark_title = `Bookmark_title` + Math.random();
   Given('the Network Manager application is active',{timeout:400000}, async function () {
    const BASE_URL = process.env.BASE_URL; // Get URL from hooks.js
    await global.page.goto(BASE_URL);
    login = new LoginPage(global.page);
    await login.login(IQGEO_USERNAME, PASSWORD);
    index = new IndexPage(global.page);
    await index.openApplication('att_network_manager.html', { timeout: 4000 });
    regression = new Regression(global.page);
    await regression.handleDialogClose();
    await global.page.waitForTimeout(5000);
  });



  When('User clicks on Add and manage bookmarks button',{timeout:40000}, async function () {
     // Initialize the GigaPower class
    GigaPower = new gigapower(global.page);
    await GigaPower.btnAddAndMangeBookmark.click();
    await global.page.waitForTimeout(5000);
  });



  When('User enters the name of the bookmark and clicks on save button',{timeout:40000}, async function () {
    await GigaPower.ipBookmarkTitle.fill(bookmark_title);
    await GigaPower.bookmarkTabButtons('Save');
    await global.page.waitForTimeout(5000);
  });



  Then('The map area selected in the background gets created as a new bookmark', async function () {
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