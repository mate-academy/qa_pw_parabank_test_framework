import { test } from "../../_fixtures/fixtures";
import { signUpUser } from '../../../src/common/helpers/signUpUser'

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Successful `Sign in` flow test', async ({
  user,
  signInPage,
  homePage
}) => {
  await homePage.clickLogOut()
  await signInPage.fillUsernameField(user.username);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickLogInButton();
  await homePage.assertAccountsOverviewText();
});
