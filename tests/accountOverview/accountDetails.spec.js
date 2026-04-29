import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(
  async ({ page, user, accountOverviewPage, accountDetailsPage }) => {
    await signUpUser(page, user);
    await accountOverviewPage.open();
    await accountOverviewPage.clickFirstAccountLink();
    await accountDetailsPage.assertAccountDetailsVisible();
  },
);

test('Account details page displays account information', async ({
  accountDetailsPage,
}) => {
  await accountDetailsPage.assertAccountDetailsVisible();
});

const filterParameters = [
  { period: 'All', type: 'All', title: 'All periods and All types' },
  { period: 'All', type: 'Credit', title: 'All periods and Credit type' },
  { period: 'All', type: 'Debit', title: 'All periods and Debit type' },
];

filterParameters.forEach(({ period, type, title }) => {
  test.describe('Account activity filtering', () => {
    test(`Filter account activity with ${title}`, async ({
      accountDetailsPage,
    }) => {
      await accountDetailsPage.selectActivityPeriod(period);
      await accountDetailsPage.selectTransactionType(type);
      await accountDetailsPage.clickGoButton();
      await accountDetailsPage.assertAccountDetailsVisible();
    });
  });
});
