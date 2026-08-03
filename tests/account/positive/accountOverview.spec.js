import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerNewUser } from '../../../src/ui/actions/auth/register';

test.beforeEach(async ({ registerPage, registrationData }) => {
  await registerNewUser(registerPage, registrationData);
});

test('should show the default account after registration', async ({
  accountsOverviewPage,
  registrationData,
}) => {
  await allure.severity('critical');

  await accountsOverviewPage.open();

  await accountsOverviewPage.assertOpened();
  await accountsOverviewPage.assertWelcomeMessage(
    registrationData.firstName,
    registrationData.lastName,
  );

  await accountsOverviewPage.assertSingleAccountRow();
  await accountsOverviewPage.assertAccountLinkVisible();
  await accountsOverviewPage.assertBalanceFormatted();
  await accountsOverviewPage.assertAvailableAmountFormatted();
  await accountsOverviewPage.assertBalanceEqualsAvailableAmount();
  await accountsOverviewPage.assertTotalEqualsAccountBalance();
});
