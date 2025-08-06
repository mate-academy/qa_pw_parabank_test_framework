import { test } from '../../_fixtures/fixtures';
import { EMPTY_PAYEE_FORM_ERRORS } from '../../../src/ui/constants/formFillingErrors';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { getFormatedDate } from '../../../src/common/helpers/dateFormater';

const today = getFormatedDate();
const dateRangeCases = [
  {
    fromDate: '',
    toDate: today,
    title: 'from',
  },
  {
    fromDate: today,
    toDate: '',
    title: 'to',
  },
  {
    fromDate: '',
    toDate: '',
    title: 'to and from',
  },
];

test(`Find transactions with empty fields`, async ({
  page,
  user,
  accountServicesPanel,
  findTransactionsPage,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, user);

  await test.step(`- Empty ID field`, async () => {
    await accountServicesPanel.clickFindTransactionsLink();
    await findTransactionsPage.submitFindTransactionsFormById();
    await findTransactionsPage.assertTransactionIdErrorIsVisible();
  });

  await test.step(`- Empty date field`, async () => {
    await accountServicesPanel.clickFindTransactionsLink();
    await findTransactionsPage.submitFindTransactionsFormByDate();
    await findTransactionsPage.assertTransactionDateErrorIsVisible();
  });

  for (const range of dateRangeCases) {
    await test.step(` - Empty ${range.title} field`, async () => {
      await accountServicesPanel.clickFindTransactionsLink();
      await findTransactionsPage.submitFindTransactionsFormByDateRange(
        range.fromDate,
        range.toDate,
      );
      await findTransactionsPage.assertTransactionDateRangeErrorIsVisible();
    });
  }

  await test.step(`- Empty amount field`, async () => {
    await accountServicesPanel.clickFindTransactionsLink();
    await findTransactionsPage.submitFindTransactionsFormByAmount();
    await findTransactionsPage.assertTransactionAmountErrorIsVisible();
  });
});
