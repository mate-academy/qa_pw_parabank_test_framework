import { test } from '../_fixtures/fixtures';

test('Successful `Sign Up` flow test', async ({ user, signUpPage }) => {
  await signUpPage.open();
  await signUpPage.fillAllFields(user);
  await signUpPage.clickRegisterButton();
  await signUpPage.waitForSuccessMessage(user.username);
});
