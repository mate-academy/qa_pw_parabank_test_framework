import { testStep } from '../../../common/helpers/pwHelpers';

export class LogOutPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.logOutButton = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickLogOutButton() {
    await this.step(`Click 'Log Out' button`, async () => {
      await this.logOutButton.click();
    });
  }
}
