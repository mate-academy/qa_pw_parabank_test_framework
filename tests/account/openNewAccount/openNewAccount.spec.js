import { test } from '../../_fixtures/fixtures';

import { OpenNewAccountPage } from '../../../src/ui/pages/OpenNewAccountPage';
import { AccountActivityPage } from '../../../src/ui/pages/AccountActivityPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

let openNewAccountPage;
let accountActivityPage;

const accountTypes = ['CHECKING', 'SAVINGS'];

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  openNewAccountPage = new OpenNewAccountPage(pages[0]);
  accountActivityPage = new AccountActivityPage(pages[0]);

  await openNewAccountPage.assertOpenNewAccountLinkIsVisible();
  await openNewAccountPage.clickOpenNewAccountLink();

  await openNewAccountPage.assertOpenNewAccountTitleIsVisible();
  await openNewAccountPage.assertSourceAccountIsAvailable();
});

test.describe('Open New Account tests', () => {
  accountTypes.forEach(accountType => {
    test(`User can open new ${accountType} account`, async () => {
      await openNewAccountPage.selectAccountType(accountType);

      await openNewAccountPage.clickOpenNewAccountButton();

      await openNewAccountPage.assertAccountOpenedSuccessfully();

      await openNewAccountPage.clickNewAccountId();

      await accountActivityPage.assertAccountDetailsTitleIsVisible();
      await accountActivityPage.assertAccountTypeContainsText(accountType);
    });
  });
});
