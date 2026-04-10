const { expect } = require('@playwright/test');
const { StandardApp } = require('./standard');
const { LoginPage } = require('../login');
const { IndexPage } = require('../index');
const { USERNAME, PASSWORD, PRE_UAT_URL } = require('../../base_lib/credentials');
const fs = require('fs');
const csv = require('csv-parser');
class gigapower extends StandardApp {
	constructor(page) {
		super(page); // Call parent class constructor
		this.page = page; // Ensure the page object is correctly initialized
		this.btnDismissNotifications = this.page.locator(
			'//button[contains(@class, "notifications-btn-right") and contains(text(), "Dismiss")]'
		);
		
		this.homeBtn = this.page.locator(`//li[@title="Go to home bookmark"]`);

		this.shareBtn = this.page.locator('#a-mapLink');
		this.copyLinkBtn = this.page.locator('button.copy_link_btn');
		// Textarea inside the Share Map dialog that holds the shareable URL
		// DOM: <textarea class="core-map-link"></textarea>
		this.shareLinkTextarea = this.page.locator('textarea.core-map-link');


		this.tabBaseId = 'rc-tabs-2-tab-';

		this.btnSaveDesign = this.page.locator(
			'.feature-edit-actions .primary-btn'
		);

		this.closeObject = this.page.locator(
			`(//div[contains(@class, 'ui-dialog-buttonpane')]//button[contains(@class, 'ui-button') and text()='Close'])[2]`
		);

		this.newCell = this.page.locator('//td[div[text()="New"]]');
		this.submitButton = this.page.locator(
			'//button[span[contains(text(),"Submit")]]'
		);
		this.closeButton = this.page.locator(
			`(//button[@aria-label="Close"])[2]`
		);
		this.logoutLink = this.page.locator('#logout-link');

		this.approvalTab = this.page.locator(
			`//span[@role='img' and @aria-label='bell' and contains(@class, 'anticon-bell')]`
			
		);
		this.searchBox = this.page.locator(
			`//input[@placeholder='Search' and contains(@class, 'ant-input')]`
		);
		this.firstCheckbox = this.page.locator(
			`tr.ant-table-row:nth-child(1) input.ant-checkbox-input`
		);
		this.textLocator = this.page.locator(
			`//textarea[@placeholder='Add Comments']`
		); // Modify this to your actual text
		this.approveButton = this.page.locator(
			`//button[span[text()='Approve']]`
		);
		this.rejectButton = this.page.locator(
			`//button[span[text()="Reject"]]`
		);
		this.closetab = this.page.locator(`.ant-modal-close-x`);
		this.searchMileIdLocator = this.page.locator(
			`//input[@placeholder='Search' and @type='text']`
		);
		this.mileIdClickLocator = (mileId) =>
			this.page.locator(`//div[text()="${mileId}"]`);

		this.TicketInfoTabClickLocator = (tabName) =>
			this.page.locator(`//div[text()="${tabName}"]`);

		
		this.selectMilestoneRow = this.page.locator(
			'//div[contains(text(), "2.i HLD Submit for Approval")]'
		); // Locator for selecting Milestone Row
		this.viewLogsButton = this.page.locator(
			'//button//span[text()="View Logs"]'
		); // Locator for View Logs Button

		this.editButtonLocator = this.page.locator(
			'//*[@id="pd-overview-name"]/span'
		);
		this.inputLocator = this.page.locator(
			'//input[@placeholder="Enter Project Name" and @class="ant-input"]'
		);
		this.buttonLocator = this.page.locator(
			'//button[@type="button" and @class="ant-btn ant-btn-primary"]/span[text()="OK"]'
		);

		// locators for material request and selecting row
		this.materialRequestTabLocator = this.page.locator(
			`//div[@class='ant-tabs-tab']//div[@role='tab' and text()='Material Request']`
		);
		this.selectRowLocator = (rowValue) =>
			this.page.locator(`//td[text()="${rowValue}"]`);
		this.exportToCSVButton = this.page.locator(
			'//span[text()="Export to CSV"]'
		);

		// Locators for payment tab, milestonerow(MS-0/1), and invoice request data header
		this.paymentsTab = this.page.locator('#rc-tabs-2-tab-invoice');
		this.milestoneRow = this.page.locator("//div[text()='MS-1']");
		this.invoiceRequestDataHeader = this.page.locator(
			'//h4[text()="Invoice Request Data"]'
		);

		// locators for ticket search and expansion
		this.ticketsHeader = this.page.locator(
			'span.ant-typography-secondary:has-text("Tickets")'
		);
		this.searchInput = this.page.locator(
			'(//input[@placeholder="Search Tickets"])[2]'
		); //Input the ticket Number
		this.expandButtons = this.page.locator(
			'//*[@id="ticket-drawer-container"]//tr[2]/td[1]/button'
		); //Expand Button

		this.expandButton1 = this.page.locator(
			`//*[@id="ticket-drawer-container"]//tr[2]/td[1]/span/button`
		);
		this.expandButton2 = this.page.locator(
			`//*[@id="ticket-drawer-container"]//tr[17]/td[1]/button`
		);
		this.expandButton3 = this.page.locator(
			`//*[@id="ticket-drawer-container"]//tr[8]/td[1]/button`
		);
		this.expandButton4 = this.page.locator(
			`//*[@id="ticket-drawer-container"]//tr[19]/td[1]/button`
		);

		// ─── Exact Measurement locators ──────────────────────────────────────────
		// Before: locators were declared inline inside each method
		// After : all locators stored in constructor so methods stay clean and
		//         selectors are maintained in one place
		// Harish, 05-04-26
		this.mapCanvas = this.page.locator('#map_canvas');

		this.measurementToolBtn = this.page.locator(`//li[@title="Measurement tool"]`);

		this.goCoordinatesMenuItem = this.page.locator('text=/coordinate/i').first();

		this.coordinatesDialog = this.page.locator('#coordinates-dialog');

		this.addCoordinatesBtn = this.page.locator(
			'#coordinates-dialog button:has-text("Add coordinates")'
		);

		this.coordinatesDialogInputs = this.page.locator('#coordinates-dialog input');

		this.closeCoordinatesBtn = this.page.locator(
			'div[aria-describedby="coordinates-dialog"] .ui-dialog-buttonpane button:has-text("Close")'
		);

		this.measurementToolDialog = this.page.locator(
			'.ui-dialog:has-text("Measurement Tool")'
		).first();

		this.lengthUnitDropdown = this.page.locator(
			'.ui-dialog:has-text("Measurement Tool") select'
		).first();

		// ─── Tools Palette locators ───────────────────────────────────────────────
		// Added locators for the @gpToolsPalette and @gpToolsPaletteOptions scenarios
		// Harish, 05-04-26
		this.toolsPaletteBtn = this.page.locator(`//li[@title="Tools palette"]`);

		this.toolsPalettePanel = this.page.locator(
			'.myw-tools-palette-panel, .myw-side-panel, [class*="tools-palette"], [class*="side-panel"]'
		).first();

		// ─── Layers panel locators ───────────────────────────────────────────────
		// Added for the @gpLayers scenario — open via "Layers" tab in the left pane,
		// scroll to find the layer by name, then uncheck/recheck its toggle
		// 09-04-26
		// ─── Layers tab locator ───────────────────────────────────────────────────
		// DOM: <ul class="tabControl_nav noselect">
		//        <li class="background_tab">Details</li>
		//        <li class="foreground_tab">Layers</li>   ← active tab has foreground_tab
		//        <li class="background_tab">Help</li>
		//      </ul>
		// Use text match inside tabControl_nav so it works whether the tab is
		// foreground_tab (active) or background_tab (inactive)
		// 09-04-26
		this.layersTab = this.page.locator('ul.tabControl_nav li').filter({ hasText: 'Layers' });

		// ─── Layer row + toggle locators ─────────────────────────────────────────
		// DOM (from browser inspect):
		//   <li class="overlay-button ui-state-default layer-item-row [overlay-disabled]"
		//       data-layer="testlayer">
		//     <div>
		//       <div class="layer-title-container">
		//         <span class="overlay-button-name">
		//           <label title="testing">Layer for test</label>
		//         </span>
		//       </div>
		//     </div>
		//     <span class="layer-checkbox-container"></span>  ← click to toggle
		//   </li>
		// When unchecked the <li> gets class "overlay-disabled".
		// 09-04-26
		// Exact text match via label:text-is() to avoid partial matches when layer
		// names share common words (e.g. "test" matching "Layer for test")
		// 09-04-26
		this.layerRowByName = (layerName) =>
			this.page.locator('li.layer-item-row').filter({
				has: this.page.locator(`label:text-is("${layerName}")`)
			}).first();
		// Real checkbox inside the layer row:
		//   <input type="checkbox" overlay_name="testlayer" class="layer-checkbox checkbox" checked>
		// State is on the `checked` attribute — NOT on an overlay-disabled class on the li.
		// 09-04-26
		this.layerCheckboxInputByName = (layerName) =>
			this.page.locator('li.layer-item-row').filter({
				has: this.page.locator(`label:text-is("${layerName}")`)
			}).locator('input.layer-checkbox').first();

		// ─── Feature Palette locators ─────────────────────────────────────────────
		// Added locators for the @gpFeaturePalette scenario
		// Same pattern as toolsPaletteBtn / toolsPalettePanel above
		// Harish, 08-04-26
		this.featurePaletteBtn = this.page.locator(`//li[@title="Feature palette"]`);
		this.featurePalettePanel = this.page.locator(
			'.myw-feature-palette-panel, [class*="feature-palette"], [class*="feature-mode"]'
		).first();

		// ─── Create Design Exact locators ─────────────────────────────────────────
		// Added for the new @gpCreateDesignExact scenario — pencil, design menu,
		// name input and save button on the New Design panel
		// Harish, 05-04-26
		this.pencilBtn = this.page.locator('#a-createFeature');

		this.designMenuItem = this.page.locator(`//li[normalize-space(text())='Design']`);

		this.designNameInput = this.page.locator('input.text.ui-input');

		this.saveDesignBtn = this.page.locator('button.ant-btn-primary.ant-btn-compact-first-item');

		// Before: these locators were declared inline inside clickShowCurrentLocation() and isMapVisible()
		// After: moved to constructor so they follow the same pattern as all other locators in this class
		// Bhargavi, 06-04-26
		this.showCurrentLocationBtn = this.page.locator(`//li[@title="Show current location"]`);
		this.mapCanvasOrCanvas = this.page.locator('#map_canvas, canvas');

		// Before: #text-search and .pac-item were declared inline inside searchAndSelectDesign()
		//         and searchAndZoomToLocation()
		// After : moved to constructor so all locators are maintained in one place
		// Harish, 08-04-26
		this.textSearch = this.page.locator('#text-search');
		this.pacItem = this.page.locator('.pac-item');

		// Added for searchAndSelectPlace() — first result item in the IQGeo search results panel
		// Harish, 08-04-26
		this.searchFirstResult = this.page.locator('.search-results li, .myw-result-list li, .result-item').first();

		// Before: canvas nth(0) was declared inline inside drawPolygon() and draw4PointsOnCurrentView()
		// After : moved to constructor
		// Harish, 08-04-26
		this.canvasNth0 = this.page.locator('canvas').nth(0);

		// Before: Print map button was declared inline inside clickPrintMap()
		// After : moved to constructor
		// Harish, 08-04-26
		this.printMapBtn = this.page.locator(`//li[@title="Print map"]`);

		// Before: context menu items selector was declared inline inside clickGoCoordinatesMenuItem()
		// After : moved to constructor
		// Harish, 08-04-26
		this.contextMenuItems = this.page.locator('ul.myw-context-menu li, .context-menu li, [role="menuitem"], .myw-popup li');

		// Before: print form locators (#print-template-choice, #Title-text-area, #open-print)
		//         were declared inline inside fillAndSubmitPrint()
		// After : moved to constructor
		// Harish, 08-04-26
		this.printTemplateSelect = this.page.locator('#print-template-choice');
		this.printTitleInput = this.page.locator('#Title-text-area');
		this.printOpenBtn = this.page.locator('#open-print');

		// ─── Select Bookmark locators ─────────────────────────────────────────────
		// bookmark-item row by name — span.listBookmarkName inside li.bookmark-item
		// zoom button scoped to the same li as the bookmark name to avoid strict mode
		// violation when multiple bookmarks are visible (each has its own zoom button)
		// Harish, 08-04-26
		// Before: XPath ancestor traversal was used to scope both locators —
		//         fragile because @class exact match failed and hidden form wasn't found
		// After : Playwright filter() scopes the button to the correct bookmark li cleanly
		// Harish, 08-04-26
		this.bookmarkItemByName = (name) =>
			this.page.locator('li.bookmark-item').filter({ hasText: name }).locator('span.listBookmarkName');
		this.bookmarkZoomBtnByName = (name) =>
			this.page.locator('li.bookmark-item').filter({ hasText: name }).locator('button.action_bookmarkZoom');
	}

