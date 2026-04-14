import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

  test.describe('Account overview tests', () => {

  test('Validate account overview page test', async ({ user, accountsOverviewPage, page }) => {
    await registerUser(page, user);

    await accountsOverviewPage.open(user);
    await accountsOverviewPage.assertPageUrl();
    
    await accountsOverviewPage.assertPageTitleIsVisible();
    await accountsOverviewPage.assertAccountTableIsVisible();
  });
});