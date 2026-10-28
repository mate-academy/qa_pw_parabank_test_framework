import { test } from '../../_fixtures/fixtures';

import { AccountsOverviewPage } from '../../../src/ui/pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../../src/ui/pages/AccountActivityPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

let accountsOverviewPage;
let accountActivityPage;

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  accountsOverviewPage = new AccountsOverviewPage(pages[0]);
  accountActivityPage = new AccountActivityPage(pages[0]);

  await accountsOverviewPage.clickAccountsOverviewLink();
  await accountsOverviewPage.assertAccountsOverviewTitleIsVisible();
  await accountsOverviewPage.assertAccountLinkIsVisible();
  await accountsOverviewPage.clickFirstAccountLink();
});
test.describe('Account Activity tests', () => {
  test('Logged in user can view account details', async () => {
    await accountActivityPage.assertAccountDetailsTitleIsVisible();
    await accountActivityPage.assertAccountDetailsAreVisible();
    await accountActivityPage.assertAccountActivityTitleIsVisible();
  });

  test('User can select account activity filters', async () => {
    await accountActivityPage.selectActivityPeriod('October');
    await accountActivityPage.selectTransactionType('Credit');

    await accountActivityPage.clickGoButton();

    await accountActivityPage.assertActivityPeriodIsSelected('October');
    await accountActivityPage.assertTransactionTypeIsSelected('Credit');
  });
});
