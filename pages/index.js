class IndexPage  {
  constructor(page) {
    this.page=page;
    this.lkLogout = page.locator("#logout-link");
  }

  /**
   * Logout of the app by clicking on the logout link
   * 2024-08-01  Mohanish   Created
   */
  async logout() {
    await this.lkLogout.click();
  }



/**
   * openApp(appHref) -->
   * appHref is usually an HREF element for the app
   * example: appHref--> "standard.html", "mywcom.html"
   *
   * 2024-08-01  Mohanish   Created
   */
  async openApplication(appHref) {	
    console.log("appHref: ", appHref)
    try {
      await Promise.all([
        this.page.waitForSelector(
          `a.box.app_options_box[href="${appHref}"]`
        ),
        this.page
          .locator(`a.box.app_options_box[href="${appHref}"]`)
          .click(),
      ]);
      await this.page.waitForSelector(
        `body[data-myw-application="${appHref}"]`
      );
    } catch (error) {
      console.error("Error clicking app option:", error);
    }
  }


}

module.exports = { IndexPage };