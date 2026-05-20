import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class OpenAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.openAccountResultPanel = page.locator('#openAccountResult');
    this.newAccountIdLink = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Navigate to 'Open New Account' page`, async () => {
      await this.page.goto(`openaccount.htm`);
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select Account Type='${accountType}'`, async () => {
      await this.accountTypeDropdown.selectOption(accountType);
    });
  }

  async selectFromAccountId(fromAccountId) {
    await this.step(`Select From Account ID='${fromAccountId}'`, async () => {
      await this.fromAccountDropdown.selectOption(fromAccountId);
    });
  }

  async selectFromAccountIdByIndex(dropdownIndex) {
    await this.step(
      `Select From Account ID index=${dropdownIndex}`,
      async () => {
        await this.fromAccountDropdown.selectOption({ index: dropdownIndex });
      },
    );
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click 'Open New Account' button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertOpenAccountResultContainsText(message) {
    await this.step(`Assert the '${message}' is shown`, async () => {
      await expect(this.openAccountResultPanel).toContainText(message);
    });
  }

  async assertNewAccountIdIsVisible() {
    await this.step(`Assert new Account ID is shown`, async () => {
      await expect(this.newAccountIdLink).toBeVisible();
    });
  }
}
