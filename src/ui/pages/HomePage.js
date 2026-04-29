import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountCreatedMessage = page.getByText('Your account was created');
    this.logOutButton = page.getByRole('link', { name: 'Log Out' });
    this.forgotLoginInfoButton = page.getByRole('link', {
      name: 'Forgot login info?',
    });
    this.successCustomerLookUp = page.getByText('Your login information was');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('');
    });
  }

  welcomeUser(name) {
    return this.page.getByText(`Welcome ${name}`);
  }

  async clickLogOutButton() {
    await this.step(`Click the 'Log out' button`, async () => {
      await this.logOutButton.click();
    });
  }

  async clickForgotLoginInfoButton() {
    await this.step(`Click the 'Fogot login info?' button`, async () => {
      await this.forgotLoginInfoButton.click();
    });
  }

  async assertAccountCreated(firstName, lastName) {
    await this.step(`Assert the account was created successfully`, async () => {
      await expect(this.welcomeUser(`${firstName} ${lastName}`)).toBeVisible();
      await expect(this.accountCreatedMessage).toBeVisible();
    });
  }

  async assertUserLoggedIn(firstName, lastName) {
    await this.step(
      `Assert the account was successfully logged in`,
      async () => {
        await expect(this.page).toHaveURL(/overview/);
        await expect(
          this.welcomeUser(`${firstName} ${lastName}`),
        ).toBeVisible();
      },
    );
  }
  async assertUserLoggedOut() {
    await this.step(`Assert the user was logged out successfully`, async () => {
      await expect(this.page).toHaveURL(/index/);
    });
  }

  async assertLoginInformationFound(firstName, lastName) {
    await this.step(`Assert the account was created successfully`, async () => {
      await expect(this.welcomeUser(`${firstName} ${lastName}`)).toBeVisible();
      await expect(this.successCustomerLookUp).toContainText(
        'Your login information was located successfully. You are now logged in.',
      );
    });
  }
}
