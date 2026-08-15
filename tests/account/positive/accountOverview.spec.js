import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';

test.beforeEach(async ({ page, user }) => {
  await registerNewUser(page, user);
});

test('should show the default account after registration', async ({
  accountsOverviewPage,
  user,
}) => {
  await allure.severity('critical');

  await accountsOverviewPage.openAndAssert();

  await accountsOverviewPage.assertWelcomeMessage(
    user.firstName,
    user.lastName,
  );

  await accountsOverviewPage.assertSingleAccountRow();
  await accountsOverviewPage.assertAccountLinkVisible();
  await accountsOverviewPage.assertBalanceFormatted();
  await accountsOverviewPage.assertAvailableAmountFormatted();
  await accountsOverviewPage.assertBalanceEqualsAvailableAmount();
  await accountsOverviewPage.assertTotalEqualsAccountBalance();
});
