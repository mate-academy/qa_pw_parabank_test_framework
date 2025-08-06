import { test } from '../../_fixtures/fixtures';
import { EMPTY_PAYEE_FORM_ERRORS } from '../../../src/ui/constants/formFillingErrors';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { getFormatedDate } from '../../../src/common/helpers/dateFormater';

const today = getFormatedDate();
const dateRangeCases = [
  {
    fromDate: '2000-01-01',
    toDate: today,
    title: 'from',
  },
  {
    fromDate: today,
    toDate: '0000-00-00',
    title: 'to',
  },
  {
    fromDate: 'wrong_format',
    toDate: 'wrong_format',
    title: 'to and from',
  },
];

test(`Find transactions with invalid fields`, async ({
  page,
  user,
  accountServicesPanel,
  findTransactionsPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, user);

  await test.step(`- Invalid ID field`, async () => {
    await accountServicesPanel.clickFindTransactionsLink();
    await findTransactionsPage.submitFindTransactionsFormById('wrong_format');
    await findTransactionsPage.assertTransactionIdErrorIsVisible();
  });
  test;
  await test.step(`- Invalid date field`, async () => {
    await accountServicesPanel.clickFindTransactionsLink();
    await findTransactionsPage.submitFindTransactionsFormByDate('wrong_format');
    await findTransactionsPage.assertTransactionDateErrorIsVisible();
  });

  for (const range of dateRangeCases) {
    await test.step(` - Invalid ${range.title} field`, async () => {
      await accountServicesPanel.clickFindTransactionsLink();
      await findTransactionsPage.submitFindTransactionsFormByDateRange(
        range.fromDate,
        range.toDate,
      );
      await findTransactionsPage.assertTransactionDateRangeErrorIsVisible();
    });
  }

  await test.step(`- Invalid amount field`, async () => {
    await accountServicesPanel.clickFindTransactionsLink();
    await findTransactionsPage.submitFindTransactionsFormByAmount(
      'wrong_format',
    );
    await findTransactionsPage.assertTransactionAmountErrorIsVisible();
  });
});
