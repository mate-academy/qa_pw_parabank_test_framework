import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from '../../../common/constants/errors';
import { EMPTY_USERNAME_OR_PASSWORD_ERROR_MESSAGE } from '../../../common/constants/errors';

export class LoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'login.htm';
    this.pageName = 'Login page';

    const rightPanel = this.page.locator('#rightPanel');
    this.errorTitle = rightPanel.getByRole('heading', { name: 'Error!' });
    this.errorMessage = rightPanel.getByText(
      INVALID_CREDENTIALS_ERROR_MESSAGE,
    );
    this.emptyUsernameOrPasswordError = rightPanel.getByText(
      EMPTY_USERNAME_OR_PASSWORD_ERROR_MESSAGE,
    );
  }

  async assertSignInRejected(errorLocator, message) {
    await this.step('Assert sign in was rejected', async () => {
      await expect(this.errorTitle).toBeVisible();
      await expect(this.loginPanel.root).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Log Out', exact: true })).toBeHidden();
    });
    await this.assertErrorMessage(errorLocator, message);
  }

  async assertInvalidCredentials() {
    await this.assertSignInRejected(this.errorMessage, INVALID_CREDENTIALS_ERROR_MESSAGE);
  }

  async assertEmptyCredentials() {
    await this.assertSignInRejected(
      this.emptyUsernameOrPasswordError,
      EMPTY_USERNAME_OR_PASSWORD_ERROR_MESSAGE,
    );
  }
}