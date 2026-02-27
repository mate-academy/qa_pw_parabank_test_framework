import { expect, testStep  } from '../../../common/helpers/pwHelpers';

export class LogOutPage{
  constructor (page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.logOutLink = page.getByRole('link', { name: 'Log Out' });
    this.logInButton = page.getByRole('button', { name: 'Log In' });
  
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }


  

  
  async clickLogOutLink() {
    await this.step(`Click the 'Log Out' link`, async () => {
      await this.logOutLink.click();
    });
  }

  

  async assertLogInButtonIsVisible() {
    await this.step(`Assert the 'Log In' button is visible`, async () => {
      await expect(this.logInButton).toBeVisible();
    });
  }

  
}