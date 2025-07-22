import { expect, testStep } from '../../common/helpers/pwHelpers';

export class AccountOverviewPage{
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountNumber = page.locator('#accountTable a');
    this.accountOverviewLink = page.getByRole('link', {name: 'Accounts Overview'});
    this.accountNumberOnAccountDetails = page.locator('#accountDetails #accountId');
    this.activityPeriodDropdown = page.locator('#month');
    this.typeDropdown = page.locator('#transactionType');
    this.transactionText = page.locator('#transactionTable tr td').nth(1)
    this.creditAmount = page.locator('#transactionTable tr td').nth(3);
    this.transactionId = page.locator('#rightPanel tr td').nth(1);
    this.newAccountNumber = page.locator('#newAccountId');
    this.dateValue = page.locator('#rightPanel tr td').nth(3);
    this.amountValue = page.locator('#rightPanel tr td').nth(9);
    this.transactionId = page.locator('#rightPanel tr td').nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getAccountNumber() {
    await this.goToAccountOverviewPage();
    return await this.accountNumber.textContent();
  }

  async getTransactionId() {
    return await this.transactionId.textContent();
  }

  async goToAccountOverviewPage() {
    await this.step(`go to account overview page`, async () => {
      await this.accountOverviewLink.click();
    });
  }

  async clickAccountNumber() {
    await this.step(`click account number`, async () => {
      await this.accountNumber.click();
    });
  }

  async clickNewAccountNumber() {
    await this.step(`click new account number`, async () => {
      await this.newAccountNumber.click();
    });
  }

  async clickTransactionDetailsLink() {
    await this.step(`click transaction details link`, async () => {
      await this.transactionText.click();
    });
  }

  async assertAccountNumberOnAccountDetails(number) {
    await this.step(`assert account number on account details`, async () => {
      await expect(this.accountNumberOnAccountDetails).toContainText(number)
    });
  }

  async assertTransactionTextOnAccountActivity() {
    await this.step(`assert transaction text on account activity`, async () => {
      await expect(this.transactionText).toContainText('Funds Transfer Received')
    });
  }

  async assertCreditAmountOnAccountActivity() {
    await this.step(`assert credit amount on account activity`, async () => {
      await expect(this.creditAmount).toContainText('$100.00')
    });
  }

  async assertTransactionIdIsCorrect(id) {
    await this.step(`assert transaction ${id} is correct`, async () => {
      await expect(this.transactionId).toContainText(id);
    });
  }

  async assertDateIsCorrect(date) {
    await this.step(`assert transaction ${date} is correct`, async () => {
      await expect(this.dateValue).toContainText(date);
    });
  }

  async assertAmountIsCorrect(amount) {
    await this.step(`assert transaction ${amount} is correct`, async () => {
      await expect(this.amountValue).toContainText(amount);
    });
  }
}
