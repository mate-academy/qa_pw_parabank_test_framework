import { expect } from '../../../common/helpers/pwHelpers';
import { BasePage } from '../BasePage';
import {
  TRANSFER_COMPLETE_HELP_TEXT,
  transferCompleteMessage,
} from '../../../common/constants/account/accountMessages';

export class TransferFundsPage extends BasePage {
  constructor(page, userLabel = '') {
    super(page, userLabel);

    this.heading = page.getByRole('heading', { name: 'Transfer Funds' });
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.successHeading = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });
    this.helpText = page.getByText(TRANSFER_COMPLETE_HELP_TEXT);
  }

  async open() {
    await this.step('Open Transfer Funds page', async () => {
      await this.page.goto('/parabank/transfer.htm');
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill Amount with "${amount}"`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select From account "${accountNumber}"`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async selectToAccount(accountNumber) {
    await this.step(`Select To account "${accountNumber}"`, async () => {
      await this.toAccountSelect.selectOption(accountNumber);
    });
  }

  async clickTransferButton() {
    await this.step('Click Transfer button', async () => {
      await this.transferButton.click();
    });
  }

  async clickTransferButtonAndCaptureResponse() {
    return this.step(
      'Click Transfer button and capture the transfer response',
      async () => {
        const [response] = await Promise.all([
          this.page.waitForResponse((res) =>
            res.url().includes('/services_proxy/bank/transfer'),
          ),
          this.transferButton.click(),
        ]);

        return response;
      },
    );
  }

  async assertOpened() {
    await this.step('Assert Transfer Funds page is opened', async () => {
      await expect(this.heading).toBeVisible();
    });
  }

  async assertTransferComplete(amount, fromAccount, toAccount) {
    const formattedAmount = Number(amount).toFixed(2);

    await this.step(
      `Assert $${formattedAmount} transferred from #${fromAccount} to #${toAccount}`,
      async () => {
        await expect(this.successHeading).toBeVisible();
        await expect(
          this.page.getByText(
            transferCompleteMessage(formattedAmount, fromAccount, toAccount),
          ),
        ).toBeVisible();
        await expect(this.helpText).toBeVisible();
      },
    );
  }

  async assertTransferResponseRejected(response) {
    await this.step(
      'Assert the transfer response indicates the transfer was rejected',
      async () => {
        const body = await response.text();

        expect(body).not.toContain('Successfully transferred');
      },
    );
  }
}
