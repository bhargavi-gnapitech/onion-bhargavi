const { expect } = require('@playwright/test');
const { StandardApp } = require('./standard');

const fs = require('fs');
const csv = require('csv-parser');
const { geographicArea } = require('../../base_lib/data');
const { locators } = require('../../base_lib/locators');



class Regression extends StandardApp {
	constructor(page) {
		super(page); // Call parent class constructor
		this.page = page; // Ensure the page object is correctly initialized

		
		this.closeObject = this.page.locator(
			`(//span[contains(@class, "ui-icon-closethick")])[2]`
		);
		this.wbsElements = this.page.locator(
			'.ant-table-row.ant-table-row-level-0'
		);
		
		this.btnProjects = this.page.locator(
			`//div[text()='Projects']`
		);
		this.btnSettings = this.page.locator(
			`//div[text()='Settings']`
		);
		this.btnMap = this.page.locator(
			`//div[text()='Map']`
		);
		this.tabWBS = this.page.locator(
			`//div[text()="WBS"]`
		);
		this.tabMaterial = this.page.locator(
			`//div[text()="Material Request"]`
		);
		this.tabMilestone = this.page.locator(
			`//div[text()="Milestones"]`
		);
		this.approvalTab = this.page.locator(
			`(//span[@role='img' and @aria-label='bell' and contains(@class, 'anticon-bell')])[3]`
			
		);
		this.tabPayment = this.page.locator(
			`//div[text()="Payment"]`
		);
		this.tabDeliverable = this.page.locator(
			`//div[text()="Deliverables"]`
		);
		this.btnTemplate = this.page.locator(
			`//span[text()="Template"]`
		);
		this.btnApprove = this.page.locator(
			`//span[text()="Approve"]`
		);
		this.btnReject = this.page.locator(
			`//span[text()="Reject"]`
		);
		this.createProject = this.page.locator(
			`button.ant-btn.css-dev-only-do-not-override-1t32hyu.ant-btn-primary.ant-btn-sm.ant-btn-icon-only`
		);
		// locators for ticket search and expansion
		this.ticketsHeader = this.page.locator(
			'span.ant-typography-secondary:has-text("Tickets")'
		);
		this.searchInput = this.page.locator(
			'(//input[@placeholder="Search Tickets"])[3]'
		);
		this.searchTicket = this.page.locator(
			'(//input[@placeholder="Search"])[1]'
		);

		//Input the ticket Number
		this.expandButtons = this.page.locator(
			'(//*[@id="ticket-drawer-container"]//tr[2]//span/button)[2]'
		);
		this.expandButton1 = this.page.locator(
				'(//*[@id="ticket-drawer-container"]//tr[4]/td[1]/span/button)[2]'

		);
		
		
		this.btnEdit1 = this.page.locator(
			`(//span[@aria-label="edit"])[1]`
		);	
		this.btnEdit2 = this.page.locator(
			`(//span[@aria-label="edit"])[2]`
		);	
		this.projectNameInput = this.page.locator(
			`//input[@placeholder="Enter Project Name"]`
		);
		this.stateSelect = this.page.locator(
			'select'
		);
		this.cityInput = this.page.locator(
			'input[placeholder="Enter City"]'
		);
		this.addressInput = this.page.locator(
			'input[placeholder="Enter Address"]'
		);
		this.zipInput = this.page.locator(
			'input[placeholder="Enter Zip"]'
		);
		this.okayButton = this.page.locator(
			`//span[text()="OK"]`
		);
		this.okclick = this.page.locator(
			`//span[text()="ok"]`
		);
		this.buttonsLocator = this.page.locator(
			`button.ant-btn.css-dev-only-do-not-override-1t32hyu.ant-btn-default.ant-btn-icon-only.ant-input-search-button`
			 
		);
		this.selectLocation = this.page.locator(
			`(//tr[@class='ant-table-row ant-table-row-level-0'])[1]`
		);
		this.contractor = this.page.locator(
			'div.ant-select.ant-select-in-form-item.ant-select-status-success.css-dev-only-do-not-override-1t32hyu.ant-select-single.ant-select-show-arrow'
        );
		this.dycomLocator = this.page.locator(
			'div[title="Dycom"]'
		);
		this.startDateInput = this.page.locator(
			'input[placeholder="Start date"]'
		);
		this.endDateInput = this.page.locator(
			'input[placeholder="End date"]'
		);
		this.updateAdditionalDataButton = this.page.locator(
			"//span[text()='Update Additional Data']"
		);
		this.validateButton = this.page.locator(
			"//button[text()='Validate']"
		);
		this.saveButton1 = this.page.locator(
			"//button[text()='Save']"
		);
		this.newPurchaseOrder= this.page.locator(
			`//div[text()='New']`
		);
		this.textSearch = this.page.locator(
			'#text-search'
		);
        this.designTitle = (designName) => this.page.locator(`[title=" Design:  ${designName}"]`);
		this.openButton = this.page.locator(
			'#delta-owner-tools > li[title="Open"]'
		);
		this.designNameElement = this.page.locator(
			'.delta-owner-map-watermark-text.noselect'
		);
		this.thirdElement = this.page.locator(
			'span.relationship').nth(2); 

		this.designGrid = this.page.locator(
				'#show-results-grid'
		);
		this.gridVisible = this.page.locator(
			   '#results-grid-table_wrapper'
	    );
	    this.gridRows = this.page.locator(
		       '#results-grid-table tbody tr'
        );
		this.toolbarExpandIconContainer = this.page.locator(
			'div.toolbar-expand-icon-container'
		);
		this.checkDesignIcon = this.page.locator(
			'#watermark-toolbar li[title="Check design"]'
		);
		this.publishDesignIcon = this.page.locator(
			'#watermark-toolbar li[title="Publish"]'
		);
		this.startButton = this.page.locator(
			'div.draggable-modal_button-container > button[value="start"]'
		);
		this.secondElement = this.page.locator('.anticon.anticon-interaction').nth(2);
		this.reSubmitButton = this.page.locator(
			"//span[text()='Re-Submit']"
		);
		this.refreshButton = this.page.locator(
			'button.ant-btn.ant-btn-circle.ant-btn-default.ant-btn-icon-only'
		);
		this.columnHeader = this.page.locator(
			`//span[text()='Ticket ID']`
		);	
		this.ticketIDCell = this.page.locator(
			'td.ant-table-cell.ant-table-column-sort.ant-table-cell-row-hover'
		);
		this.searchResultsLocator = this.page.locator("//tr//td[text()='ATT-5631']");
		  // Locators for the tabs
		  this.pendingTab = page.locator("//div[@role='tab' and text()='Pending']");
		  this.othersTab = page.locator("//div[@role='tab' and text()='Others']");
		  // Locators for column titles
		  this.primaryApprover = page.locator("(//span[text()='Primary Approver'])[2]");
		  this.secondaryApprover = page.locator("(//span[text()='Secondary Approver'])[2]");
		  this.viewDetails = this.page.locator(
			`(//span[text()='View Details'])[1]`
		  );
		  this.upload = this.page.locator(
			`//span[text()='Click to Upload']`
		);
		this.fileInput = this.page.locator(`(//input[@type='file' and @style='display: none;'])[2]`);
		this.uploadButton = this.page.locator(`//span[text()='Upload']`);
		this.validation = this.page.locator(
			`//div[text()="Successfully Uploaded"]`
		);
		this.reporting = this.page.locator(
			`//div[text()='Reporting']`
		);
		this.btnSubmit = this.page.locator(
			`//span[text()='Submit']`
		);
        this.btnUnsubmit = this.page.locator(
			`//span[text()='Unsubmit']`
		);
        this.msZeroItem = this.page.locator(
            `//div[text()='MS-0']`
        );
		this.msOneItem = this.page.locator(
            `//div[text()='MS-1']`
        );
         // Define the locator for Delete button
        this.deleteButton = this.page.locator(
            `(//span[text()='Delete'])[1]`
        ); 
        // Define the locator for 'Yes' button 
		this.yesButton = this.page.locator(
            `//span[text()='Yes']`
        );  
		 // Define the locator for 'New' button 
		 this.newButton = this.page.locator(
            `(//span[text()='New'])[2]`
        );  
		 // Define the locator for 'Save' button 
		 this.saveButton = this.page.locator(
            `//span[text()='Save']`
        );  
		 // Define the locator for 'pull from BOM' button 
		 this.pullBOMButton = this.page.locator(
            `//span[text()='Pull from BOM']`
        ); 
		this.dropdownInput = this.page.locator(
			'input[role="combobox"][aria-owns="type_list"]'
		);
        this.reportType = this.page.locator(
			`//div[text()='Materials Catalog Unmatched Specs']`
		); 
		this.formatDropdownInput = this.page.locator(
			'input[role="combobox"][aria-owns="format_list"]'
		);
		this.pdfOption = this.page.locator(
			`//div[text()='PDF']`
		);
		this.runReportButton = this.page.locator(
			`//span[text()='Run Report']`
		);
		this.firstDateInput = this.page.locator(
			`(//input[@placeholder="Select date"])[1]`
		);
		this.firstNowButton = this.page.locator(
			`(//a[text()='Now'])[1]`
		);
		this.secondDateInput = this.page.locator(
			`(//input[@placeholder="Select date"])[2]`
		);
		this.secondNowButton = this.page.locator(
			`(//a[text()='Now'])[2]`
		);
		this.timezoneDropdown = this.page.locator(
			`#timezone`
		);
		this.usCentralOption = this.page.locator(
			`//div[text()='US/Central']`
		);
		this.mun = this.page.locator(
			'.ui-select'
		);
		this.successMessage = this.page.locator(
			'h3:has-text("Project is successfully created!")'
		); 
		this.viewLogs = this.page.locator(
			`//span[text()='View Logs']`
	    ); 
		this.logsDisplay = this.page.locator(
            `//div[text()='Logs: Invoice# 6877']`
        );
		this.addButton = this.page.locator(
			`//span[text()='Add']`
		);
		this.circleButton2 = this.page.locator(
			`(//button[contains(@class, 'ant-btn-circle')])[3]`
		);
        this.phx001G0002402Td = this.page.locator(
			`(//td[text()='PHX001.G0002402.C.01'])[1]`
		);
        this.okButton = this.page.locator(
			`//span[text()='Ok']`
		);
        this.circleButton3 = this.page.locator(
			`(//button[contains(@class, 'ant-btn-circle')])[4]`
		);
        this.td845C = this.page.locator(
			`//td[text()='845C']`
		);
        this.inputNumber = this.page.locator(
			`//input[@class="ant-input-number-input"]`
		);
        this.antInput1 = this.page.locator(
			`(//input[contains(@class, 'ant-input css-dev-only-do-not-override-1t32hyu') and @type='number'])[1]`
		);
        this.antInput2 = this.page.locator(
			`(//input[contains(@class, 'ant-input css-dev-only-do-not-override-1t32hyu') and @type='number'])[2]`
		);
        this.datePickerInput = this.page.locator(
			".ant-picker-input").nth(2);
        this.todayLink = this.page.locator(
			"//a[text()='Today']"
	    );
        this.selectOption = this.page.locator(
			'td.ant-table-cell select'
		);
		this.firstAlertMessage  = this.page.locator(
			'(//div[contains(@class, "ant-alert-message")])[1]'
		);
		this.exButton = this.page.locator(
			`(//td[text()='PHX001'])[2]`
		);
		this.rightArrow = this.page.locator(
			'(//button//span[@role="img" and @aria-label="right"])[3]'
		);
		this.leftArrow = this.page.locator(
			'(//button//span[@role="img" and @aria-label="left"])[3]'
		);
		this.selectedPage = this.page.locator(
			'(//li[@title="4" and contains(@class, "ant-pagination-item")])[2]'
		);
		this.rightClick = this.page.locator(
			'(//li[contains(@class, "ant-pagination-item-3")])[2]'
		);
		this.leftClick = this.page.locator(
			'(//li[contains(@class, "ant-pagination-item-2")])[2]'
		);
		this.selectedClick = this.page.locator(
			'(//li[contains(@class, "ant-pagination-item-4")])[2]'
		);
		this.loadingStatus = this.page.locator(
			`.ant-btn css-dev-only-do-not-override-1t32hyu ant-btn-primary ant-btn-loading`
		);
		this.exportButton =this.page.locator(
			`//button[text()='Export']`
		);
		this.exportAddress =this.page.locator(
			`//button[text()='Address']`
		);
		this.exportCDIF=this.page.locator(
			`//button[text()='CDIF']`
		);
		this.exportShape =this.page.locator(
			`//button[text()='Shape']`
		);
		this.buttonSave = this.page.locator(
			`//button[text()="Save"]`
		);

	}
	async clickButtonSave() {
		await this.buttonSave.waitFor({ state: 'visible', timeout: 300000 });
		await this.buttonSave.click();
	}
	async clickExportButton() {
		await this.exportButton.waitFor({ state: 'visible', timeout: 300000 });
		await this.exportButton.click();
	}
	async clickExportAddress() {
		await this.exportAddress.waitFor({ state: 'visible', timeout: 300000 });
		await this.exportAddress.click();
	}
	async clickExportCDIF() {
		await this.exportCDIF.waitFor({ state: 'visible', timeout: 300000 });
		await this.exportCDIF.click();
	}
	async clickExportShape() {
		await this.exportShape.waitFor({ state: 'visible', timeout: 300000 });
		await this.exportShape.click();
	}

