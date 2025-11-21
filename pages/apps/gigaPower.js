const { expect } = require('@playwright/test');
const { StandardApp } = require('./standard');
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
		console.log('🚀👊 ~ file: standard.js:290 ~ coordines:', coordinates);

		// Ensure coordinates are valid
		if (!coordinates || coordinates.length < 4) {
			throw new Error('Invalid coordinates provided for the polygon.');
		}

		const canvasLocator = await this.page.locator('canvas').nth(0);
		await this.page.waitForSelector('canvas', { state: 'visible' });

		if (!canvasLocator) {
			throw new Error('Canvas element not found.');
		}

		const canvasElement = await canvasLocator.elementHandle();

		// Convert the coordinates into numbers and fit the view
		await this.page.evaluate((coordinates) => {
			const parsedCoordinates = coordinates.map((coo) => {
				const parts = coo.split(',');
				if (parts.length !== 2) {
					throw new Error('Invalid coordinate format.');
				}
				return [parseFloat(parts[0]), parseFloat(parts[1])];
			});

			const extent = myw.proj.toProjExtent(
				[
					[
						parsedCoordinates[0][0],
						parsedCoordinates[2][1],
						parsedCoordinates[1][0],
						parsedCoordinates[1][1],
					],
				],
				'EPSG:3857'
			);

			console.log('Projected extent:', extent);

			myw.app.map.getView().fit(extent, { maxZoom: 9 });
			// myw.app.map.getSize();
		}, coordinates);

		// Wait for the map to adjust the view
		await this.page.waitForTimeout(100000);

		// Capture pixel data for each coordinate
// 		const msgPromise = this.page.waitForEvent('console');
// 		await this.page.evaluate((coordinates) => {
// 			let pxls_d = [];
// 			console.log('🚀👊 ~ coordinates:', coordinates);
// 			coordinates.forEach((coo) => {
// 				const parts = coo.split(',');
// 				const lon = parseFloat(parts[0]);
// 				const lat = parseFloat(parts[1]);
// 					console.log('🚀👊 ~ lon:', lon, 'lat:', lat);
// 				// if (isNaN(lon) || isNaN(lat)) {
// 				// 	throw new Error('Invalid longitude or latitude.');
// 				// }

// 				// Project the coordinates using toProjExtent
// 				const projExtent = myw.proj.toProjExtent(
// 					[[lon, lat]],
// 					'EPSG:3857'
// 				);
// console.log('🚀👊 ~ projExtent:', projExtent);
// 				myw.app.map
// 					.getView()
// 					.fit(
// 						myw.proj.toProjExtent([[lon, lat]], 'EPSG:3857'),
// 						myw.app.map.getSize()
// 					);

// 				// Convert the projected extent to pixels
// 				const pixelCoords = myw.app.map.getPixelFromCoordinate([
// 					projExtent[0],
// 					projExtent[1],
// 				]);
// 				pxls_d.push(pixelCoords);
// 			});

// 			console.log(pxls_d); // Log pixel values
// 		}, coordinates);

// 		const msg = await msgPromise;
// 		const pxldata = await msg.args()[0].jsonValue();


const pxldata = await this.page.evaluate((coordinates) => {
  const pxls_d = [];

  coordinates.forEach((coo) => {
    const parts = coo.split(',');
    const lon = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);

    const projExtent = myw.proj.toProjExtent([[lon, lat]], 'EPSG:3857');

    myw.app.map.getView().fit(
      myw.proj.toProjExtent([[lon, lat]], 'EPSG:3857'),
      myw.app.map.getSize()
    );

    const pixelCoords = myw.app.map.getPixelFromCoordinate([
      projExtent[0],
      projExtent[1],
    ]);

    pxls_d.push(pixelCoords);
  });

  return pxls_d; // ✅ Return it instead of console.log
}, coordinates);


		console.log('🚀👊 ~ Pixel data:', pxldata, pxldata.length);

		// Click on the corresponding points on the canvas
		for (let i = 0; i < pxldata.length; i++) {
			const coord = pxldata[i];
			const x = coord[0];
			const y = coord[1];

			if (i === 3) {
				// Double-click on the last point to complete the polygon
				await canvasElement.dblclick({
					position: { x, y },
					force: true,
				});
				console.log('???? ~ Double Click:', x, y, '|', i);
			} else {
				// Single-click on other points
				try {
					await canvasElement.click({
						position: { x, y },
						force: true,
					});
					console.log('???? ~ Single Click:', x, y, '|', i);
					await this.page.waitForTimeout(500);
				} catch (error) {
					console.log('Error during click:', error);
				}
			}
		}
	}
}
module.exports = { gigapower };