import { test } from '../../_fixtures/fixtures';

test('Successful `Sign up` flow test', async ({ signUpPage, user }) => {
  await signUpPage.open();

  await signUpPage.submitSignUpForm(user);
  await signUpPage.clickRegisterButton();

  await signUpPage.assertWelcomeUserHeadingIsVisible(user.username);
});