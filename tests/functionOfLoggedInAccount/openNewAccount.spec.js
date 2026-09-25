import { test } from '../_fixtures/fixtures';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';

let client;

test.beforeEach(async ({ page, user }) => {
  client = user;
  const signUpPage = new SignUpPage(page);

  await signUpPage.open();
  await signUpPage.registerUser(client);
  await signUpPage.verifySuccessRegistration(user.username);
});

const accountTypes = ['checking', 'savings'];

for (const accountType of accountTypes) {
  test(`Open New Account - ${accountType}`, async ({
    signUpPage,
    openNewAcountPage,
  }) => {
    await signUpPage.clickOpenNewAccountLink();
    await openNewAcountPage.assertPageTitleIsVisible();

    await openNewAcountPage.selectAccountType(accountType);
    await openNewAcountPage.selectFromAccount();
    await openNewAcountPage.clickOpenAccountButton();
    await openNewAcountPage.assertSuccessfulAccountCreation();
  });
}
