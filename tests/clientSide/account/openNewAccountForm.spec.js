import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
    await registerUser(page, user);
});
test('Validate open new account form test', async ({ user, accountsOverviewPage, openAccountPage }) => {
    await accountsOverviewPage.open(user);
    await accountsOverviewPage.assertPageUrl();
    const firstAccountId = await accountsOverviewPage.getFirstAccountId();
    await openAccountPage.open(user);
    await openAccountPage.assertPageTitleIsVisible();
    await openAccountPage.assertAccountTypeOptions();
    await openAccountPage.assertExistingAccountIsVisible(firstAccountId);
})