import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  TRANSFER_PAGE_ERROR_MESSAGES as errors,
} from '../../../common/constants/errors';
import { formatCurrency } from '../../../common/helpers/currency';

export class TransferPage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'transfer.htm';
    this.pageName = 'Transfer Funds page';

    const transferForm = this.page.locator('#showForm');
    this.transferForm = {
      root: transferForm,
      amountField: transferForm.locator('#amount'),
      fromAccountSelect: transferForm.locator('#fromAccountId'),
      toAccountSelect: transferForm.locator('#toAccountId'),
      transferButton: transferForm.getByRole('button', {
        name: 'Transfer',
        exact: true,
      }),

      errors: {
        emptyAmountError: transferForm
          .locator('[id="amount.errors"]')
          .filter({ hasText: errors.emptyAmountError }),
        invalidAmountError: transferForm
          .locator('[id="amount.errors"]')
          .filter({ hasText: errors.invalidAmountError }),
      },
    };

    const transferResult = this.page.locator('#showResult');
    this.transferResult = {
      root: transferResult,
      title: transferResult.getByRole('heading', {
        name: 'Transfer Complete!',
        exact: true,
      }),
      amountResult: transferResult.locator('#amountResult'),
      fromAccountResult: transferResult.locator('#fromAccountIdResult'),
      toAccountResult: transferResult.locator('#toAccountIdResult'),
    };

    const transferError = this.page.locator('#showError');
    this.transferError = {
      root: transferError,
      errorTitle: transferError.getByRole('heading', { name: 'Error!' }),
      errorMessage: transferError.getByText(INTERNAL_SERVER_ERROR_MESSAGE),
    };
  }

  async transfer({ amount, fromAccountId, toAccountId }) {
    await this.open();
    await this.step('Wait for transfer accounts to load', async () => {
      await expect
        .poll(() => this.transferForm.fromAccountSelect.locator('option').count())
        .toBeGreaterThan(0);
    });
    await this.fillField(this.transferForm.amountField, String(amount), 'Amount');
    await this.step(`Select from account ${fromAccountId}`, async () => {
      await this.transferForm.fromAccountSelect.selectOption(String(fromAccountId));
    });
    await this.step(`Select to account ${toAccountId}`, async () => {
      await this.transferForm.toAccountSelect.selectOption(String(toAccountId));
    });
    await this.click(this.transferForm.transferButton, 'Transfer');
  }

  async assertTransferCompleted({ amount, fromAccountId, toAccountId }) {
    await this.step('Assert transfer is complete', async () => {
      await expect(this.transferResult.title).toBeVisible();
      await expect(this.transferResult.amountResult).toHaveText(formatCurrency(amount));
      await expect(this.transferResult.fromAccountResult).toHaveText(String(fromAccountId));
      await expect(this.transferResult.toAccountResult).toHaveText(String(toAccountId));
      await expect(this.transferForm.root).toBeHidden();
      await expect(this.transferError.root).toBeHidden();
    });
  }

  async assertTransferRejected() {
    await this.step('Assert transfer was rejected', async () => {
      await expect(this.transferError.errorTitle).toBeVisible();
      await expect(this.transferError.errorMessage).toBeVisible();
      await expect(this.transferResult.root).toBeHidden();
      await expect(this.transferForm.errors.emptyAmountError).toBeHidden();
      await expect(this.transferForm.errors.invalidAmountError).toBeHidden();
    });
  }
}
