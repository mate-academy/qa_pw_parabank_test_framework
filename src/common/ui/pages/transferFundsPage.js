import { BasePage } from './basePage';
import { expect } from '../../helpers/pwHelpers';

export class TransferFundsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'https://parabank.parasoft.com/parabank/transfer.htm';
  }

  async open() {
    await super.open(this.url);
  }

  async fillTransferForm(fromAccount, toAccount, amount) {
    await this.step(`Fill transfer form`, async () => {
      await this.page.fill('input#amount', amount.toString());
      await this.page.selectOption('select#fromAccountId', fromAccount.toString());
      await this.page.selectOption('select#toAccountId', toAccount.toString());
    });
  }

  async submitTransfer() {
    await this.step(`Submit transfer`, async () => {
      await this.page.click('input[value="Transfer"]');
    });
  }

  async verifyTransferSuccess(amount) {
    await this.step(`Verify transfer success`, async () => {
      await expect(this.page.locator('#rightPanel')).toContainText(`$${amount}`);
      await expect(this.page.locator('#rightPanel')).toContainText('Transfer Complete');
    });
  }
}
