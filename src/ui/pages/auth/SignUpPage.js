import { expect, testStep } from '../../../common/helpers/pwHelpers';
import { SIGNUP_SUCCESSFUL_SUB } from '../../constants/authMessages';

export class SignUpPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Fields
    this.rightPanelTitle = page.locator('#rightPanel h1.title');
    this.rightPanelSubtitle = page.locator('#rightPanel p').first();

    // Buttons
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign Up' page`, async () => {
      await this.page.goto('/parabank/register.htm');
    });
  }

  async assertSignUpIsSuccessful(user) {
    await this.step(`Assert 'Sign up' success message is shown`, async () => {
      await this.rightPanelTitle.waitFor({ state: 'visible' });
      await expect(this.rightPanelTitle).toContainText(user.username);
      await expect(this.rightPanelSubtitle).toHaveText(SIGNUP_SUCCESSFUL_SUB);
    });
  }
}
