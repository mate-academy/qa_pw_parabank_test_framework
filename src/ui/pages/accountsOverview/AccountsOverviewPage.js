import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
  }

  welcomeText(firstName, lastName) {
    return this.page.getByText(`Welcome ${firstName} ${lastName}`);
  }

  async assertOpened() {
    await this.step('Assert Accounts Overview page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertWelcomeMessage(firstName, lastName) {
    await this.step(
      `Assert welcome message for "${firstName} ${lastName}"`,
      async () => {
        await expect(this.welcomeText(firstName, lastName)).toBeVisible();
      },
    );
  }
}