	// Method to click 'Update Additional Data' and perform all necessary steps
    async clickUpdateAdditionalData() {
    // Click 'Update Additional Data' button
    await this.updateAdditionalDataButton.click();

    // Wait for the 5th option in the dropdown and click it
    await this.mun.nth(5).waitFor({ state: 'visible' });
    await this.mun.nth(5).click();

    // Click on 'MESAAZTL' option
    await this.page.click('div[title="MESAAZTL"]');

    // Select and click the 6th option in the dropdown
    await this.mun.nth(6).click();

    // Click on '000102' option
    await this.page.click('div[title="000102"]');

    // Select and click the 7th option in the dropdown
    await this.mun.nth(7).click();

    // Click on 'AlphaD' option
    await this.page.click('div[title="AlphaD"]');

    // Wait for network to be idle before proceeding
    await this.page.waitForLoadState('networkidle', { timeout: 5000 });

    // Click 'Validate' button
    await this.validateButton.click();

    // Click 'Save' button
    await this.saveButton1.click();
}
	 
	async clickSelectedPage() {
		await this.selectedPage.waitFor({ state: 'visible', timeout: 300000 });
		await this.selectedPage.click();
	}
	async clickLeftArrow() {
		await this.leftArrow.waitFor({ state: 'visible', timeout: 300000 });
		await this.leftArrow.click();
	}
	async clickPHX001() {
		await this.exButton.click();
		await this.page.waitForTimeout(5000);
	}
	async clickRightArrow() {
		await this.rightArrow.waitFor({ state: 'visible', timeout: 300000 });
		await this.rightArrow.dblclick();
		await global.page.waitForTimeout(5000);
	}
	async performActions() {
		// Click on the second circle button
		await this.circleButton2.click();

		// Click on the first "PHX001.G0002402.C.01" TD element
		await this.phx001G0002402Td.click();

		// Click on the "Ok" button
		await this.okButton.click();

		// Click on the third circle button
		await this.circleButton3.click();

		// Click on the "845C" TD element
		await this.td845C.click();

		// Click on the "Ok" button
		await this.okButton.click();

		// Fill in the input fields with the value "10"
		await this.inputNumber.fill("10");
		await this.antInput1.fill("10");
		await this.antInput2.fill("10");

		// Click on the date picker input
		await this.datePickerInput.click();

		// Click on the "Today" link
		await this.todayLink.click();

		// Select the "Ansco" option from the select dropdown
		await this.selectOption.selectOption({ value: 'Ansco' });
      }
	   // Method to click the 'Add' button
	   async clickAddButton() {
		    await this.addButton.click();
		    await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	   }
	   async selectAndClickValues() {
			// Wait for the 5th option in the select dropdown and click it
			await this.mun.nth(5).waitFor({ state: 'visible' });
			await this.mun.nth(5).click();
			
			// Click on 'MESAAZTL' option
			await this.page.click('div[title="MESAAZTL"]');
			
			// Select and click the 6th option in the dropdown
			await this.mun.nth(6).click();
			
			// Click on '000102' option
			await this.page.click('div[title="000102"]');
			
			// Select and click the 7th option in the dropdown
			await this.mun.nth(7).click();
			
			// Click on 'AlphaD' option
			await this.page.click('div[title="AlphaD"]');
	   }
		async clickViewLogs() {
			await this.viewLogs.click();
			await this.viewLogs.scrollIntoViewIfNeeded();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickNewButton() {
			await this.newButton.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickSaveButton() {
			await this.saveButton.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
	    async clickPullBOMButton() {
		await this.pullBOMButton.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickSubmitButton() {
			await this.btnSubmit.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickUnsubmitButton() {
			await this.btnUnsubmit.waitFor({ state: 'visible', timeout: 80000 });
			await this.btnUnsubmit.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickMsZeroItem() {
			await this.msZeroItem.click(); // Click the MS-0 item
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickMsOneItem() {
			await this.msOneItem.click(); // Click the MS-0 item
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickDeleteAndConfirm() {
			await this.deleteButton.click();  // Click the Delete button
			await this.yesButton.click();  // Click the Yes button to confirm deletion
			await this.page.waitForTimeout(5000);  // Wait for the action to complete
	    }


		async selectReportTypeOption(reportName) {
			// Click the dropdown to open report options
			await this.dropdownInput.click();

			// Wait for the options to be visible
			await this.page.waitForSelector(`//div[text()='${reportName}']`, { timeout: 5000 });

			// Click on the specified report name
			await this.page.locator(`//div[text()='${reportName}']`).click();
		}
		async fillDateAndTimezone() {
			await this.firstDateInput.click();
			await this.firstNowButton.click();

			await this.secondDateInput.click();
			await this.secondNowButton.click();

			await this.timezoneDropdown.click();
			await this.usCentralOption.click();

			await this.page.waitForTimeout(5000);
		}


			async selectFormatOption(formatType) {
			// Click on the format list input dropdown
			await this.formatDropdownInput.click();
			// Wait for the options to be visible
			await this.page.waitForSelector(`//div[text()='${formatType}']`, { timeout: 5000 });

			// Click on the specified report name
			await this.page.locator(`//div[text()='${formatType}']`).click();

			
		}
			async selectPDFOption() {
			// Click on the PDF option
			await this.pdfOption.click();
		}
			async clickRunReportButton() {
			// Click on the Run Report button
			await this.runReportButton.click();
			await this.page.waitForLoadState('networkidle', { timeout: 800 });
			
		}
/**
 * Selects an option from an Ant Design dropdown based on index and visible text
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {number} index - The 1-based index of the dropdown on the page
 * @param {string} optionText - The visible text of the option to select
 */
	

async  selectDropdownOptionByIndex(page, index, optionText) {
  const dropdownXPath = `(//div[contains(@class, 'ant-select') and contains(@class, 'ant-select-single') and contains(@class, 'ant-select-show-arrow')])[${index}]`;

  await page.locator(dropdownXPath).click();
  await page.locator(`//div[contains(@class, 'ant-select-item-option-content') and text()='${optionText}']`).click();
}




		async clickUploadButton() {
			await this.uploadButton.click();
		}
		async uploadFile() {
			await this.fileInput.waitFor({ state: 'attached' });
			const filePath = "C:\\Users\\BhargaviTallapaneni\\Downloads\\TESTCASES COUNT.xlsx";
			await this.fileInput.setInputFiles(filePath);
		}
		async clickToUpload() {
			await this.upload.click();
		}
	    async clickViewDetailsButton() {
		    await this.viewDetails.click();
	}
		// Method to verify Approver column visibility
		async verifyApproversVisibility() {
			await expect(this.primaryApprover).toBeVisible();
			await expect(this.secondaryApprover).toBeVisible();
		}
		// Method to click the Pending tab
		async clickOthersTab() {
			await this.othersTab.click();
		}

		// Method to verify tab visibility
		async verifyTabsVisibility() {
			await expect(this.pendingTab).toBeVisible();
			await expect(this.othersTab).toBeVisible();
		}

		// Optional method to get the record count (reusable)
		async getSearchResultsCount() {
			return await this.searchResultsLocator.count();
		}

		// Optional method to verify visibility of all records
		async verifySearchResultsVisibility() {
			const count = await this.getSearchResultsCount();
			for (let i = 0; i < count; i++) {
				await expect(this.searchResultsLocator.nth(i)).toBeVisible();
			}
		}
		async clickColumnHeader() {
			// Click the 'Re-Submit' button
			await this.columnHeader.click();
		}
		async handleSorting() {
			try {
			  // Sort in ascending order
			  console.log('Clicking to sort ascending...');
			  await this.columnHeader.click();
			  await this.page.waitForTimeout(5000); // Wait for sorting to apply
		
			  // Cancel sorting (3rd click in Ant Design cancels sorting)
			  console.log('Clicking to cancel sorting...');
			  await this.columnHeader.click();
			  await this.page.waitForTimeout(5000);
		
			  // Sort in descending order
			  console.log('Clicking to sort descending...');
			  await this.columnHeader.click();
			  await this.page.waitForTimeout(5000);
			} catch (error) {
			  console.error('Error handling sorting:', error);
			}
		  }

		async clickRefreshButton() {
		
			// Ensure the circle button is visible before clicking
			await this.refreshButton.waitFor({ state: 'visible' });
		
			// Click the circle button
			await this.refreshButton.click();
		}
		async clickReSubmitButton() {
			// Click the 'Re-Submit' button
			await this.reSubmitButton.click();
		}
		async clickSecondInteractionIcon() {
			// Ensure the element is visible before clicking
			await this.secondElement.waitFor({ state: 'visible' });
		
			// Click the second element
			await this.secondElement.click();
		}
	    // Method to interact with the start button
		async clickStartButton() {
			// Scroll the button into view if needed
			await this.startButton.scrollIntoViewIfNeeded();
			await global.page.waitForTimeout(5000);
			// Perform the click on the Start button
			await this.startButton.click();
		}
		// Method to click on the 'Check design' button
		async clickCheckDesign() {
			await this.checkDesignIcon.click();
		}
		// Method to click on the 'Publish design' button
		async clickPublishDesign() {
			await this.publishDesignIcon.click();
		}
			// Method to interact with the toolbar expand icon
		async expandToolbar() {
			await this.toolbarExpandIconContainer.click();
		}
		async clickShowResultsGrid() {
			// Click on the #show-results-grid element
			await this.designGrid.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async performActionOnThirdElement() {
			// Perform an action on the 3rd element, such as clicking
			await this.thirdElement.click();
		
			// Optionally, log the text content of the 3rd element (for validation)
			const textContent = await this.thirdElement.textContent();
			console.log('Text of the 3rd element:', textContent);
		}
		async clickOpenButton() {
			await this.openButton.click();
		}

	    async searchAndSelectDesign(designName) {
			await this.textSearch.click();
			await this.textSearch.fill(designName);
			await this.page.waitForTimeout(500);
			await this.designTitle(designName).click();
	  }
		async clickSaveButton1() {
			await this.saveButton1.click();
		}
		async clickValidateButton() {
			await this.validateButton.click();
		}
		// // Method to click on 'Update Additional Data'
		// async clickUpdateAdditionalData() {
		// 	await this.updateAdditionalDataButton.click();
		// }
	    // method to fill the start and end dates
	   async fillDates() {
			// Click the Start Date input field and fill it
			await this.startDateInput.click();
			await this.startDateInput.fill('2024-12-17 00:00');
		
			// Click the End Date input field and fill it
			await this.endDateInput.click();
			await this.endDateInput.fill('2024-12-18 00:00');
		
			// Confirm the date selection
			await this.okayButton.click();
	  }
	    async clickDycom() {
			await this.contractor.click();
			// Wait for the "Dycom" element to be visible
			await this.dycomLocator.waitFor({ state: 'visible' });
		
			// Click on the "Dycom" element
			await this.dycomLocator.click();
	  }
	    async selectSearchLocation() {
		   // Wait for the first table row to be visible
		   await this.selectLocation.waitFor({ state: 'visible' });
	
		  // Click the first table row
		   await this.selectLocation.click();
	  }
	    async clickOnGeographicSearchAreaButton() {
		   // Wait for the 5th button to be visible
		   await this.buttonsLocator.nth(4).waitFor({ state: 'visible' });
		
		   // Click the 5th button
		   await this.buttonsLocator.nth(4).click();
	  }
	    async clickOkButton() {
		    await this.okayButton.click();
		    await this.page.waitForTimeout(5000);
	}

	async selectokbutton() {
		await this.okclick.click();
		await this.page.waitForTimeout(5000);
}

	    async fillAddressDetails() {
		    await this.page.selectOption('select', { value: 'AL' });
		    await this.cityInput.fill('HYD');
		    await this.addressInput.fill('HYD');
		    await this.zipInput.fill('134567');
	}
	    async fillProjectName() {
		    await this.projectNameInput.fill('TEST123');
	   }
		async clickEditButton1() {
			await this.btnEdit1.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		async clickEditButton2() {
			await this.btnEdit2.click();
			await this.page.waitForLoadState('networkidle', { timeout: 80000 });
		}
		
		async doubleClickOnTicket(ticketNumber) {
		    const ticketLocator = this.page.locator(`(//span[text()='${ticketNumber}'])[2]`);
		    await ticketLocator.dblclick();
		}
		
			
		async fillFormUsingSpan(arg) {
			console.log("Function called with:", JSON.stringify(arg, null, 2)); // Debug statement
		
			if (!arg || typeof arg !== 'object' || !arg.UUB) {
				throw new Error('Invalid argument provided to fillFormUsingSpan. Expected a non-null object with UUB property.');
			}
		
			const data = arg.UUB; // Extract UUB object
		
			// Fill 'Name' field
			if (data.Name) {
				const nameInput = await this.page.locator('div[name="Name"] input.ui-input');
				if (await nameInput.isVisible()) {
					await nameInput.fill(data.Name);
					console.log(`Filled 'Name' with value: ${data.Name}`);
				} else {
					console.error("Name input not found.");
				}
			}
		
			// Fill 'Ground' field (2nd index in class-based selection)
			if (data.Ground) {
				const groundDropdown = await this.page.locator('.ui-select').nth(1);
				if (await groundDropdown.isVisible()) {
					await groundDropdown.click();
					const groundOption = this.page.locator(`.ant-select-dropdown [title="${data.Ground}"]`);
					await groundOption.click();
					console.log(`Selected 'Ground' with value: ${data.Ground}`);
				} else {
					console.error("Ground dropdown not found.");
				}
			}
		
			// Fill 'FRC' field (3rd index in class-based selection)
			if (data.FRC) {
				const frcDropdown = await this.page.locator('.ui-select').nth(2);
				if (await frcDropdown.isVisible()) {
					await frcDropdown.click();
					const frcOption = this.page.locator(`.ant-select-dropdown [title="${data.FRC}"]`);
					await frcOption.click();
					console.log(`Selected 'FRC' with value: ${data.FRC}`);
				} else {
					console.error("FRC dropdown not found.");
				}
			}
		}
			
		

		async fillForm(arg) {
			console.log("Arguments:", arg);

			if (!arg || typeof arg !== 'object') {
				throw new Error('Invalid argument provided to fillForm. Expected a non-null object.');
			}

			const labels = await this.page.$$('label.ant-form-item-required');
			console.log(`Found ${labels.length} required labels`);

			for (const labelElement of labels) {
				const labelText = (await labelElement.innerText()).replace('*', '').trim();

				if (!arg.hasOwnProperty(labelText)) {
					console.warn(`No matching value found for label: ${labelText}`);
					continue;
				}

				const inputValue = arg[labelText];
				console.log(`Processing '${labelText}' with value: ${inputValue}`);

				const inputId = await labelElement.getAttribute('for');
				if (!inputId) {
					console.error(`No 'for' attribute found for label: ${labelText}`);
					continue;
				}

				const inputSelector = `#${inputId}`;
				const inputHandle = await this.page.$(inputSelector);
				if (!inputHandle) {
					console.error(`No input found for label '${labelText}' (selector: ${inputSelector})`);
					continue;
				}

				console.log(`Processing label: '${labelText}', Expected Value: '${inputValue}'`);

				const tagName = await inputHandle.evaluate(el => el.tagName.toLowerCase());
				const isDropdown = await inputHandle.evaluate(el => el.readOnly);

				// **Dynamically handle search-based selection fields**
				if (typeof inputValue === 'object' && inputValue.ID && inputValue.Market) {
					console.log(`Handling search-based selection for: ${labelText}`);

					// Click on the search button
					const buttonsLocator = await this.page.locator(locators.searchButton);

					if (buttonsLocator) {
						await buttonsLocator.nth(4).click();
						await this.page.waitForTimeout(1000);
					} else {
						console.error("Search button not found.");
						return;
					}

					// Locate and select the correct row in the table
					const { ID, Market } = inputValue;
					const rowSelector = locators.tableRowSelector(ID, Market);
					await this.page.waitForSelector(rowSelector, { state: "visible" });
					const row = await this.page.$(rowSelector);

					if (row) {
						await row.click();
						console.log(`Selected ${labelText}: ID=${ID}, Market=${Market}`);
					} else {
						console.error(`No matching row found for ID=${ID}, Market=${Market}`);
						return;
					}

					// Click the OK button to confirm selection
					const okButton = await this.page.locator(locators.okButton);
					if (await okButton.isVisible()) {
						await okButton.click();
						console.log("Confirmed selection.");
					} else {
						console.error("OK button not found.");
					}
				} 
				
				// **Handle dropdowns**
				else if (isDropdown) {
					console.log(`Handling dropdown: ${labelText}`);
					await this.page.waitForTimeout(5000);

					const dropdownSelector = this.page.locator(locators.dropdownSelector(inputId));
					await dropdownSelector.click();
					await this.page.waitForSelector(locators.dropdownOption(inputValue), { state: 'visible' });
					await this.page.locator(locators.dropdownOption(inputValue)).click();

					console.log(`Selected '${inputValue}' from dropdown for '${labelText}'`);
				} 
				
				// **Handle text inputs (input & textarea)**
				else if (tagName === 'textarea' || tagName === 'input') {
					await inputHandle.fill(inputValue);
					console.log(`Filled '${labelText}' with value: ${inputValue}`);
				} 
				
				else {
					console.warn(`Unhandled tag '${tagName}' for label: ${labelText}`);
				}
			}
		}

		
	 async searchAndExpandTicket(ticketNumber) {
		
			// Wait for the search input to be visible
			await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
	
			// Fill the search input with the ticket number
			console.log(`Searching for ticket number: ${ticketNumber}`);
			await this.searchInput.nth(0).fill(ticketNumber);
	        // Click the first expand button
			console.log("Clicking the first expand button...");
			
			//await this.expandButtons.click();
			await this.expandButton1.click();
            await this.page.waitForLoadState('networkidle', { timeout: 50000 });
			
			
	}

	 async searchAndSelectTicket(ticketNumber) {
		// Wait for the search input to be visible
		await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
	
		// Fill the search input with the ticket number
		console.log(`Searching for ticket number: ${ticketNumber}`);
		await this.searchTicket.fill(ticketNumber);
		await global.page.waitForTimeout(5000);
        // Locate all matching checkboxes and select the second one
		const checkboxes = await this.page.locator('.ant-checkbox-input');
		await checkboxes.nth(1).check();
		// Additional wait to ensure action completion
		await this.page.waitForTimeout(5000);
	}
	

	
	
	
	// Define a reusable function for the "Close" button
	async handleDialogClose() {
		// Click the close button and wait for the network to be idle
		await this.closeObject.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	
	async clickProjectsTab() {
		await this.btnProjects.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickSettingsTab() {
		await this.btnSettings.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickMapIcon() {
		await this.btnMap.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickWBSTab() {
		await this.tabWBS.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickApprovalTab() {
		await this.page.waitForLoadState('networkidle', { timeout: 3000000 });
		await this.approvalTab.click();
		await this.page.waitForLoadState('networkidle', { timeout: 3000000 });
	}
	async clickPaymentTab() {
		await this.tabPayment.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickMaterialsTab() {
		await this.tabMaterial.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickMilestonesTab() {
		await this.tabMilestone.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickDeliverablesTab() {
		await this.tabDeliverable.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickTemplateButton() {
		await this.btnTemplate.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}

	async clickApproveButton() {
		await this.btnApprove.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}
	async clickRejectButton() {
		await this.btnReject.click();
		await this.page.waitForLoadState('networkidle', { timeout: 80000 });
	}

	async clickCreateProject() {
		// Use `this.createProject` instead of `createProject`
		await this.createProject.nth(2).waitFor({ state: 'visible' });
		await this.createProject.nth(2).click();
	}
	async handleDialog(dialogText, buttonText) {
		const dialog = page.locator('.ui-dialog').filter({ hasText: dialogText });
		await dialog.waitFor({ state: 'visible' });  // Ensure the correct dialog is visible
		await dialog.locator('.ui-dialog-buttonset button', { hasText: buttonText }).click();
		await page.waitForTimeout(5000);  // Optional wait, can be removed if not needed
	}
	async clickOnFeature(lat, lon) {
		console.log(`🚀 Clicking on feature at lat: ${lat}, lon: ${lon}`);
	
		// Get canvas element
		const canvasLocator = await this.page.locator('canvas').nth(0);
		await this.page.waitForSelector('canvas', { state: 'visible' });
	
		if (!canvasLocator) {
			throw new Error('Canvas element not found.');
		}
	
		const canvasElement = await canvasLocator.elementHandle();
	
		// Convert lat/lon to pixel coordinates
		const pixelCoords = await this.page.evaluate(([lat, lon]) => {
			if (typeof myw === 'undefined' || !myw.app || !myw.app.map) {
				throw new Error('Map object is not defined.');
			}
	
			console.log('🚀 Getting pixel coordinates for:', lat, lon);
			return myw.app.map.getPixelFromCoordinate([lon, lat]);
		}, [lat, lon]);
	
		console.log('🚀 Converted Pixel Coordinates:', pixelCoords);
	
		// Click on the corresponding pixel position
		const x = pixelCoords[0];
		const y = pixelCoords[1];
	
		try {
			await canvasElement.click({ position: { x, y }, force: true });
			console.log('✅ Successfully clicked on feature at:', x, y);
		} catch (error) {
			console.log('❌ Error clicking on feature:', error);
		}
	}
	
}

module.exports = { Regression };
