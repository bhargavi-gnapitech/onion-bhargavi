const locators = {
    searchButton: `button.ant-btn.css-dev-only-do-not-override-1t32hyu.ant-btn-default.ant-btn-icon-only.ant-input-search-button`,
    okButton: `//span[text()="ok"]`,
    dropdownSelector: (inputId) => `#${inputId} >> xpath=ancestor::div[contains(@class, "ant-select")]/div[contains(@class, "ant-select-selector")]`,
    dropdownOption: (value) => `div[title="${value}"]`,
    tableRowSelector: (ID, Market) => `//td[contains(text(), '${ID}')]/following-sibling::td[contains(text(), '${Market}')]`,
};

module.exports = { locators };
