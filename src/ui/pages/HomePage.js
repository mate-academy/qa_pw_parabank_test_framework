import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('[name="username"]');
    this.passwordField = page.locator('[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    // eslint-disable-next-line max-len
    this.accountPageTitle = this.page.getByRole('heading', { name: `Accounts Overview` });
    this.logOutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('parabank/index.htm');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill username`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill password`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click Log In button`, async () => {
      await this.logInButton.click();
    })
  }

  async assertAccountPageIsOpened() {
    await this.step(`Assert Accounts page is opened`, async () => {
      await expect(this.accountPageTitle).toBeVisible();
    });
  }

  async assertErrorMessageIsShown(expectedError) {
    await this.step(`Assert error message is shown`, async () => {
      const errorMessage = this.page.locator('#rightPanel p').filter({ hasText: expectedError });
      await expect(errorMessage).toBeVisible();
    });

}

  async assertLogOutLinkIsVisible() {
    await this.step(`Assert Log Out link is visible`, async () => {
      await expect(this.logOutLink).toBeVisible();
    });
  }

  async clickLogOutLink() {
    await this.step(`Click Log Out link`, async () => {
      await this.logOutLink.click();
    });
  }

  async assertLogInFormIsVisible() {
    await this.step(`Assert Log In form is visible`, async () => {
      await expect(this.usernameField).toBeVisible();
      await expect(this.passwordField).toBeVisible();
      await expect(this.logInButton).toBeVisible();
    }); 
}}