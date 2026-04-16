const { Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');

let GigaPower;

Then('User clicks on Generate BOM report',{ timeout: 60000 }, async function () {
    GigaPower = new gigapower(global.page);
    await GigaPower.clickGenerateBOMButton();
    await global.page.waitForTimeout(1000);
    
    // Click OK button on the BOM confirmation dialog
    const okButton = GigaPower.page.locator('button:has-text("OK")').first();
    await okButton.click();
    
    // Wait 2 seconds for the operation
    await global.page.waitForTimeout(2000);
});

Then('Close the BOM report dialog',{ timeout: 30000 }, async function () {
    
});
