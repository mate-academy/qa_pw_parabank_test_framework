import { testStep } from '../../../common/helpers/pwHelpers';
import { ACCOUNT_TYPES } from '../../constants/accountActions';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.newAccountLink = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Open New Account' page`, async () => {
      await this.page.goto('parabank/openaccount.htm');
    });
  }

  async selectNewAccountType(typeKey) {
    await this.step(`Select New Account Type: ${typeKey}`, async () => {
      const optionLabel = typeKey
        ? ACCOUNT_TYPES[typeKey]
        : Object.values(ACCOUNT_TYPES)[0];
      if (!optionLabel) {
        throw new Error(`Unknown account type: ${typeKey}`);
      }
      await this.accountTypeDropdown.selectOption({ label: optionLabel });
    });
  }

  async selectExistingAccountNumber(accountNumber) {
    await this.step(
      `Select account ${accountNumber} to transfer funds into the new account`,
      async () => {
        await this.page
          .locator('#fromAccountId option')
          .first()
          .waitFor({ state: 'attached' });

        if (!accountNumber) {
          accountNumber = await this.page
            .locator('#fromAccountId option')
            .first()
            .getAttribute('value');
        }
        await this.fromAccountDropdown.selectOption(accountNumber);
      },
    );
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click on 'Open New Account' button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async submitNewAccountForm(accountType, account) {
    await this.step(`Submit New Account`, async () => {
      await this.selectNewAccountType(accountType);
      await this.selectExistingAccountNumber(account);
      await this.clickOpenNewAccountButton();
    });
  }

  async getNewAccountNumber() {
    await this.step(`Get created Account number`, async () => {
      await this.newAccountLink.waitFor({ state: 'visible' });
    });
    return await this.newAccountLink.textContent();
  }
}
