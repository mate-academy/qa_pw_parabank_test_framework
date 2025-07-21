import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameOnHomePage = page.locator('#rightPanel h1');
    this.welcomeMessage = page.locator('#rightPanel p');
    this.accountOverview = page.locator('#showOverview h1');
    this.logOut = page.getByRole('link', {name: 'Log Out'});
    this.updateContactInfo = page.getByRole('link', {name: 'Update Contact Info'});
    this.updateProfileButton = page.getByRole('button', {name: 'Update Profile'});
    this.profileUpdatedMessage = page.locator('#updateProfileResult p');
    this.loginForm = page.locator('#leftPanel h2');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async goToUpdateContactInfoPage() {
    await this.step(`go to update contact info page`, async () => {
      await this.updateContactInfo.click();
    });
  }

  async clickLogOut() {
    await this.step(`click logout button`, async () => {
      await this.logOut.click();
    });
  }

  async clickUpdateProfile() {
    await this.step(`click update profile button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertUsername(username) {
    await this.step(`username is displayed corectly`, async () => {
      await expect(this.usernameOnHomePage).toHaveText(`Welcome ${username}`);
    });
  }

  async assertWelcomeText(text) {
    await this.step(`welcome text is displayed corectly`, async () => {
      await expect(this.welcomeMessage).toHaveText(text);
    });
  }

  async assertAccountsOverviewText() {
    await this.step(`accounts uverview text is visible`, async () => {
      await expect(this.accountOverview).toHaveText('Accounts Overview');
    });
  }

  async assertProfileUpdatedMessage(value) {
    await this.step(`assert profile updated message`, async() => {
      await expect(this.profileUpdatedMessage).toContainText(value);
    });
  }

  async assertLoginFormIsVisible() {
    await this.step(`assert login form is visible`, async() => {
      await expect(this.loginForm).toContainText('Customer Login');
    });
  }
}
