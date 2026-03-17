const { When } = require('@cucumber/cucumber');
const { gigapower } = require('../../../../pages/apps/gigaPower');

When('I debug gigapower methods', async function () {

  const gp = new gigapower(global.page);

  const methodsToTest = [
    'clickApprovalTab',
    'clickSubmitButton',
    'clickCloseButton',
    'clickPaymentsTab',
    'clickMilestone',
    'clickMaterialRequestTab',
    'clickCloseTab'
  ];

  for (const method of methodsToTest) {

    console.log(`\n🔎 Testing method: ${method}`);

    try {

      if (typeof gp[method] !== 'function') {
        console.log(`❌ ${method} does not exist`);
        continue;
      }

      await gp[method]();

      console.log(`✅ ${method} WORKS`);

    } catch (err) {

      console.log(`❌ ${method} FAILED`);
      console.log(`Reason: ${err.message}`);

    }

  }

});