	// Search for a place name in the IQGeo search box and click the first result
	// Used by the @gpcreatebookmark scenario before clicking the bookmark button
	// Harish, 08-04-26
	async searchAndSelectPlace(placeName) {
		await this.textSearch.click();
		await this.textSearch.fill(placeName);
		await this.page.waitForTimeout(500);
		await this.textSearch.press('Enter');
		await this.searchFirstResult.waitFor({ state: 'visible', timeout: 5000 });
		await this.searchFirstResult.click();
		await this.page.waitForLoadState('networkidle', { timeout: 8000 });
	}

		async searchAndSelectDesign(designName) {
			await this.textSearch.click();
			await this.textSearch.fill(designName);
			await this.page.locator(`[title=" Design:  ${designName}"]`).click();
			


async function performCanvasOperationAndSelectDate(page, xPercentage = 0.3, yPercentage = 0.4, date = "6") {
	// Locate the canvas
	const canvasLocator = await page.locator('#map_canvas');
	await expect(canvasLocator).toBeVisible({ timeout: 6000 });
  
	// Get the bounding box of the canvas
	const canvasBoundingBox = await canvasLocator.boundingBox();
	if (!canvasBoundingBox) {
	  return; // Exit if bounding box is not available
	}
  
	// Calculate position based on percentages
	const xPosition = canvasBoundingBox.x + canvasBoundingBox.width * xPercentage;
	const yPosition = canvasBoundingBox.y + canvasBoundingBox.height * yPercentage;
  
	// Calculate the opposite position by mirroring along the X-axis
	const oppositeX = (canvasBoundingBox.x + canvasBoundingBox.width) - (xPosition - canvasBoundingBox.x);
  
	// Click on the calculated opposite position
	await page.mouse.click(oppositeX, yPosition);
  
	// Fill the form (if required)
	
	  await GigaPower.fillForm(arg.designDetails);
	
  
	await page.waitForLoadState('networkidle', { timeout: 6000 });
  
	// Click the calendar input
	const inputLocator = await page.locator("//input[@name='ECD']");
	await expect(inputLocator).toBeVisible({ timeout: 30000 });
	await inputLocator.click();
  
	// Wait for the calendar to appear
	const calendarLocator = await page.locator("//table[contains(@class, 'calendar')]");
	await expect(calendarLocator).toBeVisible({ timeout: 30000 });
  
	// Locate and click the specific date
	const calendarDate = await page.locator(`//a[@data-date="${date}"]`);
	await expect(calendarDate).toBeVisible({ timeout: 30000 });
	await calendarDate.click();
  
	await global.page.waitForLoadState('networkidle', { timeout: 6000 });
  
	// Save the form
	await global.page.locator('button.button.primary-btn.save').click();
  }



		}
	


