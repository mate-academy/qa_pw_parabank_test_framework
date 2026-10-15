import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class LogOutPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.logOutLink = page.getByRole('link', {
      name: 'Log Out',
    });

    this.loginPanel = page.locator('#loginPanel');
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', {
      name: 'Log In',
    });

    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });
  }

  async step(title, action) {
    return await testStep(title, action, this.userId);
  }

  async logOut() {
    await this.step('Log out from ParaBank', async () => {
      await expect(this.logOutLink).toBeVisible();

      await this.logOutLink.click();
    });
  }

  async assertUserLoggedOut() {
    await this.step('Assert user was logged out', async () => {
      await expect(this.loginPanel).toBeVisible();
      await expect(this.usernameField).toBeVisible();
      await expect(this.passwordField).toBeVisible();
      await expect(this.loginButton).toBeVisible();

      await expect(this.accountsOverviewLink).toHaveCount(0);
      await expect(this.logOutLink).toHaveCount(0);
    });
  }

  async assertProtectedPageRequiresLogin() {
    await this.step(
      'Assert protected page requires authentication',
      async () => {
        await this.page.goto('/parabank/overview.htm');

        await expect(this.loginPanel).toBeVisible();
        await expect(this.accountsOverviewLink).toHaveCount(0);
      },
    );
  }
}
