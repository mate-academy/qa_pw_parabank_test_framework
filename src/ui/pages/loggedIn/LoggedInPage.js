import { expect } from '@playwright/test';
import { HomePage } from '../HomePage';

export class LoggedInPage extends HomePage {
  constructor(page, userId = 0) {
    super(page, userId);

    this.logOutLink = this.page.locator('#leftPanel').getByRole('link', {
      name: 'Log Out',
      exact: true,
    });
  }

  async assertWelcomeMessageContainsUserName(firstName, lastName) {
    await this.step('Assert welcome message contains user name', async () => {
      await expect(this.welcomeMessage).toContainText(
        `Welcome ${firstName} ${lastName}`,
      );
    });
  }

  async logOut() {
    await this.click(this.logOutLink, 'Log Out');
  }
}