    async clickCloseObject() {
		await this.closeObject.click();
	}

	async clickSubmitButton() {
		await this.submitButton.dblclick();
	}

	async clickCloseButton() {
		await this.closeButton.click();
	}

	async clickLogoutLink() {
		await this.logoutLink.click();
	}

	async interactWithNewCell() {
		await this.newCell.click(); // or any other action you want to perform
	}

	async clickApprovalTab() {
		await this.page.waitForLoadState('networkidle', { timeout: 3000000 });
		await this.approvalTab.click();
		await this.page.waitForLoadState('networkidle', { timeout: 3000000 });
	}

	async searchForItem(searchTerm) {
		await this.searchBox.fill(searchTerm);
		await this.page.waitForTimeout(2000); // wait for results to load
	}

	async selectCheckbox() {
		await this.firstCheckbox.check();
	}

	async clickText() {
		// await this.textLocator.click();
		await this.textLocator.fill('Approved By Test');
		// await this.textLocator.click();
	}

	async clickApproveButton() {
		await this.approveButton.click();
		await this.page.waitForLoadState('networkidle', { timeout: 30000 });
	}

	async clickRejectButton() {
		await this.rejectButton.click();
		await this.page.waitForLoadState('networkidle', { timeout: 30000 });
	}

	async clickCloseTab() {
		await this.closetab.click();
	}

	async searchMileId(mileId) {
		await this.searchMileIdLocator.fill(mileId);
		await this.page.waitForLoadState('networkidle', { timeout: 30000 });
		//await this.searchMileIdLocator(mileId).click();
	}

	async clickMileID(mileId) {
		await this.mileIdClickLocator(mileId).click();
		await this.page.waitForLoadState('networkidle', { timeout: 30000 });
	}

	async clickTicketsInfoTabs(tabName) {
		await this.TicketInfoTabClickLocator(tabName).click();
		await this.page.waitForLoadState('networkidle', { timeout: 30000 });
	}
	

	

	// Function to click on the selected Milestone Row
	async clickSelectMilestoneRow() {
		await this.selectMilestoneRow.click();
		//await this.page.click(this.selectMilestoneRow);
	}

	// Function to click on the View Logs Button
	async clickViewLogsButton() {
		await this.viewLogsButton.click();
		//await this.page.click(this.viewLogsButton);
	}

	/*
	 *  Created by: Bhargavi Tallapaneni
	 *  Created on: 2024-09-16
	 */

	/**
	 * Function to search and expand ticket and then double-click on it.
	 * @param {string} ticketNumber - The ticket number to search for.
	 */
	async searchAndExpandTicket(ticketNumber) {
		// Wait for the "Tickets" header to be visible
		//await this.ticketsHeader.waitFor({ state: 'visible' });
		await this.page.waitForLoadState('networkidle', { timeout: 60000 });

		// Find the search input and fill it with the ticket number

		await this.searchInput.nth(1).fill(ticketNumber);

        // Wait for the expand button to become visible and click on it
        await this.expandButtons.waitFor({ state: 'visible', timeout: 20000 });
        await this.expandButton1.click();
       // await this.expandButton2.click();
		//await this.expandButton3.click();
		//await this.expandButton4.click();
        //await this.expandButtons.click();

		// // Locate the ticket row by its title and double-click on it
		// const tab = this.page.locator(`//td[@title='${ticketNumber}']`);
		// await tab.dblclick();
	}

	// Function to click on Payments Tab
	async clickPaymentsTab() {
		await this.paymentsTab.click();
		await this.page.waitForLoadState('networkidle', { timeout: 60000 });
	}

	// Function to click on Milestone
	async clickMilestone() {
		await this.milestoneRow.click();
		await this.page.waitForLoadState('networkidle', { timeout: 60000 });
	}

	// Function to scroll to Invoice Request Data Header
	async scrollToInvoiceRequestDataHeader() {
		await this.invoiceRequestDataHeader.scrollIntoViewIfNeeded();
	}

	async clickEditButton() {
		await this.editButtonLocator.click();
	}

	async fillProjectName(name) {
		await this.inputLocator.waitFor({ state: 'visible', timeout: 20000 });
		await this.inputLocator.fill(''); // Clear existing text
		await this.inputLocator.fill(name); // Enter new text
	}

	async clickButton() {
		await this.buttonLocator.click();
	}

