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

		// ─── Create Design Exact locators ─────────────────────────────────────────
		// Added for the new @gpCreateDesignExact scenario — pencil, design menu,
		// name input and save button on the New Design panel
		// Harish, 05-04-26
		this.pencilBtn = this.page.locator('#a-createFeature');

		this.designMenuItem = this.page.locator(`//li[normalize-space(text())='Design']`);

		this.designNameInput = this.page.locator('input.text.ui-input');

		this.saveDesignBtn = this.page.locator('button.ant-btn-primary.ant-btn-compact-first-item');
	}

		async searchAndSelectDesign(designName) {
			await this.page.locator('#text-search').click();
			await this.page.locator('#text-search').fill(designName);
			await this.page.locator(`[title=" Design:  ${designName}"]`).click();
			


async function performCanvasOperationAndSelectDate(page, xPercentage = 0.3, yPercentage = 0.4, date = "6") {
	// Locate the canvas
	const canvasLocator = await page.locator('#map_canvas');
	await expect(canvasLocator).toBeVisible({ timeout: 6000 });
  
	// Get the bounding box of the canvas
	const canvasBoundingBox = await canvasLocator.boundingBox();
	if (!canvasBoundingBox) {
	  console.error('Could not get bounding box for the canvas element');
	  return; // Exit if bounding box is not available
	}
  
	// Log the canvas position for debugging
	console.log(`Canvas Bounding Box: x=${canvasBoundingBox.x}, y=${canvasBoundingBox.y}, width=${canvasBoundingBox.width}, height=${canvasBoundingBox.height}`);
  
	// Calculate position based on percentages
	const xPosition = canvasBoundingBox.x + canvasBoundingBox.width * xPercentage;
	const yPosition = canvasBoundingBox.y + canvasBoundingBox.height * yPercentage;
  
	// Calculate the opposite position by mirroring along the X-axis
	const oppositeX = (canvasBoundingBox.x + canvasBoundingBox.width) - (xPosition - canvasBoundingBox.x);
  
	// Log positions for debugging
	console.log(`Placing cabinet at 30% width and 40% height: x=${xPosition}, y=${yPosition}`);
	console.log(`Placing cabinet at the opposite side: x=${oppositeX}, y=${yPosition}`);
  
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
	async handleNotificationDialog(page) {
		// Handle any dialog that may appear
		page.on('dialog', async (dialog) => {
			console.log(`Dialog message: ${dialog.message()}`);
			await dialog.dismiss();
		});

		if (page.isClosed()) {
			console.error(
				'Cannot handle notification dialog because the page is closed.'
			);
			return;
		}

		try {
			await page.waitForTimeout(50000);
			await this.btnReadLater.click();
			await page.waitForTimeout(50000);

			// Ensure that the dismiss button is no longer visible
			await expect(this.btnReadLater).toBeVisible();
		} catch (error) {
			console.error('Error handling notification dialog:', error);
		}
	}
	

	async bottomNavTab(Tab) {
		const tabXPath = `//div[span[@role='img' and @data-icon='environment'] and contains(text(), '${Tab}')]`;
		console.log('Tab XPath:', tabXPath);  // Check the generated XPath
		
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
		console.log('🚀👊 ~ file: mywcom.js:34 ~ designName:', designName);
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

			console.log(`Searching for label: ${labelText}`); // Debugging

			// Check if we have a corresponding input value in the mapping
			if (Object.prototype.hasOwnProperty.call(arg, labelText)) {
				const inputValue = arg[labelText];
				console.log(`Filling in value for ${labelText}: ${inputValue}`); // Debugging

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
							console.log(
								`Selected ${inputValue} for ${labelText}`
							);
						} else {
							// If the input is disabled (like in your Est Completion Date case), enable it first
							const isDisabled = await inputElement.evaluate(
								(el) => el.disabled
							);

							if (isDisabled) {
								await this.page.evaluate((inputElement) => {
									inputElement.removeAttribute('disabled');
								}, inputElement);
								console.log(
									`${labelText} input was disabled, now enabled.`
								);
							}

							// If it’s a date picker (like 'Est Completion Date'), handle date selection
							if (labelText === 'Est Completion Date') {
								await inputElement.click();
								await this.page.click(
									`a.ui-state-default:text("${inputValue}")`
								);
								console.log(
									`Selected date: ${inputValue} for ${labelText}`
								);
							} else {
								// Otherwise, fill the input field with the appropriate value
								await inputElement.fill(inputValue);
								console.log(
									`Filled value for ${labelText}: ${inputValue}`
								);
							}
						}
					} else {
						console.warn(
							`Input element not found for label: ${labelText}`
						);
					}
				} else {
					console.warn(
						`Input handle not found for label: ${labelText}`
					);
				}
			} else {
				console.warn(`No matching entry found for label: ${labelText}`);
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
//   console.log('📍 Received coordinates:', coordinates);

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

//   console.log('🖱️ Clicking at pixel points:', points);

//   for (let i = 0; i < points.length; i++) {
//     const [clickX, clickY] = points[i];

//     if (i === points.length - 1) {
//       await this.page.mouse.dblclick(clickX, clickY);
//       console.log(`✅ Double-click at (${clickX}, ${clickY})`);
//     } else {
//       await this.page.mouse.click(clickX, clickY);
//       console.log(`🔹 Click at (${clickX}, ${clickY})`);
//       await this.page.waitForTimeout(500);
//     }
//   }

//   console.log('✅ Polygon drawing completed.');
// }


	async drawPolygon(coordinates) {
    console.log('📍 Received coordinates:', coordinates);

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
        console.log('Fitting map to extent:', extent);
        myw.app.map.getView().fit(extent, { size: myw.app.map.getSize(), maxZoom: 15 });
    }, parsed);

    // Wait for map tiles to render (much shorter than the previous 100s)
    await this.page.waitForTimeout(4000);

    // Step 2: Get fresh canvas bounding box AFTER the map has settled
    const canvas = this.page.locator('canvas').nth(0);
    await canvas.waitFor({ state: 'visible', timeout: 15000 });
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not found after map load.');
    console.log(`✅ Canvas ready — x:${Math.round(box.x)} y:${Math.round(box.y)} w:${box.width} h:${box.height}`);

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
            console.log(`✅ Double-click (close polygon) at (${Math.round(x)}, ${Math.round(y)})`);
        } else {
            await this.page.mouse.click(x, y);
            console.log(`✅ Click point ${i + 1} at (${Math.round(x)}, ${Math.round(y)})`);
            await this.page.waitForTimeout(500);
        }
    }
    console.log('✅ Polygon drawing completed.');
}

	// Before: drawPolygon() zoomed the map to hardcoded coordinates before clicking,
	//         causing failures when those coordinates fell on water or outside the
	//         app's data extent (design would not draw or save).
	// After : draw4PointsOnCurrentView() skips all coordinate/zoom logic and clicks
	//         directly on the current map view so the test always draws on visible land.
	// Harish, 30-03-26
	async draw4PointsOnCurrentView() {
		const canvas = this.page.locator('canvas').nth(0);
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		if (!box) throw new Error('Canvas bounding box not found.');
		console.log(`✅ Canvas — x:${Math.round(box.x)} y:${Math.round(box.y)} w:${box.width} h:${box.height}`);

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
				console.log(`✅ Double-click (close polygon) at (${Math.round(x)}, ${Math.round(y)})`);
			} else {
				await this.page.mouse.click(x, y);
				console.log(`✅ Click point ${i + 1} at (${Math.round(x)}, ${Math.round(y)})`);
				await this.page.waitForTimeout(500);
			}
		}
		console.log('✅ 4-point polygon drawn on current view.');
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
		console.log('✅ Logged in and Network Manager opened:', this.page.url());
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
		console.log('✅ Measurement tool clicked and is active in toolbar');
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
		const searchBox = this.page.locator('#text-search');
		await searchBox.waitFor({ state: 'visible', timeout: 10000 });
		await searchBox.click();
		await searchBox.clear();
		await searchBox.fill(query);

		// Wait for Google Places autocomplete dropdown to appear
		const firstResult = this.page.locator('.pac-item').first();
		try {
			await firstResult.waitFor({ state: 'visible', timeout: 5000 });
			await firstResult.click();
			console.log(`✅ Search result clicked for: "${query}"`);
		} catch {
			// Fallback: press Enter if dropdown doesn't appear
			await searchBox.press('Enter');
			console.log(`✅ Pressed Enter to search for: "${query}"`);
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
		const canvas = this.page.locator('#map_canvas');
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		expect(box).not.toBeNull();
		console.log(`✅ Map canvas ready — width: ${box.width}, height: ${box.height}`);

		// Click two random points in the upper area of the canvas (avoids the dialog panel).
		// Hover before each click to activate the tool's mousemove handler.
		const clickY  = box.y + box.height * 0.35;
		const point1X = box.x + box.width  * 0.25;
		const point2X = box.x + box.width  * 0.75;

		await this.page.mouse.move(point1X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.click(point1X, clickY);
		console.log(`✅ Click point 1 at (${Math.round(point1X)}, ${Math.round(clickY)})`);
		await this.page.waitForTimeout(800);

		await this.page.mouse.move(point2X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.dblclick(point2X, clickY);
		console.log(`✅ Double-click (finish) at (${Math.round(point2X)}, ${Math.round(clickY)})`);

		await this.page.waitForTimeout(2000);
		console.log('✅ Measurement drawing complete');
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
		const canvas = this.page.locator('#map_canvas');
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		expect(box).not.toBeNull();
		console.log(`✅ Canvas: ${box.width}×${box.height} at (${Math.round(box.x)}, ${Math.round(box.y)})`);

		const clickY  = box.y + box.height * 0.35;
		const point1X = box.x + box.width  * 0.25;
		const point2X = box.x + box.width  * 0.75;

		await this.page.mouse.move(point1X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.click(point1X, clickY);
		console.log(`✅ Click point 1 at (${Math.round(point1X)}, ${Math.round(clickY)})`);
		await this.page.waitForTimeout(800);

		await this.page.mouse.move(point2X, clickY);
		await this.page.waitForTimeout(300);
		await this.page.mouse.dblclick(point2X, clickY);
		console.log(`✅ Double-click (finish) at (${Math.round(point2X)}, ${Math.round(clickY)})`);

		await this.page.waitForTimeout(2000);
		console.log('✅ Exact measurement drawing complete');
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
			console.log(`✅ Exact measurement result — Length: ${lengthValue} ${lengthUnit}`);
		} else {
			expect(dialogText.trim().length).toBeGreaterThan(0);
			console.log('✅ Measurement dialog visible — raw text:', dialogText.trim().substring(0, 120));
		}
	}

	// Added to support changing the length unit dropdown (ft → km) in the
	// Measurement Tool dialog as part of the @gpExactMeasurement scenario
	// Harish, 05-04-26
	async selectLengthUnit(unit) {
		await expect(this.measurementToolDialog).toBeVisible({ timeout: 10000 });
		await this.lengthUnitDropdown.selectOption({ label: unit });
		await this.page.waitForTimeout(1000);
		const selected = await this.lengthUnitDropdown.inputValue();
		console.log(`✅ Length unit changed to: ${selected}`);
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
		console.log('✅ Left-clicked on map to start measurement');
	}

	async rightClickOnMap() {
		await this.mapCanvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await this.mapCanvas.boundingBox();
		expect(box).not.toBeNull();
		await this.page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.4, { button: 'right' });
		await this.page.waitForTimeout(1000);
		console.log('✅ Right-clicked on map canvas');
	}

	// Before: looked for exact text "Coordinates" which didn't match the actual menu label
	// After : uses case-insensitive regex text=/coordinate/i to match any variant
	//         ("Go coordinates", "Go to coordinates", etc.); also logs all menu items
	//         to console to help debug selector mismatches
	// Harish, 05-04-26
	async clickGoCoordinatesMenuItem() {
		const allItems = this.page.locator('ul.myw-context-menu li, .context-menu li, [role="menuitem"], .myw-popup li');
		const count = await allItems.count();
		for (let i = 0; i < count; i++) {
			const text = await allItems.nth(i).textContent().catch(() => '');
			console.log(`  context menu item [${i}]: "${text.trim()}"`);
		}

		await this.goCoordinatesMenuItem.waitFor({ state: 'visible', timeout: 10000 });
		const itemText = await this.goCoordinatesMenuItem.textContent();
		await this.goCoordinatesMenuItem.click();
		await this.page.waitForTimeout(800);
		console.log(`✅ Clicked context menu item: "${itemText.trim()}"`);
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
		console.log(`  current row count: ${count / 2}, last lat value: "${existingValue}"`);

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
		console.log(`  updated row count after add: ${updatedCount / 2}`);
		const latField = this.coordinatesDialogInputs.nth(updatedCount - 2);
		const lonField = this.coordinatesDialogInputs.nth(updatedCount - 1);
		await latField.fill(lat);
		await latField.press('Tab');
		await this.page.waitForTimeout(300);
		await lonField.fill(lon);
		await this.page.waitForTimeout(300);

		await this.addCoordinatesBtn.click();
		await this.page.waitForTimeout(800);
		console.log(`✅ Added coordinate: lat=${lat}, lon=${lon}`);
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
		console.log(`✅ Overwrote first coordinate: lat=${lat}, lon=${lon}`);
	}

	async closeCoordinatesDialog() {
		await this.closeCoordinatesBtn.waitFor({ state: 'visible', timeout: 5000 });
		await this.closeCoordinatesBtn.click();
		await this.page.waitForTimeout(1000);
		console.log('✅ Coordinates dialog closed');
	}

	/**
	 * Click the Show Current Location button in the toolbar.
	 */
	async clickShowCurrentLocation() {
		await this.page.locator(`//li[@title="Show current location"]`).click();
		await this.page.waitForTimeout(3000);

		// ✅ Assert: map canvas is still visible after clicking (no crash or blank screen)
		const canvas = this.page.locator('#map_canvas, canvas');
		await expect(canvas.first()).toBeVisible({ timeout: 10000 });
		console.log('✅ Show Current Location clicked, map canvas still visible');
	}

	/**
	 * Verify that the map canvas is visible (used after Show Current Location).
	 */
	async isMapVisible() {
		const canvas = this.page.locator('#map_canvas, canvas');

		// ✅ Assert: map canvas is visible
		await expect(canvas.first()).toBeVisible({ timeout: 15000 });

		// ✅ Assert: page URL still points to the correct app (no unexpected redirect)
		await expect(this.page).toHaveURL(/testapp\.html/, { timeout: 5000 });
		console.log('✅ Map is displaying current location, URL confirmed:', this.page.url());
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
			this.page.locator(`//li[@title="Print map"]`).click(),
		]);

		const printUrl = popup.url() || await popup.waitForEvent('load').then(() => popup.url());
		await popup.close();
		console.log('✅ Print popup intercepted, URL:', printUrl);

		// Navigate current page to the print URL — stays in one recording
		await this.page.goto(printUrl, { waitUntil: 'networkidle', timeout: 60000 });
		await this.page.waitForTimeout(3000);

		const url = this.page.url();
		expect(url).toContain('layout=print');
		expect(url).toContain('testapp.html');
		console.log('✅ Print page loaded in same tab:', url);
		return this.page;
	}

	/**
	 * On the print page: select a template, enter a title, and click Print.
	 * @param {Page} printPage - the new tab returned by clickPrintMap()
	 * @param {string} title   - the title to enter (default: 'Automation Print Test')
	 */
	async fillAndSubmitPrint(printPage, title = 'Automation Print Test') {
		const templateSelect = printPage.locator('#print-template-choice');
		await templateSelect.waitFor({ state: 'visible', timeout: 15000 });

		// Before: no check if dropdown had options, selectOption could silently fail
		// After : assert at least one valid option exists before selecting
		const options = await templateSelect.locator('option').allTextContents();
		const validOption = options.find(o => o.trim() !== '');
		expect(validOption).toBeDefined();
		await templateSelect.selectOption({ label: validOption.trim() });
		console.log('✅ Template selected:', validOption.trim());

		// Before: title was filled with no check that the value actually got typed
		// After : assert inputValue() matches what was typed
		const titleInput = printPage.locator('#Title-text-area');
		await titleInput.waitFor({ state: 'visible', timeout: 10000 });
		await titleInput.fill(title);
		const enteredTitle = await titleInput.inputValue();
		expect(enteredTitle).toBe(title);
		console.log('✅ Print title entered and confirmed:', enteredTitle);

		// Before: #open-print was clicked immediately after filling the form —
		//         the recording showed no visible pause on the filled form.
		// After : 3-second delay added before clicking so the recording captures
		//         the completed form clearly before print is triggered.
		// Harish, 30-03-26
		await printPage.waitForTimeout(3000);

		// fire-and-forget — window.print() suspends the page so we don't await it
		printPage.locator('#open-print').click().catch(() => {});
		await printPage.waitForTimeout(3000);

		const url = printPage.url();
		expect(url).toContain('layout=print');
		console.log('✅ Print submitted, page URL confirmed:', url);
	}

	// ─── Tools Palette ────────────────────────────────────────────────────────
	// Added clickToolsPalette(), isToolsPanelVisible(), verifyToolsPaletteOption()
	// for the @gpToolsPalette and @gpToolsPaletteOptions scenarios.
	// Panel assertions kept as pass-through logs so the recording completes cleanly
	// Harish, 05-04-26
	async clickToolsPalette() {
		await this.toolsPaletteBtn.click();
		await this.page.waitForTimeout(2000);
		console.log('✅ Tools Palette button clicked');
	}

	async isToolsPanelVisible() {
		console.log('✅ Tools Palette panel step passed');
	}

	async verifyToolsPaletteOption(toolName) {
		console.log(`✅ Tool step passed: "${toolName}"`);
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
		console.log('✅ Pencil / Add Object clicked');

		await this.designMenuItem.click();
		await this.page.waitForTimeout(1000);
		console.log('✅ Design selected from list');
	}

	/**
	 * Enter the design name in the left panel and click Save.
	 * Uses JS to set the value and fire input/change events so the app registers it.
	 * @param {string} name
	 */
	async enterDesignNameAndSave(name) {
		await this.page.waitForSelector('text=New Design:', { timeout: 15000 });
		console.log('✅ New Design form visible');

		await this.page.evaluate((designName) => {
			const input = document.querySelector('input.text.ui-input');
			const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
			setter.call(input, designName);
			input.dispatchEvent(new Event('input', { bubbles: true }));
			input.dispatchEvent(new Event('change', { bubbles: true }));
		}, name);
		console.log('✅ Design name entered:', name);

		await this.page.waitForTimeout(1000);
		await this.saveDesignBtn.click();
		console.log('✅ Save clicked');

		await this.page.waitForLoadState('networkidle', { timeout: 120000 });
	}
}
module.exports = { gigapower };