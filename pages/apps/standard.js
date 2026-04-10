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

		// Harish, 07-04-26: updated selector from 'button.save' to '.primary-btn' — matches the actual button class in the app
		this.btnSaveDesign = this.page.locator(
			'.feature-edit-actions .primary-btn'
		);

		// Harish, 07-04-26: moved mapCanvas here from gigapower.js — shared across all app pages so belongs in base class
		this.mapCanvas = this.page.locator('#map_canvas');
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

	// Before: used console event trick to get pixel data from IQGeo internals — brittle and slow
	// After : zooms map using myw.proj.toProjExtent then clicks via page.mouse — stable and faster
	// Harish, 07-04-26: moved improved version from gigapower.js to base class so all apps inherit it
	/**
	 * Draw a 4-point polygon on the map canvas using lat/lon coordinates.
	 * @param {string[]} coordinates - Array of "lon,lat" strings
	 */
	async drawPolygon(coordinates) {
		if (!coordinates || coordinates.length < 4) {
			throw new Error('Invalid coordinates provided for the polygon.');
		}

		// Parse lon/lat from "lon,lat" strings
		const parsed = coordinates.map((coo) => {
			const parts = coo.trim().split(',');
			if (parts.length !== 2) throw new Error(`Invalid coordinate format: "${coo}"`);
			return [parseFloat(parts[0]), parseFloat(parts[1])];
		});

		// Zoom map to the bounding extent of the coordinates using IQGeo's API
		await this.page.evaluate((coords) => {
			const lons = coords.map(c => c[0]);
			const lats = coords.map(c => c[1]);
			const extent = myw.proj.toProjExtent(
				[[Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]],
				'EPSG:3857'
			);
			myw.app.map.getView().fit(extent, { size: myw.app.map.getSize(), maxZoom: 15 });
		}, parsed);

		// Wait for map tiles to render
		await this.page.waitForTimeout(4000);

		// Get fresh canvas bounding box after the map has settled
		const canvas = this.page.locator('canvas').nth(0);
		await canvas.waitFor({ state: 'visible', timeout: 15000 });
		const box = await canvas.boundingBox();
		if (!box) throw new Error('Canvas bounding box not found after map load.');

		// Click 4 positions forming a rectangle — page.mouse avoids DOM-detachment errors
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

	async bookmarkTabButtons(button) {
		// const buttons = global.page.locator(
		// 	'button[type="button"].ui-button.ui-corner-all.ui-widget'
		// );
		await this.btnBookmarkTab.locator(`text="${button}"`).click();
	}

	// Before: used global.page instead of this.page, hardcoded "Phoenix", no null checks, no dropdown/date handling
	// After : uses this.page, generic for any form, handles dropdowns/disabled inputs/date pickers
	// Harish, 07-04-26: moved improved version from gigapower.js to base class so all apps inherit it
	/**
	 * Fill a design form by matching label text to input values.
	 * @param {Object} arg - Map of field label → value e.g. { 'Name': 'Design1', 'State': 'designing' }
	 */
	async fillForm(arg) {
		if (typeof arg !== 'object' || arg === null) {
			throw new Error('Invalid argument provided to fillForm.');
		}

		const labels = await this.page.$$('.field-name-display');

		for (let i = 0; i < labels.length; i++) {
			const labelElement = labels[i];

			// Strip '*' from required field labels and trim whitespace
			const labelText = (
				await (await labelElement.getProperty('innerText')).jsonValue()
			)
				.replace('*', '')
				.trim();

			if (Object.prototype.hasOwnProperty.call(arg, labelText)) {
				const inputValue = arg[labelText];

				const inputHandle = await labelElement.evaluateHandle((el) => {
					const parentDiv = el.closest('div').nextElementSibling;
					return parentDiv
						? parentDiv.querySelector(
								'.feature-edit-input input, .feature-edit-input textarea, select'
						  )
						: null;
				});

				if (inputHandle) {
					const inputElement = await inputHandle.asElement();
					if (inputElement) {
						const tagName = await inputElement.evaluate((el) => el.tagName);

						if (tagName.toLowerCase() === 'select') {
							await inputElement.selectOption({ value: inputValue });
						} else {
							const isDisabled = await inputElement.evaluate((el) => el.disabled);
							if (isDisabled) {
								await this.page.evaluate((el) => el.removeAttribute('disabled'), inputElement);
							}

							if (labelText === 'Est Completion Date') {
								await inputElement.click();
								await this.page.click(`a.ui-state-default:text("${inputValue}")`);
							} else {
								await inputElement.fill(inputValue);
							}
						}
					}
				}
			}
		}
	}
}

module.exports = { StandardApp };