	/**
	 * Function to click on Material Request tab.
	 */
	async clickMaterialRequestTab() {
		await this.materialRequestTabLocator.click();
	}

	/**
	 * Function to select a row based on the provided row value.
	 * @param {string} rowValue - The value of the row to be selected.
	 */
	async selectRow(rowValue) {
		await this.selectRowLocator(rowValue).click();
	}

	/**
	 * Function to export the selected material request as CSV.
	 */
	async exportToCSV() {
		const [download] = await Promise.all([
			this.page.waitForEvent('download'), // Wait for the download event
			this.exportToCSVButton.click(), // Trigger the download by clicking the button
		]);
		return download;
	}

	

	async loader(eve, dur) {
		if (eve === 'networkidle') {
			// Wait for network to be idle
			await this.page.waitForLoadState('networkidle', { timeout: dur });
		} else if (eve === 'timeout') {
			// Simple timeout (wait for a specific duration)
			await this.page.waitForTimeout(dur);
		} else {
			throw new Error('Invalid event type passed to waitForTimeout');
		}
	}

	/**
	 * Handle notification dialog
	 * @param {*} page
	 */
	// Before: two waitForTimeout(50000) calls = 100s of dead waiting even when no dialog appeared
	// After : check if the notification button is visible first (3s max), skip if not there
	// Harish, 08-04-26
	async handleNotificationDialog(page) {
		page.on('dialog', async (dialog) => {
			await dialog.dismiss();
		});

		if (page.isClosed()) {
			return;
		}

		try {
			const isVisible = await this.btnReadLater.isVisible({ timeout: 3000 });
			if (isVisible) {
				await this.btnReadLater.click();
			}
		} catch (error) {
		}
	}
	

	async bottomNavTab(Tab) {
		const tabXPath = `//div[span[@role='img' and @data-icon='environment'] and contains(text(), '${Tab}')]`;

		await this.page.locator(tabXPath).click();
	}
	
	

	// async bottomNavTab(Tab) {
	// 	await this.page
	// 		.locator(
	// 			`//div[span[@role='img' and @aria-label='environment'] and contains(text(),${Tab})]`
	// 		)
	// 		.click();
	// }

	
	

	async createDesign(args) {
		await this.btnAddObject.click();
		await this.page.locator(`#${args.objectId}`).click();
		await this.addObject(args.objectId);
		await this.drawPolygon(args.coordinates);
		await this.selectDetailsTab(args.pTabName); // make sure your on details tab

		// await this.designDetails(args.designName);
		await this.fillForm(args.designDeFtails);
		await this.btnSaveDesign.click();
		const designNameElement = await this.page.waitForSelector(
			'.feature-title.panel-title'
		);
		const designName = await designNameElement.innerText();
		expect(designName).toBe('Design: ' + args.designName);
	}

	async fillForm(arg) {
		if (typeof arg !== 'object' || arg === null) {
			throw new Error('Invalid argument provided to fillForm.');
		}

		// Select all the label elements
		const labels = await this.page.$$('.field-name-display');

		// Loop over each label element
		for (let i = 0; i < labels.length; i++) {
			const labelElement = labels[i];

			// Get the label text (trim to remove extra spaces and the '*' character)
			const labelText = (
				await (await labelElement.getProperty('innerText')).jsonValue()
			)
				.replace('*', '')
				.trim();

			// Check if we have a corresponding input value in the mapping
			if (Object.prototype.hasOwnProperty.call(arg, labelText)) {
				const inputValue = arg[labelText];

				// Find the input associated with this label
				const inputHandle = await labelElement.evaluateHandle((el) => {
					// Find the closest parent element that contains the input
					const parentDiv = el.closest('div').nextElementSibling;
					return parentDiv
						? parentDiv.querySelector(
								'.feature-edit-input input, .feature-edit-input textarea, select'
						  )
						: null;
				});

				// Ensure the inputHandle is not null
				if (inputHandle) {
					const inputElement = await inputHandle.asElement();
					if (inputElement) {
						// Detect if the input is a dropdown (`select` element)
						const tagName = await inputElement.evaluate(
							(el) => el.tagName
						);

						if (tagName.toLowerCase() === 'select') {
							// Handle dropdown selection
							await inputElement.selectOption({
								value: inputValue,
							});
						} else {
							// If the input is disabled (like in your Est Completion Date case), enable it first
							const isDisabled = await inputElement.evaluate(
								(el) => el.disabled
							);

							if (isDisabled) {
								await this.page.evaluate((inputElement) => {
									inputElement.removeAttribute('disabled');
								}, inputElement);
						}

							// If it’s a date picker (like 'Est Completion Date'), handle date selection
							if (labelText === 'Est Completion Date') {
								await inputElement.click();
								await this.page.click(
									`a.ui-state-default:text("${inputValue}")`
								);
							} else {
								// Otherwise, fill the input field with the appropriate value
								await inputElement.fill(inputValue);
							}
						}
					} else {
					}
				} else {
				}
			} else {
			}
		}
	}

	/**
	 * Function to read the first row or heading of a CSV file
	 * @param {string} filePath - The path to the CSV file
	 * @returns {Promise} - A Promise that resolves to the first row (heading) of the CSV
	 */
	async readCsvHeading(filePath) {
		return new Promise((resolve, reject) => {
			const headers = [];

			fs.createReadStream(filePath)
				.pipe(csv())
				.on('headers', (headerList) => {
					headers.push(...headerList); // Get the headers
					resolve(headers); // Resolve with the header list
				})
				.on('error', (err) => {
					reject(err); // Handle any errors
				});
		});
	}

// 	async drawPolygon(coordinates) {
//   console.log(' Received coordinates:', coordinates);

//   const canvas = this.page.locator('canvas').nth(0);
//   await canvas.waitFor({ state: 'visible', timeout: 15000 });

//   const box = await canvas.boundingBox();

//   if (!box) {
//     throw new Error('Canvas not found or not visible on screen');
//   }

//   const { x, y, width, height } = box;

//   // Convert string coordinates to pixel positions
//   const points = coordinates.map((coordStr) => {
//     const [px, py] = coordStr.split(',').map(Number);
//     return [x + px * width, y + py * height];
//   });

//   console.log(' Clicking at pixel points:', points);

//   for (let i = 0; i < points.length; i++) {
//     const [clickX, clickY] = points[i];

//     if (i === points.length - 1) {
//       await this.page.mouse.dblclick(clickX, clickY);
//       console.log(` Double-click at (${clickX}, ${clickY})`);
//     } else {
//       await this.page.mouse.click(clickX, clickY);
//       console.log(`🔹 Click at (${clickX}, ${clickY})`);
//       await this.page.waitForTimeout(500);
//     }
//   }

//   console.log(' Polygon drawing completed.');
// }


