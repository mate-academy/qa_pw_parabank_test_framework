import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amount = page.locator('#amount');
    this.downPayment = page.locator('#downPayment');
    this.fromAccountId = page.locator('#fromAccountId');
    this.sumbitButton = page.getByRole('button', { name: 'Apply Now' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async enterLoanAmount(value) {
    await this.step(`Fill the 'LoanAmount' field`, async () => {
      await this.amount.fill(String(value));
    });
  }

  async enterDownPaymentAmount(value) {
    await this.step(`Fill the 'DownPaymentAmount' field`, async () => {
      await this.downPayment.fill(String(value));
    });
  }

  async clickSubmitButton() {
    await this.sumbitButton.click();
  }

  async assertApprovedLoanMessage() {
    await this.step(`Assert the 'Approved Loan' message`, async () => {
      await expect(
        this.page.getByText('Congratulations, your loan has been approved.'),
      ).toBeVisible();
    });
    await expect(
      this.page.getByRole('row', {
        name: /Status: Approved/,
      }),
    ).toBeVisible();
  }
}
