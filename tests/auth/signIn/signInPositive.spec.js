import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.use({ contextsNumber: 2, pageIndex: 1 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user);
});

test('Successful `Sign in` flow test', async ({
  user,
  signInPage,
  homePage,
}) => {
  await homePage.open();

  await signInPage.fillUsernameField(user.username);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickLogInButton();

  await homePage.assertUserLoggedIn(user.firstName, user.lastName);
});
