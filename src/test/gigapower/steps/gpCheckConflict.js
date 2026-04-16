const { Given, When, Then } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower.js');

let GigaPower;

When('User clicks the Check Design button',{ timeout: 60000 }, async function () {
    GigaPower = new gigapower(global.page);
    await GigaPower.openCheckDesignDialog();
});

When('User unchecks all conflict options',{ timeout: 30000 }, async function () {
    await GigaPower.uncheckAllConflictCheckboxes();
});

When('User checks the conflict options {string}',{ timeout: 60000 }, async function (optionsString) {
    // Parse comma-separated options like "Segments, Connections, Line Of Counts, Other"
    const optionNames = optionsString.split(',').map(opt => opt.trim());
    await GigaPower.checkConflictOptions(optionNames);
    await global.page.waitForTimeout(1000);
});

When('User selects the Start button',{ timeout: 90000 }, async function () {
    // Wait for the dialog to be ready
    await global.page.waitForTimeout(1000);
    
    // Click Start button to begin conflict check
    await GigaPower.clickStartButton();
    
    // Wait for conflict check to complete
    console.log('Waiting for conflict check to complete...');
    await GigaPower.waitForConflictCheckComplete();
});

Then('The app runs the conflict checks and displays the issues',{ timeout: 90000}, async function () {
    // Verify all our wanted options are checked after the check completes
    const optionsToVerify = ['Conflicts', 'Segments', 'Connections', 'Line Of Counts', 'Other'];
    await GigaPower.verifyConflictCheckboxStates(optionsToVerify);
});
