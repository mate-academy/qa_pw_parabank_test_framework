import { faker } from '@faker-js/faker';

import { test } from '../../_fixtures/fixtures';

import { BillPayPage } from '../../../src/ui/pages/BillPayPage';
import { FindTransactionsPage } from '../../../src/ui/pages/FindTransactionsPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

import {
  INVALID_TRANSACTION_ID_MESSAGE,
  INVALID_DATE_FORMAT_MESSAGE,
  INVALID_AMOUNT_MESSAGE,
} from '../../../src/ui/constants/findTransactionsErrorMessages';

let billPayPage;
let findTransactionsPage;

async function createBillPayment() {
  const payeeName = faker.company.name();
  const accountNumber = faker.string.numeric(8);
  const amount = faker.number.int({ min: 10, max: 500 });

  await billPayPage.clickBillPayLink();
  await billPayPage.assertBillPaymentServiceTitleIsVisible();

  await billPayPage.fillPayeeNameInput(payeeName);
  await billPayPage.fillAddressInput(faker.location.streetAddress());
  await billPayPage.fillCityInput(faker.location.city());
  await billPayPage.fillStateInput(faker.location.state());
  await billPayPage.fillZipCodeInput(faker.location.zipCode());
  await billPayPage.fillPhoneNumberInput(faker.phone.number());
  await billPayPage.fillAccountNumberInput(accountNumber);
  await billPayPage.fillVerifyAccountInput(accountNumber);
  await billPayPage.fillAmountInput(amount);

  await billPayPage.clickSendPaymentButton();
  await billPayPage.assertBillPaymentCompletedSuccessfully();

  return amount;
}

async function openFindTransactionsPage() {
  await findTransactionsPage.clickFindTransactionsLink();
  await findTransactionsPage.assertFindTransactionsTitleIsVisible();
  await findTransactionsPage.assertAccountIsAvailable();
}

async function getCreatedTransactionData(amount) {
  await openFindTransactionsPage();

  await findTransactionsPage.fillAmountInput(amount);
  await findTransactionsPage.clickFindByAmountButton();

  await findTransactionsPage.assertTransactionResultsTitleIsVisible();
  await findTransactionsPage.assertTransactionIsPresent();

  const transactionId = await findTransactionsPage.getFirstTransactionId();

  const transactionDate = await findTransactionsPage.getFirstTransactionDate();

  return {
    transactionId,
    transactionDate,
  };
}

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  billPayPage = new BillPayPage(pages[0]);
  findTransactionsPage = new FindTransactionsPage(pages[0]);
});

test.describe('Find Transactions tests', () => {
  test('User can find transaction by amount', async () => {
    const amount = await createBillPayment();

    await openFindTransactionsPage();

    await findTransactionsPage.fillAmountInput(amount);
    await findTransactionsPage.clickFindByAmountButton();

    await findTransactionsPage.assertTransactionResultsTitleIsVisible();
    await findTransactionsPage.assertTransactionTableIsVisible();
    await findTransactionsPage.assertTransactionIsPresent();
  });

  test('User can find transaction by transaction ID', async () => {
    const amount = await createBillPayment();

    const { transactionId } = await getCreatedTransactionData(amount);

    await openFindTransactionsPage();

    await findTransactionsPage.fillTransactionIdInput(transactionId);
    await findTransactionsPage.clickFindByIdButton();

    await findTransactionsPage.assertTransactionResultsTitleIsVisible();
    await findTransactionsPage.assertTransactionTableIsVisible();
    await findTransactionsPage.assertTransactionIsPresent();
  });

  test('User can find transactions by date', async () => {
    const amount = await createBillPayment();

    const { transactionDate } = await getCreatedTransactionData(amount);

    await openFindTransactionsPage();

    await findTransactionsPage.fillTransactionDateInput(transactionDate);

    await findTransactionsPage.clickFindByDateButton();

    await findTransactionsPage.assertTransactionResultsTitleIsVisible();
    await findTransactionsPage.assertTransactionTableIsVisible();
    await findTransactionsPage.assertTransactionIsPresent();
  });

  test('User can find transactions by date range', async () => {
    const amount = await createBillPayment();

    const { transactionDate } = await getCreatedTransactionData(amount);

    await openFindTransactionsPage();

    await findTransactionsPage.fillFromDateInput(transactionDate);
    await findTransactionsPage.fillToDateInput(transactionDate);

    await findTransactionsPage.clickFindByDateRangeButton();

    await findTransactionsPage.assertTransactionResultsTitleIsVisible();
    await findTransactionsPage.assertTransactionTableIsVisible();
    await findTransactionsPage.assertTransactionIsPresent();
  });

  test('User cannot find transaction with invalid transaction ID', async () => {
    await openFindTransactionsPage();

    await findTransactionsPage.fillTransactionIdInput('invalid');

    await findTransactionsPage.clickFindByIdButton();

    await findTransactionsPage.assertTransactionIdErrorContainsText(
      INVALID_TRANSACTION_ID_MESSAGE,
    );
  });

  test('User cannot find transactions with invalid date', async () => {
    await openFindTransactionsPage();

    await findTransactionsPage.fillTransactionDateInput('invalid');

    await findTransactionsPage.clickFindByDateButton();

    await findTransactionsPage.assertTransactionDateErrorContainsText(
      INVALID_DATE_FORMAT_MESSAGE,
    );
  });

  test('User cannot find transactions with invalid date range', async () => {
    await openFindTransactionsPage();

    await findTransactionsPage.fillFromDateInput('invalid');
    await findTransactionsPage.fillToDateInput('invalid');

    await findTransactionsPage.clickFindByDateRangeButton();

    await findTransactionsPage.assertDateRangeErrorContainsText(
      INVALID_DATE_FORMAT_MESSAGE,
    );
  });

  test('User cannot find transactions with invalid amount', async () => {
    await openFindTransactionsPage();

    await findTransactionsPage.fillAmountInput('invalid');

    await findTransactionsPage.clickFindByAmountButton();

    await findTransactionsPage.assertAmountErrorContainsText(
      INVALID_AMOUNT_MESSAGE,
    );
  });
});
