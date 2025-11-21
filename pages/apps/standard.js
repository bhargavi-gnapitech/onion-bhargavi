const { expect } = require('@playwright/test');

class StandardApp {
	/**
	 *
	 * @param {import('@playwright/test').page} page
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-04
	 *
	 */
	constructor(page) {
		this.page = page;
		this.btnAddObject = this.page.locator('#a-createFeature');

		this.btnAddAndMangeBookmark = this.page.locator('#a-bookmarks'); // Add and mange bookmarks button
		this.ipBookmarkTitle = this.page.locator(
			'input.text.ui-input[name="myw_title"]'
		); // Bookmark title  input field

		this.btnBookmarkTab = this.page.locator(
			'button[type="button"].ui-button.ui-corner-all.ui-widget'
		); // Bookmark tab buttons locator

		this.btnCloseMangeBookmark = this.page.locator(
			`(//button[@type='button' and contains(@class, 'right') and text()='Close'])[last()]`
		);

		this.tabNavControl = this.page.locator('#tabControl_nav');
		this.btnSaveDesign = this.page.locator(
			'.feature-edit-actions button.save'
		);
		this.ipDesignName = this.page.locator(
			'.feature-edit-input div[name="Name"] input.text.ui-input'
		);

		// open design button
		this.detailsTabBtnOpenDesign = this.page.locator(
			'.delta-owner-toolbar>ul[id="delta-owner-tools"]>li[title="Open"]'
		);

		//  Details Tab
		this.detailsTabBtnEdit = this.page.locator('#details-editable');

		//Design Object in Details Tab
		this.detailsTabDsnObjDdState = this.page.locator(
			'div[name="State"] .ant-select'
		);

		this.detailsTabBtnClearResults = this.page.locator('#clear-results');

		this.detailsTabBtnSave = this.page.locator(
			'button.ui-button.primary-btn.save'
		); // SAVE button display when you edit an an object in Details Tab
	}

	/**
	 *
	 * @param {*} args
	 * we can pass the args to fill mandatory feilds  to create design
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-04
	 */
	async designDetails(args) {
		await this.ipDesignName.fill(args);
	}

	/**
	 *  This is to open the design
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-04
	 */
	async openDesign() {
		//console.log('Clicking open design button');
		//console.log(await this.detailsTabBtnOpenDesign.isVisible()); // Log visibility of the button
		await this.page.waitForTimeout(1200);
		await this.detailsTabBtnOpenDesign.click();
	}

