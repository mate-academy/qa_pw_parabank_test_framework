import { test } from '../../_fixtures/fixtures';
import { INTERNAL_ERROR } from '../../../src/ui/constants/authMessages';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const testParameters = [
  {
    amount: '',
    downPayment: '100',
    message: INTERNAL_ERROR,
    title: 'Ammount is empty',
  },
  {
    amount: '100',
    downPayment: '',
    message: INTERNAL_ERROR,
    title: 'Down Payment is empty',
  },
  {
    amount: '',
    downPayment: '',
    message: INTERNAL_ERROR,
    title: 'Ammount and Down Payment are empty',
  },
  {
    amount: 'ololo',
    downPayment: 'ololo',
    message: INTERNAL_ERROR,
    title: 'Ammount and Down Payment are invalid',
  },
];

test(`Request Loan with invalid data`, async ({
  page,
  requestLoanPage,
  accountServicesPanel,
  overviewPage,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'minor' });

  // Create new user
  await signUpUser(page, user);

  let accountRows;
  let totalBalance;

  // Check account summary
  await test.step('Account overview and check balance summary', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    accountRows = await overviewPage.getAllRowsData();
    totalBalance = await overviewPage.getTotalBalanceText();
  });

  for (const { amount, downPayment, message, title } of testParameters) {
    await test.step(`- Request Loan when ${title}`, async () => {
      await accountServicesPanel.clickRequestLoanLink();
      await requestLoanPage.submitLoanForm(amount, downPayment);
      await requestLoanPage.assertErrorMessageContainsText(message);
    });
  }

  // Check account summary
  await test.step('Verify that user has only one account number', async () => {
    await accountServicesPanel.clickAccountsOverviewLink();
    await overviewPage.assertCheckAccountAndBalance(accountRows, totalBalance);
  });
});
