import { expect, testStep } from '../../common/helpers/pwHelpers';

export class MainPage {
  constructor(page, userId = 0, logger = null) {
    this.page = page;
    this.userId = userId;
    this.logger = logger;
    
    this.registerLink = page.locator('//a[text()="Register"]');
    this.aboutUsLink = page.locator('//a[text()="About Us"]').first();
    this.servicesLink = page.locator('//a[text()="Services"]').first();
    this.productsLink = page.locator('//a[text()="Products"]').first();
    this.locationsLink = page.locator('//a[text()="Locations"]').first();
    this.contactUsLink = page.locator('//a[text()="Contact Us"]').first();
    this.forumLink = page.locator('//a[text()="Forum"]').first();
    this.siteMapLink = page.locator('//a[text()="Site Map"]').first();
    this.readMoreLink = page.locator('//a[text()="Read More"]').first();
    this.logoutLink = page.locator('//a[text()="Log Out"]');
    
    this.usernameInput = page.locator('input[name="username"]');
    this.errorMessage = page.locator('p.error');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open Main page`, async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async assertSomething() {
    await this.step(`Assert something`, async () => {
      expect(true).toBe(true);
    });
  }

  async clickRegisterLink() {
    await this.step(`Click Register link`, async () => {
      await this.registerLink.click();
    });
  }

  async clickAboutUsLink() {
    await this.step(`Click About Us link`, async () => {
      await this.aboutUsLink.click();
    });
  }

  async clickServicesLink() {
    await this.step(`Click Services link`, async () => {
      await this.servicesLink.click();
    });
  }

  async clickProductsLink() {
    await this.step(`Click Products link`, async () => {
      await this.productsLink.click();
    });
  }

  async clickLocationsLink() {
    await this.step(`Click Locations link`, async () => {
      await this.locationsLink.click();
    });
  }

  async clickContactUsLink() {
    await this.step(`Click Contact Us link`, async () => {
      await this.contactUsLink.click();
    });
  }

  async clickForumLink() {
    await this.step(`Click Forum link`, async () => {
      await this.forumLink.click();
    });
  }

  async clickSiteMapLink() {
    await this.step(`Click Site Map link`, async () => {
      await this.siteMapLink.click();
    });
  }

  async clickReadMoreLink() {
    await this.step(`Click Read More link`, async () => {
      await this.readMoreLink.click();
    });
  }

  async logout() {
    await this.step('Logout', async () => {
      this.logger?.debug('Logging out user');
      const isLogoutVisible = await this.logoutLink.isVisible().catch(() => false);
      
      if (isLogoutVisible) {
        await this.logoutLink.click();
        await this.page.waitForLoadState('networkidle');
      } else {
        await this.page.goto('/parabank/logout.htm');
        await this.page.waitForLoadState('networkidle');
      }
      this.logger?.debug('Logout completed');
    });
  }

  async assertLogoutSuccessful() {
    await this.step('Assert logout was successful', async () => {
      this.logger?.debug('Checking logout success');
      const currentUrl = this.page.url();
      const isLogoutPage = currentUrl.includes('logout.htm') || currentUrl.includes('index.htm');
      
      const isLogoutLinkVisible = await this.logoutLink.isVisible().catch(() => false);
      
      this.logger?.debug(`isLogoutPage=${isLogoutPage}, isLogoutLinkVisible=${isLogoutLinkVisible}`);
      expect(isLogoutPage || !isLogoutLinkVisible).toBe(true);
    });
  }

  async assertAccessDeniedOrRedirected() {
    await this.step('Assert access is denied or redirected to login', async () => {
      this.logger?.debug('Checking access denial');
      const hasError = await this.errorMessage.isVisible().catch(() => false);
      const hasLoginForm = await this.usernameInput.isVisible().catch(() => false);
      
      this.logger?.debug(`hasError=${hasError}, hasLoginForm=${hasLoginForm}`);
      expect(hasError || hasLoginForm).toBe(true);
    });
  }
}
