import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

  test.beforeEach(async ({ page, user }) => {
    await registerUser(page, user);
  });

  test ('Open new account success test', async ({ user, accountsOverviewPage, page, openAccountPage }) => {
    await accountsOverviewPage.open(user);
    await accountsOverviewPage.assertPageUrl();
    const firstAccountId = await accountsOverviewPage.getFirstAccountId();
    await openAccountPage.open(user);
    await openAccountPage.selectAccountType('SAVINGS');
    await openAccountPage.selectExistingAccount(firstAccountId);
    await openAccountPage.clickOpenNewAccountButton();

    await openAccountPage.assertNewAccountOpenTitleIsVisible('Account Opened!');
    await openAccountPage.assertAccountCreatedMessageIsVisible('Congratulations, your account is now open.');
    let newAccountId = await openAccountPage.getNewAccountId();

    await accountsOverviewPage.open(user);
    await accountsOverviewPage.assertAccountIsVisible(newAccountId);
    await accountsOverviewPage.assertAccountBalance(newAccountId, '$100.00');
    await accountsOverviewPage.assertAccountAvailableAmount(newAccountId, '$100.00');
  })
