import { test as base } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { OverviewPage } from '../../src/ui/pages/loggedIn/OverviewPage';

export const test = base.extend<{
  registeredUser;
}>({
  registeredUser: async ({ page, user }, use) => {
    await signUpUser(page, user);

    const overviewPage = new OverviewPage(page);
    await overviewPage.open();
    const [accountId] = await overviewPage.getAccountIds();

    await use({ user, accountId });
  },
});