	/**
	 * Function to check if a point is inside a polygon
	 *
	 * @param {*} point - the coodinates of an point
	 * @param {*} polygon - The coodinates of polygon
	 * @returns boolean ture if the point is inside polygon coordinate or else its false
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-04
	 */
	async isPointInPolygon(point, polygon) {
		const [x, y] = point;
		let inside = false;
		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			const [xi, yi] = polygon[i];
			const [xj, yj] = polygon[j];
			const intersect =
				yi > y !== yj > y &&
				x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
			if (intersect) inside = !inside;
		}
		return inside;
	}

	/**
	 * This method can be used only when the prevCurrentFeature is design
	 *
	 * This method will max sure the pole is added to the design Bounds only
	 *
	 * @param {*} poleCoordinate - coordinates pole to be added
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-08
	 */
	async addPoletoDesgin(poleCoordinate) {
		//const canvasLocators = await this.page.locator('//*[@id="feature-plugins-details"]/div[5]/div/div[3]/div/div[2]/div[1]/div[9]/div/div/canvas[1]');
		const canvasLocators = await this.page.locator('//*[@id="map_canvas"]');
		if (!canvasLocators) {
			throw new Error('Canvas element not found.');
		}

		const canvasElements = await canvasLocators.elementHandle();

		const msgPromises = this.page.waitForEvent('console');

		await this.page.evaluate((poleCoordinate) => {
			// From here we get design coordinates
			const designCoordinates =
				myw.app.prevCurrentFeature.geometry.coordinates;

				

			let designCorrdinatesToPixel = [];

			for (let i = 0; i < designCoordinates[0].length; i++) {
				const coord = designCoordinates[0][i];

				let pxl_coversion = myw.app.map.getPixelFromCoordinate([
					parseFloat(coord[0]),
					parseFloat(coord[1]),
				]);

				designCorrdinatesToPixel.push(pxl_coversion); // pushing design coordinates into array after pixel converstion
			}

			let pxls_ds = [];

			// Function to check if a point is inside a polygon
			// fixme - have to move to other function and access in evaluate
			function isPointInPolygon(point, polygon) {
				// Extract the x and y coordinates of the point to check
				const [x, y] = point;

				// Initialize a flag to determine if the point is inside the polygon
				let inside = false;

				// Loop through each edge of the polygon
				// 'i' is the current vertex and 'j' is the previous vertex (or the last vertex when 'i' is 0)
				for (
					let i = 0, j = polygon.length - 1;
					i < polygon.length;
					j = i++
				) {
					const [xi, yi] = polygon[i]; // Extract the x and y coordinates of the current vertex (xi, yi)
					const [xj, yj] = polygon[j]; // Extract the x and y coordinates of the previous vertex (xj, yj)
					const intersect =
						yi > y !== yj > y && // // Is the point between the y bounds of the edge?
						x < ((xj - xi) * (y - yi)) / (yj - yi) + xi; // Is the point to the left of the edge?

					// If the point intersects the edge, toggle the 'inside' flag
					if (intersect) inside = !inside;
				}
				// Return true if the point is inside the polygon, false otherwise
				return inside;
			}

			const [longitude, latitude] = poleCoordinate;

			let pxlss = myw.app.map.getPixelFromCoordinate([
				longitude,
				latitude,
			]);
			pxls_ds.push(pxlss);

			// Check if the point is inside the polygon
			// if (!isPointInPolygon(pxlss, designCorrdinatesToPixel)) {
			// 	throw new Error('Point is outside the polygon bounds.');
			// }

			console.log(pxls_ds);
		}, poleCoordinate);

		const msgs = await msgPromises;

		var pxldatas = await msgs.args()[0].jsonValue();

		if (!pxldatas || pxldatas.length === 0) {
			throw new Error('Pixel data is empty or undefined.');
		}

		const coord = pxldatas[0];
		console.log("coord",coord)
		if (!Array.isArray(coord) || coord.length < 2) {
			throw new Error('Invalid pixel data format.');
		}
		const x = parseFloat(coord[0]);
		const y = parseFloat(coord[1]);

		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error(`Invalid coordinate values: x=${x}, y=${y}`);
		}

		await canvasElements.click({ position: { x, y } });
	}

	/**
	 * This method is used to add object by using the object id
	 *
	 * @param {*} objectId
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-05
	 */
	async addObject(objectId) {
		await this.btnAddObject.click();
		await this.page.locator(`#${objectId}`).click();
		//await this.page.locator(`#${objectId}`).click();
	}

	/**
	 * This function is used to close the results on details tab by a click
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-07
	 */
	async clearResultsDetailsTab() {
		await this.detailsTabBtnClearResults.click();
	}

	/**
	 * prerequisites  is to select design and before opening
	 *
	 * @param {*} state -> Select  state which is in dropdown state
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-06
	 */
	async changeDesignState(state) {
		await this.page.locator('#details-editable').click();
		await this.page.locator('div[name="State"] .ant-select').click();
		await this.page
			.locator(`.ant-select-item-option[title="${state}"]`)
			.click();
		await this.page.locator('button.ui-button.primary-btn.save').click();
	}

	async openExistingBookmark(bookmark_name) {
	try {
		// Locate the list of bookmarks
		const listOfBookmarks = this.page.locator('span.listBookmarkName');  //#bookmark_86
		
		// Wait for the bookmark to be visible and stable before interacting
		await listOfBookmarks.locator(`text="${bookmark_name}"`).waitFor({
			state: 'visible',
			timeout: 10000 // Adjust the timeout if necessary
		});
		
		// Click on the desired bookmark
		await listOfBookmarks.locator(`text="${bookmark_name}"`).click();
		
		// Locate the bookmark item after clicking
		const bookmarkLocator = this.page.locator(`.bookmark-item:has-text('${bookmark_name}')`);
		
		// Wait for the bookmark to be fully loaded and visible
		await bookmarkLocator.waitFor({ state: 'visible', timeout: 10000 });
		
		// Click on the 'Go to' button within the bookmark
		await bookmarkLocator.locator('button[title="Go to"]').click();
	} catch (error) {
		// Catch any errors related to page or context being closed
		if (error.message.includes('Target page, context or browser has been closed')) {
			console.error('The page or browser was closed before the action could complete.');
		} else {
			throw error; // Re-throw if it's a different error
		}
	}
}


	// async openExistingBookmark(bookmark_name) {
	// 	const listOfBookmarks = this.page.locator('#bookmark_86');
	// 	await listOfBookmarks.locator(`text="${bookmark_name}"`).click();
	// 	const bookmarkLocator = page.locator(
	// 		`.bookmark-item:has-text('${bookmark_name}')`
	// 	);
	// 	await bookmarkLocator.waitFor();
	// 	await bookmarkLocator.locator('button[title="Go to"]').click();
	// }

	//------------------------------------------

	/***
	 *
	 * This method make sure which tab is is opened correctly or not
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-04
	 */
	async selectDetailsTab(pTabName) {
		await this.page
			.getByRole('listitem')
			.filter({ hasText: `${pTabName}` })
			.click();
	}

	//---------------------------------------------------------------------

	/**
	 *
	 * @param {*} coordinates of array what you want to click on a array
	 *  example: coordinate--> array [X1,Y1,X2,Y2,X3,Y3,.......]
	 * 
	 * XMin,YMin,
		XMin,YMax,
		XMax,YMax,
		XMax,YMin
	 * 
	 * const coordinates = [
		'-111.78628481069823,33.29225943608999', // bottom-left
		'-111.78628481069823,33.35866934425508', // top-left
		'-111.86679399648924,33.35866934425508', // top-right
		'-111.86679399648924,33.29225943608999'  // bottom-right
		];
	 *
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-04
	 */
	async drawPolygon(coordinates) {
		console.log('🚀👊 ~ file: standard.js:290 ~ coordinates:', coordinates);
		console.log('in drawpolygog');
		const canvasLocator = await this.page.locator('canvas').nth(0);
		await this.page.waitForSelector('canvas', { state: 'visible' });

		if (!canvasLocator) {
			throw new Error('Canvas element not found.');
		}

		const canvasElement = await canvasLocator.elementHandle();

		await this.page.evaluate((coordinates) => {
			// myw.proj.toProjExtent([[77.3674185543975,12.729808627328708,77.93596103486625,13.327863911628171]],'EPSG:3857')
			// myw.app.map.getProjection();
			myw.app.map
				.getView()
				.fit([
					parseFloat(coordinates[0].split(',')[0]),
					parseFloat(coordinates[0].split(',')[1]),
					parseFloat(coordinates[2].split(',')[0]),
					parseFloat(coordinates[1].split(',')[1]),
				]);
		}, coordinates);

		// #fixMe-
		await this.page.waitForTimeout(1000);
		const msgPromise = this.page.waitForEvent('console');
		await this.page.evaluate((coordinates) => {
			let pxls_d = [];

			for (let i = 0; i < coordinates.length; i++) {
				const coo = coordinates[i];
				let pxls = myw.proj.toProjExtent([
					parseFloat(coo.split(',')[0]),
					parseFloat(coo.split(',')[1]),
				]);
				pxls_d.push(pxls);
			}
			console.log(pxls_d);
		}, coordinates);

		const msg = await msgPromise;
		var pxldata = await msg.args()[0].jsonValue();
		console.log(
			'🚀👊 ~ file: standard.js:343 ~ pxldata:',
			pxldata,
			pxldata.length
		);
		debugger;
		for (let i = 0; i < pxldata.length; i++) {
			console.log(i);
			const coord = pxldata[i];

			console.log('🚀👊 ~ file: standard.js:351 ~ coord:', coord);
			const x = coord[0];
			const y = coord[1];
			if (i === 3) {
				// Double click on the last point to complete the polygon
				await canvasElement.dblclick({
					position: { x, y },
					force: true,
				});
				console.log('???? ~ Double Click:', x, y, '|', i);
			} else {
				// single click on other points
				try {
					await canvasElement.click({
						position: { x, y },
						force: true,
					});
					console.log('???? ~ Single Click', x, y, '|', i);
					await this.page.waitForTimeout(500);
				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	async bookmarkTabButtons(button) {
		// const buttons = global.page.locator(
		// 	'button[type="button"].ui-button.ui-corner-all.ui-widget'
		// );
		await this.btnBookmarkTab.locator(`text="${button}"`).click();
	}

	/**
	 * This function is helped to fill the forms or edit the form data
	 * 
	 * @param {*} arg - we need to send fieldName and value to enter in the textarea or selections for respective fieldName
	 * 
	 * Example: designDetails: {
		'Name*': 'Design: ' + Math.random(),
		State: 'designing',
	},
	 * 
	 *  Created by: Mohanish Ravula
	 *  Created on: 2024-08-20
	 */
	async fillForm(arg) {
		// Select all the label elements
		const labels = await this.page.$$(
			'.feature-edit-container .field-name-display'
		);
		// Open the dropdown
		// Select the "Phoenix" option from the Market dropdown
			// const marketDropdown = await global.page.locator('select[name="Market"]');
			// await marketDropdown.selectOption({ value: 'Phoenix' }).click();
			// await page.selectOption('select[name="Market"]', 'Phoenix');
			await global.page.click('select[name="Market"]');
			await global.page.locator('select[name="Market"] >> text=Phoenix').click();

			// Wait for any updates after the selection (if applicable)
			await global.page.waitForLoadState('networkidle', { timeout: 10000 });



		// Loop over each label element
		for (let i = 0; i < labels.length; i++) {
			const labelElement = await labels[i];

			// Get the label text (trim to remove extra spaces)
			const labelText = (await labelElement.innerText()).trim();

			// Check if we have a corresponding input value in the mapping
			if (labelText in arg) {
				const inputValue = await arg[labelText];
				

				// Find the input associated with this label
				const inputElement = await labelElement.evaluateHandle((el) => {
					// Traverse to the corresponding input element

					return el.parentElement.querySelector(
						'.feature-edit-input input, .feature-edit-input textarea, .feature-edit-input .ant-select-selection-search-input'
					);
				});

				// Fill the input field with the appropriate value
				await inputElement.fill(inputValue);

				// If it's a dropdown (like 'State' or 'Group'), you might need to click and select the item
				// if (labelText === 'State' || labelText === 'Group') {
				// 	await inputElement.click();
				// 	await page.keyboard.press('Enter'); // Select the first option (you may need to refine this for specific selections)
				// }
			}
		}
	}
}

module.exports = { StandardApp };