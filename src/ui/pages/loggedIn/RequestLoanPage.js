import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  LOAN_PAGE_MESSAGES,
  LOAN_PROVIDER_NAME,
} from '../../../common/constants/errors';
import { getLoanResponseDate } from '../../../common/helpers/dates';

export class RequestLoanPage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'requestloan.htm';
    this.pageName = 'Loan Request page';

    const requestLoanForm = this.page.locator('#requestLoanForm');
    this.requestLoanForm = {
      root: requestLoanForm,
      loanAmountField: requestLoanForm.locator('#amount'),
      downPaymentField: requestLoanForm.locator('#downPayment'),
      fromAccountSelect: requestLoanForm.locator('#fromAccountId'),
      applyNowButton: requestLoanForm.getByRole('button', {
        name: 'Apply Now',
      }),
    };

    const requestLoanResult = this.page.locator('#requestLoanResult');
    this.requestLoanResult = {
      root: requestLoanResult,
      title: requestLoanResult.getByRole('heading', {
        name: 'Loan Request Processed',
        exact: true,
      }),
      loanProviderName: requestLoanResult.locator('#loanProviderName'),
      responseDate: requestLoanResult.locator('#responseDate'),
      loanStatus: requestLoanResult.locator('#loanStatus'),
      approvedMessage: requestLoanResult.getByText(LOAN_PAGE_MESSAGES.approved, {
        exact: true,
      }),
      newAccountLink: requestLoanResult.locator('#newAccountId'),
      deniedMessage: requestLoanResult.locator('#loanRequestDenied p.error'),
    };

    const requestLoanError = this.page.locator('#requestLoanError');
    this.requestLoanError = {
      root: requestLoanError,
      errorTitle: requestLoanError.getByRole('heading', { name: 'Error!' }),
      errorMessage: requestLoanError.getByText(INTERNAL_SERVER_ERROR_MESSAGE),
    };
  }

  async applyForLoan(loan = {}) {
    await this.open();
    await this.step('Wait for loan accounts to load', async () => {
      await expect
        .poll(() => this.requestLoanForm.fromAccountSelect.locator('option').count())
        .toBeGreaterThan(0);
    });

    if (loan.amount !== undefined) {
      await this.fillField(this.requestLoanForm.loanAmountField, String(loan.amount), 'Loan Amount');
    }
    if (loan.downPayment !== undefined) {
      await this.fillField(
        this.requestLoanForm.downPaymentField,
        String(loan.downPayment),
        'Down Payment',
      );
    }
    if (loan.fromAccountId !== undefined) {
      await this.step(`Select from account ${loan.fromAccountId}`, async () => {
        await this.requestLoanForm.fromAccountSelect.selectOption(String(loan.fromAccountId));
      });
    }

    await this.click(this.requestLoanForm.applyNowButton, 'Apply Now');
  }

  async assertLoanProcessed({ status, message }) {
    return await this.step(`Assert loan is ${status.toLowerCase()}`, async () => {
      await expect(this.requestLoanResult.title).toBeVisible();
      await expect(this.requestLoanResult.loanProviderName).toHaveText(LOAN_PROVIDER_NAME);
      await expect(this.requestLoanResult.responseDate).toHaveText(getLoanResponseDate());
      await expect(this.requestLoanResult.loanStatus).toHaveText(status);
      await expect(this.requestLoanForm.root).toBeHidden();
      await expect(this.requestLoanError.root).toBeHidden();

      if (status === 'Approved') {
        await expect(this.requestLoanResult.approvedMessage).toBeVisible();
        await expect(this.requestLoanResult.deniedMessage).toBeHidden();
        const accountId = (await this.requestLoanResult.newAccountLink.innerText()).trim();
        await expect(this.requestLoanResult.newAccountLink).toHaveAttribute(
          'href',
          new RegExp(`activity\\.htm\\?id=${accountId}$`),
        );
        return accountId;
      }

      await expect(this.requestLoanResult.approvedMessage).toBeHidden();
      await expect(this.requestLoanResult.deniedMessage).toHaveText(message);
    });
  }

  async assertLoanRejected() {
    await this.step('Assert loan request was rejected', async () => {
      await expect(this.requestLoanError.errorTitle).toBeVisible();
      await expect(this.requestLoanError.errorMessage).toBeVisible();
      await expect(this.requestLoanForm.root).toBeHidden();
      await expect(this.requestLoanResult.root).toBeHidden();
    });
  }
}
