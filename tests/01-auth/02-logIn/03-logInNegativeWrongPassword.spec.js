import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { LogInPage } from '../../../src/ui/pages/auth/LogInPage';
import { INVALID_CREDENTIALS } from '../../../src/ui/constants/authMessages';

test.use({ contextsNumber: 2, usersNumber: 2 });

test.beforeEach(async ({ pages, user }) => {
  await signUpUser(pages[0], user, 1);
});

test(`Log in negative test: wrong password`, async ({
  pages,
  user,
}, testInfo) => {
  testInfo.annotations.push({ type: 'severity', description: 'critical' });
  testInfo.annotations.push({ type: 'issue', description: 'BUG-001' });

  // Sign in in another context
  const homePage = new HomePage(pages[1], 2);
  const logInPage = new LogInPage(pages[1], 2);
  user['password'] = 'wrong_password';

  await homePage.open();
  await homePage.submitLogInForm(user);
  await logInPage.assertErrorMessageContainsText(INVALID_CREDENTIALS);
});
