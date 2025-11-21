const { expect } = require('@playwright/test');
const { StandardApp } = require('./standard');
const fs = require('fs');
const csv = require('csv-parser');
const { REPORTS } = require('../../base_lib/Reports');
 

class Regression1 extends StandardApp {
	constructor(page) {
		super(page); // Call parent class constructor
		this.page = page; // Ensure the page object is correctly initialized

		
		this.btnSubmit = this.page.locator(
			`//span[text()='Submit']`
		);
        this.btnUnsubmit = this.page.locator(
			`//span[text()='Unsubmit']`
		);
        this.msZeroItem = this.page.locator(
            `//div[text()='MS-0']`
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
    async clickDeleteAndConfirm() {
		await this.deleteButton.click();  // Click the Delete button
		//await this.yesButton.click();  // Click the Yes button to confirm deletion
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


    async selectFormatOption() {
	   // Click on the format list input dropdown
	   await this.formatDropdownInput.click();
	
}
    async selectPDFOption() {
	   // Click on the PDF option
	   await this.pdfOption.click();
}
    async clickRunReportButton() {
	   // Click on the Run Report button
	   await this.runReportButton.click();
	   await this.page.waitForLoadState('networkidle', { timeout: 80000 });
}
}
module.exports = { Regression1 };
