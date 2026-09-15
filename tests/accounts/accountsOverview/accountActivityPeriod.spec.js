import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { ACTIVITY_PERIOD } from '../../../src/ui/constants/accountConstants';

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;
  await allure.severity('normal');
});

test('User can change Accounts Activity Period', async ({
  accountsOverviewPage,
}) => {
  await accountsOverviewPage.goToAccountsOverview();
  await accountsOverviewPage.clickAccount();
  await accountsOverviewPage.selectActivityPeriod(ACTIVITY_PERIOD[4]);

  await accountsOverviewPage.verifySelectedActivityPeriod(ACTIVITY_PERIOD[4]);

  await accountsOverviewPage.selectActivityPeriod(ACTIVITY_PERIOD[6]);

  await accountsOverviewPage.verifySelectedActivityPeriod(ACTIVITY_PERIOD[6]);
});