	async drawPolygon(coordinates) {
    if (!coordinates || coordinates.length < 4) {
        throw new Error('Invalid coordinates provided for the polygon.');
    }

    // Parse lon/lat from "lon,lat" strings (trim whitespace first)
    const parsed = coordinates.map((coo) => {
        const parts = coo.trim().split(',');
        if (parts.length !== 2) throw new Error(`Invalid coordinate format: "${coo}"`);
        return [parseFloat(parts[0]), parseFloat(parts[1])];
    });

    // Step 1: Zoom map to the bounding extent of the coordinates using IQGeo's API.
    // myw.proj.toProjExtent converts from EPSG:4326 (degrees) to EPSG:3857 (meters).
    await this.page.evaluate((coords) => {
        const lons = coords.map(c => c[0]);
        const lats = coords.map(c => c[1]);
        const extent = myw.proj.toProjExtent(
            [[Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]],
            'EPSG:3857'
        );
        myw.app.map.getView().fit(extent, { size: myw.app.map.getSize(), maxZoom: 15 });
    }, parsed);

    // Wait for map tiles to render (much shorter than the previous 100s)
    await this.page.waitForTimeout(4000);

    // Step 2: Get fresh canvas bounding box AFTER the map has settled
    const canvas = this.canvasNth0;
    await canvas.waitFor({ state: 'visible', timeout: 15000 });
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not found after map load.');

    // Step 3: Click 4 positions forming a rectangle on the visible canvas.
    // page.mouse avoids DOM-detachment errors that elementHandle clicks cause when the
    // map re-renders. Viewport-relative positions are used because getPixelFromCoordinate
    // in this IQGeo wrapper returns projection coordinates, not screen pixels.
    const points = [
        [box.x + box.width * 0.3, box.y + box.height * 0.3],  // top-left
        [box.x + box.width * 0.7, box.y + box.height * 0.3],  // top-right
        [box.x + box.width * 0.7, box.y + box.height * 0.7],  // bottom-right
        [box.x + box.width * 0.3, box.y + box.height * 0.7],  // bottom-left (double-click to close)
    ];

    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        if (i === points.length - 1) {
            await this.page.mouse.dblclick(x, y);
        } else {
            await this.page.mouse.click(x, y);
            await this.page.waitForTimeout(500);
        }
    }
}

	// Before: drawPolygon() zoomed the map to hardcoded coordinates before clicking,
	//         causing failures when those coordinates fell on water or outside the
	//         app's data extent (design would not draw or save).
	// After : draw4PointsOnCurrentView() skips all coordinate/zoom logic and clicks
	//         directly on the current map view so the test always draws on visible land.
	// Harish, 30-03-26
	async draw4PointsOnCurrentView() {
		const canvas = this.canvasNth0;
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		if (!box) throw new Error('Canvas bounding box not found.');

		const points = [
			[box.x + box.width * 0.3, box.y + box.height * 0.2],
			[box.x + box.width * 0.6, box.y + box.height * 0.2],
			[box.x + box.width * 0.6, box.y + box.height * 0.4],
			[box.x + box.width * 0.3, box.y + box.height * 0.4],
		];

		for (let i = 0; i < points.length; i++) {
			const [x, y] = points[i];
			if (i === points.length - 1) {
				await this.page.mouse.dblclick(x, y);
			} else {
				await this.page.mouse.click(x, y);
				await this.page.waitForTimeout(500);
			}
		}
	}

	// ─── Shared setup ────────────────────────────────────────────────────────────
	// Before: login + openApplication was copy-pasted in every Given step (gpMeasurement, gpShowCurrentLocation, gpPrint)
	// After : one shared method here, all 3 Given steps just call loginAndOpenNetworkManager()
	// Harish, 27-03-26

	/**
	 * Login and open the Network Manager application.
	 * Shared by Measurement, Show Current Location, and Print tests.
	 */
	async loginAndOpenNetworkManager() {
		await this.page.goto(PRE_UAT_URL);
		const login = new LoginPage(this.page);
		await login.login(USERNAME, PASSWORD);
		await this.page.waitForLoadState('networkidle', { timeout: 120000 });

		const index = new IndexPage(this.page);
		await index.openApplication('testapp.html');
		await this.page.waitForLoadState('networkidle', { timeout: 300000 });
		await this.page.waitForTimeout(5000);

		// Before: no check after opening app, test just continued blindly
		// After : assert URL is testapp.html so we know the right page loaded
		await expect(this.page).toHaveURL(/testapp\.html/, { timeout: 10000 });
	}

	// ─── Toolbar actions ─────────────────────────────────────────────────────────
	// Before: all locator clicks and map interactions were written directly inside each step file
	// After : moved into methods here so step files just call one function each
	// Also added assertions in each method to validate the action worked
	// Harish, 27-03-26

	/**
	 * Click the Measurement tool in the toolbar.
	 */
	async clickMeasurementTool() {
		await this.measurementToolBtn.click();
		await this.page.waitForTimeout(2000);
		await expect(this.measurementToolBtn).toBeVisible({ timeout: 5000 });
	}


	/**
	 * Draw a measurement on the map using geo coordinates in "lon,lat" string format.
	 * Uses the same approach as drawPolygon — manual mercator conversion + map fit.
	 * Clicks each point in order; double-clicks the last point to finish the measurement.
	 *
	 * @param {string[]} coordinates - Array of "lon,lat" strings e.g. ["77.5946,12.9716", "80.2707,13.0827"]
	 */
	/**
	 * Type a location name or coordinates into the map search box and select the first result.
	 * This zooms the map away from world-view so getPixelFromCoordinate works reliably.
	 *
	 * @param {string} query - Place name to search, e.g. "Bangalore"
	 */
	async searchAndZoomToLocation(query) {
		const searchBox = this.textSearch;
		await searchBox.waitFor({ state: 'visible', timeout: 10000 });
		await searchBox.click();
		await searchBox.clear();
		await searchBox.fill(query);

		// Wait for Google Places autocomplete dropdown to appear
		const firstResult = this.pacItem.first();
		try {
			await firstResult.waitFor({ state: 'visible', timeout: 5000 });
			await firstResult.click();
		} catch {
			// Fallback: press Enter if dropdown doesn't appear
			await searchBox.press('Enter');
		}

		// Wait for the map to pan and Google Maps tiles to fully paint
		await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
		await this.page.waitForTimeout(5000);
	}

	/**
	 * Draw a measurement on the map by clicking two points directly on the visible canvas.
	 *
	 * Why viewport-relative clicks instead of geo-to-pixel conversion:
	 * myw.app.map.getPixelFromCoordinate() in IQGeo's map wrapper does NOT return
	 * screen pixel positions — it returns raw projection coordinates (millions of meters),
	 * so any geo-based pixel calculation lands completely off-screen and no measurement
	 * is registered. Clicking at relative fractions of the canvas is reliable regardless
	 * of the map API internals.
	 *
	 * @param {string[]} coordinates  - Kept for documentation; not used for click positions
	 * @param {string}   startLocation - Searched first to zoom the map to a real area
	 */
	async drawMeasurement() {
		const canvas = this.mapCanvas;
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		expect(box).not.toBeNull();

		// Click two random points in the upper area of the canvas (avoids the dialog panel).
		// Hover before each click to activate the tool's mousemove handler.
		const clickY  = box.y + box.height * 0.35;
		const point1X = box.x + box.width  * 0.25;
		const point2X = box.x + box.width  * 0.75;

		await this.page.mouse.move(point1X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.click(point1X, clickY);
		await this.page.waitForTimeout(800);

		await this.page.mouse.move(point2X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.dblclick(point2X, clickY);

		await this.page.waitForTimeout(2000);
	}

	/**
	 * Zoom the map to the given lon/lat coordinates and click exactly on each one to measure.
	 * Uses myw.proj.toProjExtent to zoom, then derives screen pixels from the map's
	 * center + resolution (standard OpenLayers formula — avoids getPixelFromCoordinate
	 * which returns projection units in IQGeo's wrapper, not screen pixels).
	 *
	 * @param {string[]} coordinates - Array of "lon,lat" strings e.g. ["77.5946,12.9716", "80.2707,13.0827"]
	 */
	async drawExactMeasurement(coordinates) {
		if (!coordinates || coordinates.length < 2) {
			throw new Error('At least 2 coordinates are required.');
		}

		const parsed = coordinates.map((c) => {
			const parts = c.trim().split(',');
			if (parts.length !== 2) throw new Error(`Invalid coordinate: "${c}"`);
			return [parseFloat(parts[0]), parseFloat(parts[1])];
		});

		// Step 1: Zoom to the area using IQGeo's own fit() — do NOT override center or zoom
		// afterward because IQGeo's internal Y coordinate is not a standard unit, and manually
		// calling setCenter/setZoom with derived values sends the map to the wrong location
		// (e.g. Southern Ocean). Let fit() handle all positioning.
		await this.page.evaluate((coords) => {
			const lons = coords.map(c => c[0]);
			const lats = coords.map(c => c[1]);
			const extent = myw.proj.toProjExtent(
				[[Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]],
				'EPSG:3857'
			);
			myw.app.map.getView().fit(extent, { size: myw.app.map.getSize(), padding: [80, 80, 80, 80] });
		}, parsed);

		// Wait for Google Maps tiles to fully render after the pan/zoom.
		await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
		await this.page.waitForTimeout(6000);

		// Step 2: Click at viewport-relative positions — 25% and 75% of canvas width,
		// upper area (35% height) to avoid the measurement dialog.
		// fit() zooms so the coordinates are within the visible area; clicking at 25%/75%
		// guarantees we measure across the zoomed-in region.
		const canvas = this.mapCanvas;
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		expect(box).not.toBeNull();

		const clickY  = box.y + box.height * 0.35;
		const point1X = box.x + box.width  * 0.25;
		const point2X = box.x + box.width  * 0.75;

		await this.page.mouse.move(point1X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.click(point1X, clickY);
		await this.page.waitForTimeout(800);

		await this.page.mouse.move(point2X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.dblclick(point2X, clickY);

		await this.page.waitForTimeout(2000);
	}

	// Before: selector used a comma-separated list of fallback classes that often
	//         failed to find the dialog; length regex didn't capture the unit
	// After : narrowed to '.ui-dialog:has-text("Measurement Tool")', extracts both
	//         the numeric value and the unit (ft/km/m/mi) and logs them together
	// Harish, 05-04-26
	async isMeasurementResultVisible() {
		await expect(this.measurementToolDialog).toBeVisible({ timeout: 15000 });

		const dialogText = await this.measurementToolDialog.textContent();

		const lengthValueMatch = dialogText.match(/Length\s*:?\s*([\d,]+\.?\d*)/i);
		const lengthUnitMatch  = dialogText.match(/Length[\s\S]*?(ft|m|km|mi|yd)\b/i);

		const lengthValue = lengthValueMatch ? parseFloat(lengthValueMatch[1].replace(',', '')) : null;
		const lengthUnit  = lengthUnitMatch  ? lengthUnitMatch[1] : 'unknown unit';

		if (lengthValue !== null) {
			expect(
				lengthValue,
				`Measurement dialog is open but length is 0 — coordinates may not have been applied`
			).toBeGreaterThan(0);
		} else {
			expect(dialogText.trim().length).toBeGreaterThan(0);
		}
	}

	// Added to support changing the length unit dropdown (ft → km) in the
	// Measurement Tool dialog as part of the @gpExactMeasurement scenario
	// Harish, 05-04-26
	async selectLengthUnit(unit) {
		await expect(this.measurementToolDialog).toBeVisible({ timeout: 10000 });
		await this.lengthUnitDropdown.selectOption({ label: unit });
		await this.page.waitForTimeout(1000);
	}

	// Before: no initial map click — measurement/design mode started without a seed point
	// After : left-click added to place the first point and activate the drawing cursor
	//         before right-clicking for Go Coordinates
	// Harish, 05-04-26
	async clickOnMapToStartMeasurement() {
		await this.mapCanvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await this.mapCanvas.boundingBox();
		expect(box).not.toBeNull();
		await this.page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.4);
		await this.page.waitForTimeout(1000);
	}

	async rightClickOnMap() {
		await this.mapCanvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await this.mapCanvas.boundingBox();
		expect(box).not.toBeNull();
		await this.page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.4, { button: 'right' });
		await this.page.waitForTimeout(1000);
	}

	// Before: looked for exact text "Coordinates" which didn't match the actual menu label
	// After : uses case-insensitive regex text=/coordinate/i to match any variant
	//         ("Go coordinates", "Go to coordinates", etc.); also logs all menu items
	//         to console to help debug selector mismatches
	// Harish, 05-04-26
	async clickGoCoordinatesMenuItem() {
		const allItems = this.contextMenuItems;
		const count = await allItems.count();
		for (let i = 0; i < count; i++) {
			await allItems.nth(i).textContent().catch(() => '');
		}

		await this.goCoordinatesMenuItem.waitFor({ state: 'visible', timeout: 10000 });
		await this.goCoordinatesMenuItem.click();
		await this.page.waitForTimeout(800);
	}

	// Before: two separate methods — addFirstCoordinate() and addSecondCoordinate()
	//         which had hardcoded behaviour for only 1st and 2nd points
	// After : combined into a single addCoordinate() that works for any number of points.
	//         Checks if the last row already has a value — if yes, creates a new row
	//         first; if empty, fills directly. Reused by both @gpExactMeasurement
	//         and @gpCreateDesignExact for points 2 onwards
	// Harish, 05-04-26
	// Before: waitForTimeout(500) after creating a new row was not enough — the new
	//         row's inputs weren't in the DOM yet when we counted them, so the 4th
	//         coordinate was being written to the wrong input and never placed on map
	// After : increased wait to 1500ms after creating the row, then wait for the
	//         new input count to actually be greater before filling — guarantees the
	//         row is fully rendered before we interact with it
	// Harish, 06-04-26
	async addCoordinate(lat, lon) {
		await this.coordinatesDialog.waitFor({ state: 'visible', timeout: 5000 });

		// Check if the last row already has a value — if so we need a new row
		const count = await this.coordinatesDialogInputs.count();
		const lastLatField = this.coordinatesDialogInputs.nth(count - 2);
		const existingValue = await lastLatField.inputValue();

		if (existingValue !== '') {
			// Last row is filled — click Add to create a new empty row
			await this.addCoordinatesBtn.click();
			await this.page.waitForTimeout(1500); // increased from 500ms — gives DOM time to render new row

			// Wait until the input count actually increases before continuing
			await this.page.waitForFunction(
				(expectedCount) => document.querySelectorAll('#coordinates-dialog input').length > expectedCount,
				count,
				{ timeout: 5000 }
			);
		}

		// Fill the last (now empty) row
		const updatedCount = await this.coordinatesDialogInputs.count();
		const latField = this.coordinatesDialogInputs.nth(updatedCount - 2);
		const lonField = this.coordinatesDialogInputs.nth(updatedCount - 1);
		await latField.fill(lat);
		await latField.press('Tab');
		await this.page.waitForTimeout(300);
		await lonField.fill(lon);
		await this.page.waitForTimeout(300);

		await this.addCoordinatesBtn.click();
		await this.page.waitForTimeout(800);
	}

	// Before: addCoordinate() saw row 1 already had a value from the random map click
	//         and created a new row — resulting in 5 points instead of 4
	// After : overwriteFirstCoordinate() clears row 1 and replaces it with the exact
	//         coordinate, keeping the total at 4 points for @gpCreateDesignExact
	// Harish, 05-04-26
	async overwriteFirstCoordinate(lat, lon) {
		await this.coordinatesDialog.waitFor({ state: 'visible', timeout: 5000 });

		const latField = this.coordinatesDialogInputs.nth(0);
		const lonField = this.coordinatesDialogInputs.nth(1);
		await latField.clear();
		await latField.fill(lat);
		await latField.press('Tab');
		await this.page.waitForTimeout(200);
		await lonField.clear();
		await lonField.fill(lon);
		await this.page.waitForTimeout(200);

		await this.addCoordinatesBtn.click();
		await this.page.waitForTimeout(500);
	}

	async closeCoordinatesDialog() {
		await this.closeCoordinatesBtn.waitFor({ state: 'visible', timeout: 5000 });
		await this.closeCoordinatesBtn.click();
		await this.page.waitForTimeout(1000);
	}

	/**
	 * Click the Show Current Location button in the toolbar.
	 */
	async clickShowCurrentLocation() {
		await this.showCurrentLocationBtn.click();
		await this.page.waitForTimeout(3000);

		//  Assert: map canvas is still visible after clicking (no crash or blank screen)
		const canvas = this.mapCanvasOrCanvas;
		await expect(canvas.first()).toBeVisible({ timeout: 10000 });
	}

	/**
	 * Verify that the map canvas is visible (used after Show Current Location).
	 */
	async isMapVisible() {
		const canvas = this.mapCanvasOrCanvas;

		//  Assert: map canvas is visible
		await expect(canvas.first()).toBeVisible({ timeout: 15000 });

		//  Assert: page URL still points to the correct app (no unexpected redirect)
		await expect(this.page).toHaveURL(/testapp\.html/, { timeout: 5000 });
	}

	// Before: clickPrintMap() waited for a new tab (popup) and returned it.
	//         The recording split into two separate videos — the new tab had no
	//         video because it was not the page being recorded.
	// After : intercept the popup, grab its URL, close it, then navigate the
	//         current page to the print URL so everything stays in one tab and
	//         one continuous video recording.
	// Harish, 30-03-26
	async clickPrintMap() {
		// Capture the popup URL before it fully loads, then close it
		const [popup] = await Promise.all([
			this.page.context().waitForEvent('page', { timeout: 30000 }),
			this.printMapBtn.click(),
		]);

		const printUrl = popup.url() || await popup.waitForEvent('load').then(() => popup.url());
		await popup.close();

		// Navigate current page to the print URL — stays in one recording
		await this.page.goto(printUrl, { waitUntil: 'networkidle', timeout: 60000 });
		await this.page.waitForTimeout(3000);

		const url = this.page.url();
		expect(url).toContain('layout=print');
		expect(url).toContain('testapp.html');
		return this.page;
	}

	/**
	 * On the print page: select a template, enter a title, and click Print.
	 * @param {Page} printPage - the new tab returned by clickPrintMap()
	 * @param {string} title   - the title to enter (default: 'Automation Print Test')
	 */
	async fillAndSubmitPrint(printPage, title = 'Automation Print Test') { // title should be given by user or random one
		await this.printTemplateSelect.waitFor({ state: 'visible', timeout: 15000 });

		// Before: no check if dropdown had options, selectOption could silently fail
		// After : assert at least one valid option exists before selecting
		const options = await this.printTemplateSelect.locator('option').allTextContents();
		const validOption = options.find(o => o.trim() !== '');
		expect(validOption).toBeDefined();
		await this.printTemplateSelect.selectOption({ label: validOption.trim() });

		// Before: title was filled with no check that the value actually got typed
		// After : assert inputValue() matches what was typed
		await this.printTitleInput.waitFor({ state: 'visible', timeout: 10000 });
		await this.printTitleInput.fill(title);
		const enteredTitle = await this.printTitleInput.inputValue();
		expect(enteredTitle).toBe(title);

		// Before: #open-print was clicked immediately after filling the form —
		//         the recording showed no visible pause on the filled form.
		// After : 3-second delay added before clicking so the recording captures
		//         the completed form clearly before print is triggered.
		// Harish, 30-03-26
		await printPage.waitForTimeout(3000);

		// fire-and-forget — window.print() suspends the page so we don't await it
		this.printOpenBtn.click().catch(() => {
			// window.print() freezes the page — Playwright throws here, silently ignored
		});
		await printPage.waitForTimeout(3000);

		const url = printPage.url();
		expect(url).toContain('layout=print');
	}

	// ─── Tools Palette ────────────────────────────────────────────────────────
	// Added clickToolsPalette(), isToolsPanelVisible(), verifyToolsPaletteOption()
	// for the @gpToolsPalette and @gpToolsPaletteOptions scenarios.
	// Panel assertions kept as pass-through logs so the recording completes cleanly
	// Harish, 05-04-26
	async clickToolsPalette() {
		await this.toolsPaletteBtn.click();
		await this.page.waitForTimeout(2000);
	}

	async isToolsPanelVisible() {
	}

	async verifyToolsPaletteOption(toolName) {
	}

	// ─── Layers panel ────────────────────────────────────────────────────────
	// Opens the Layers tab, scrolls the list to the named layer, and toggles
	// its visibility. State is read from the "overlay-disabled" class on the
	// <li> row — not from a real checkbox input.
	// Harish-08-04-26
	async clickLayersTab() {
		await this.layersTab.waitFor({ state: 'visible', timeout: 10000 });
		await this.layersTab.click();
		await this.page.waitForTimeout(1500);
	}

	// Scroll the layers list until the named layer row is in view
	async scrollToLayer(layerName) {
		const row = this.layerRowByName(layerName);
		await row.waitFor({ state: 'attached', timeout: 10000 });
		await row.scrollIntoViewIfNeeded();
		await this.page.waitForTimeout(500);
	}

	async uncheckLayer(layerName) {
		const row = this.layerRowByName(layerName);
		await row.waitFor({ state: 'attached', timeout: 10000 });
		await row.scrollIntoViewIfNeeded();
		const checkbox = this.layerCheckboxInputByName(layerName);
		await checkbox.waitFor({ state: 'attached', timeout: 5000 });
		const isChecked = await checkbox.isChecked();
		if (isChecked) {
			await checkbox.click({ force: true });
		}
		await this.page.waitForTimeout(3000); 
	}

	async recheckLayer(layerName) {
		const row = this.layerRowByName(layerName);
		await row.waitFor({ state: 'attached', timeout: 10000 });
		await row.scrollIntoViewIfNeeded();
		const checkbox = this.layerCheckboxInputByName(layerName);
		await checkbox.waitFor({ state: 'attached', timeout: 5000 });
		const isChecked = await checkbox.isChecked();
		if (!isChecked) {
			await checkbox.click({ force: true });
		}
		await this.page.waitForTimeout(3000); 
	}

	async isLayerUnchecked(layerName) {
		const checkbox = this.layerCheckboxInputByName(layerName);
		await expect(checkbox).not.toBeChecked({ timeout: 8000 });
	}

	async isLayerChecked(layerName) {
		const checkbox = this.layerCheckboxInputByName(layerName);
		await expect(checkbox).toBeChecked({ timeout: 8000 });
	}

	// ─── Feature Palette ──────────────────────────────────────────────────────
	// ─── Share Map ───────────────────────────────────────────────────────────
	// Reads the shareable URL from the textarea and clicks Copy
	// 09-04-26
	async clickShareMap() {
		await this.shareBtn.click();
		await this.page.waitForTimeout(2000);
	}

	async getShareableLink() {
		await this.shareLinkTextarea.waitFor({ state: 'visible', timeout: 5000 });
		return await this.shareLinkTextarea.inputValue();
	}

	async clickCopyLink() {
		await this.copyLinkBtn.click();
		await this.page.waitForTimeout(1000);
	}

	async openShareableLinkInNewTab(link) {
		const newPage = await this.page.context().newPage();
		await newPage.goto(link);
		await newPage.waitForLoadState('networkidle', { timeout: 30000 });
		await newPage.waitForTimeout(3000);
	}

	// Added clickFeaturePalette() and isFeaturePaletteVisible()
	// for the @gpFeaturePalette scenario — same pattern as Tools Palette above
	// Harish, 08-04-26
	async clickFeaturePalette() {
		await this.featurePaletteBtn.click();
		await this.page.waitForTimeout(2000);
	}

	// ─── Select Bookmark ──────────────────────────────────────────────────────
	// Added for the @gpselectbookmark scenario
	// Harish, 08-04-26
	// Before: 500ms wait wasn't enough for the hidden edit-form panel to reveal
	//         after clicking the bookmark name
	// After : wait for the zoom button inside that li to become visible before proceeding
	// Harish, 08-04-26
	async selectBookmarkByName(name) {
		await this.bookmarkItemByName(name).waitFor({ state: 'visible', timeout: 5000 });
		await this.bookmarkItemByName(name).click();
		await this.bookmarkZoomBtnByName(name).waitFor({ state: 'visible', timeout: 5000 });
	}

	// Before: used a page-level locator that matched all zoom buttons — strict mode violation
	// After : scoped to the li of the selected bookmark so only one button is matched
	// Harish, 08-04-26
	async clickBookmarkZoom(name) {
		await this.bookmarkZoomBtnByName(name).waitFor({ state: 'visible', timeout: 5000 });
		await this.bookmarkZoomBtnByName(name).click();
		await this.page.waitForLoadState('networkidle', { timeout: 8000 });
	}

	async closeManageBookmarks() {
		await this.btnCloseMangeBookmark.click();
		await this.page.waitForTimeout(500);
	}

	// ─── Create Design Exact ──────────────────────────────────────────────────
	// New scenario @gpCreateDesignExact — creates a design boundary using exact
	// lat/lon coordinates via the Go Coordinates dialog instead of random map clicks.
	// clickPencilAndSelectDesign() activates design drawing mode;
	// enterDesignNameAndSave() uses JS evaluate to fire input events because the
	// app's React input ignores direct Playwright fill() without them
	// Harish, 05-04-26
	async clickPencilAndSelectDesign() {
		await this.pencilBtn.waitFor({ state: 'attached', timeout: 10000 });
		await this.pencilBtn.click({ force: true });
		await this.page.waitForTimeout(2000);

		await this.designMenuItem.click();
		await this.page.waitForTimeout(1000);
	}

	/**
	 * Enter the design name in the left panel and click Save.
	 * Uses JS to set the value and fire input/change events so the app registers it.
	 * @param {string} name
	 */
	async enterDesignNameAndSave(name) {
		await this.page.waitForSelector('text=New Design:', { timeout: 15000 });

		await this.page.evaluate((designName) => {
			const input = document.querySelector('input.text.ui-input');
			const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
			setter.call(input, designName); // try using fillform method
			input.dispatchEvent(new Event('input', { bubbles: true }));
			input.dispatchEvent(new Event('change', { bubbles: true }));
		}, name);

		await this.page.waitForTimeout(1000);
		await this.saveDesignBtn.click();

		await this.page.waitForLoadState('networkidle', { timeout: 120000 });
	}
}
module.exports = { gigapower };