import { expect } from '@playwright/test';
import { LoggedInPage } from './LoggedInPage';
import { BILL_PAY_ERROR_MESSAGES } from '../../../common/constants/errors';
import { formatCurrency } from '../../../common/helpers/currency';

export class BillPayPage extends LoggedInPage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'billpay.htm';
    this.pageName = 'Bill Pay page';

    const billPayForm = this.page.locator('#billpayForm');
    this.billPayForm = {
      root: billPayForm,
      payeeNameField: billPayForm.locator('[name="payee.name"]'),
      addressField: billPayForm.locator('[name="payee.address.street"]'),
      cityField: billPayForm.locator('[name="payee.address.city"]'),
      stateField: billPayForm.locator('[name="payee.address.state"]'),
      zipCodeField: billPayForm.locator('[name="payee.address.zipCode"]'),
      phoneField: billPayForm.locator('[name="payee.phoneNumber"]'),
      accountNumberField: billPayForm.locator('[name="payee.accountNumber"]'),
      verifyAccountField: billPayForm.locator('[name="verifyAccount"]'),
      amountField: billPayForm.locator('[name="amount"]'),
      fromAccountSelect: billPayForm.locator('[name="fromAccountId"]'),
      sendPaymentButton: billPayForm.getByRole('button', {
        name: 'Send Payment',
      }),

      errors: {
        payeeNameRequiredError: billPayForm.locator('#validationModel-name'),
        addressRequiredError: billPayForm.locator('#validationModel-address'),
        cityRequiredError: billPayForm.locator('#validationModel-city'),
        stateRequiredError: billPayForm.locator('#validationModel-state'),
        zipCodeRequiredError: billPayForm.locator('#validationModel-zipCode'),
        phoneRequiredError: billPayForm.locator('#validationModel-phoneNumber'),
        accountNumberRequiredError: billPayForm.locator(
          '#validationModel-account-empty',
        ),
        accountNumberInvalidError: billPayForm.locator(
          '#validationModel-account-invalid',
        ),
        verifyAccountRequiredError: billPayForm.locator(
          '#validationModel-verifyAccount-empty',
        ),
        verifyAccountInvalidError: billPayForm.locator(
          '#validationModel-verifyAccount-invalid',
        ),
        verifyAccountMismatchError: billPayForm.locator(
          '#validationModel-verifyAccount-mismatch',
        ),
        amountRequiredError: billPayForm.locator('#validationModel-amount-empty'),
        amountInvalidError: billPayForm.locator(
          '#validationModel-amount-invalid',
        ),
      },
    };

    const billPayResult = this.page.locator('#billpayResult');
    this.billPayResult = {
      root: billPayResult,
      title: billPayResult.getByRole('heading', {
        name: 'Bill Payment Complete',
        exact: true,
      }),
      payeeName: billPayResult.locator('#payeeName'),
      amount: billPayResult.locator('#amount'),
      fromAccountId: billPayResult.locator('#fromAccountId'),
    };

    this.billPayError = {
      root: this.page.locator('#billpayError'),
    };
  }

  async submitPayment(payment = {}) {
    await this.open();
    await this.step('Wait for bill pay accounts to load', async () => {
      await expect
        .poll(() => this.billPayForm.fromAccountSelect.locator('option').count())
        .toBeGreaterThan(0);
    });

    const fields = [
      ['payeeNameField', payment.name, 'Payee Name'],
      ['addressField', payment.address, 'Address'],
      ['cityField', payment.city, 'City'],
      ['stateField', payment.state, 'State'],
      ['zipCodeField', payment.zipCode, 'Zip Code'],
      ['phoneField', payment.phone, 'Phone'],
      ['accountNumberField', payment.accountNumber, 'Account Number'],
      ['verifyAccountField', payment.verifyAccount, 'Verify Account'],
      ['amountField', payment.amount, 'Amount'],
    ];

    for (const [field, value, title] of fields) {
      if (value !== undefined) {
        await this.fillField(this.billPayForm[field], String(value), title);
      }
    }

    if (payment.fromAccountId !== undefined) {
      await this.step(`Select from account ${payment.fromAccountId}`, async () => {
        await this.billPayForm.fromAccountSelect.selectOption(String(payment.fromAccountId));
      });
    }

    await this.click(this.billPayForm.sendPaymentButton, 'Send Payment');
  }

  async assertPaymentCompleted({ name, amount, fromAccountId }) {
    await this.step('Assert bill payment is complete', async () => {
      await expect(this.billPayResult.title).toBeVisible();
      await expect(this.billPayResult.payeeName).toHaveText(name);
      await expect(this.billPayResult.amount).toHaveText(formatCurrency(amount));
      await expect(this.billPayResult.fromAccountId).toHaveText(String(fromAccountId));
      await expect(this.billPayForm.root).toBeHidden();
      await expect(this.billPayError.root).toBeHidden();
    });
  }

  async assertPaymentRejected(visibleErrors) {
    await this.step('Assert bill payment was rejected', async () => {
      await expect(this.billPayForm.root).toBeVisible();
      await expect(this.billPayResult.root).toBeHidden();
      await expect(this.billPayError.root).toBeHidden();

      for (const [field, locator] of Object.entries(this.billPayForm.errors)) {
        if (visibleErrors.includes(field)) {
          await expect(locator).toHaveText(BILL_PAY_ERROR_MESSAGES[field]);
        } else {
          await expect(locator).toBeHidden();
        }
      }
    });
  }
}
