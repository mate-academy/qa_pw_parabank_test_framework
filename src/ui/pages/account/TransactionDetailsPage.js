import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransactionDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    this.heading = page.getByRole('heading', {
      name: 'Transaction Details',
      level: 1,
    });

    this.transactionId = page
      .getByRole('row', {
        name: /Transaction ID:/,
      })
      .getByRole('cell')
      .nth(1);

    this.date = page
      .getByRole('row', {
        name: /Date:/,
      })
      .getByRole('cell')
      .nth(1);

    this.description = page
      .getByRole('row', {
        name: /Description:/,
      })
      .getByRole('cell')
      .nth(1);

    this.type = page
      .getByRole('row', {
        name: /Type:/,
      })
      .getByRole('cell')
      .nth(1);

    this.amount = page
      .getByRole('row', {
        name: /Amount:/,
      })
      .getByRole('cell')
      .nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertTransactionDetailsPageIsVisible() {
    await this.step('Assert Transaction Details page is visible', async () => {
      await expect(this.heading).toBeVisible();
    });
  }
  async getTransactionId() {
    return await this.transactionId.innerText();
  }

  async getDate() {
    return await this.date.innerText();
  }

  async getDescription() {
    return await this.description.innerText();
  }

  async getType() {
    return await this.type.innerText();
  }

  async getAmount() {
    const amount = await this.amount.innerText();

    return Number(amount.replace('$', ''));
  }

  async assertTransactionAmount(expectedAmount) {
    await this.step(
      `Assert transaction amount is '${expectedAmount}'`,

      async () => {
        await expect(this.amount).toHaveText(`$${expectedAmount}`);
      },
    );
  }

  async assertTransactionID(expectedID) {
    await this.step(
      `Assert transaction ID is '${expectedID}'`,

      async () => {
        await expect(this.transactionId).toHaveText(expectedID);
      },
    );
  }

  async assertTransactionDate(expectedDate) {
    await this.step(
      `Assert transaction ID is '${expectedDate}'`,

      async () => {
        await expect(this.date).toHaveText(expectedDate);
      },
    );
  }

  async getTransactionDetails() {
    return {
      transactionId: await this.getTransactionId(),

      date: await this.getDate(),

      description: await this.getDescription(),

      type: await this.getType(),

      amount: await this.getAmount(),
    };
  }
}
