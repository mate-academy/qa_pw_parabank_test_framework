import { test } from '../_fixtures/fixtures';

test('Successful `Sign In` flow test', async ({ user, signInPage }) => {
  await signInPage.open();
  await signInPage.fillUserNameField('Test123');
  await signInPage.fillPasswordField('123123');
  await signInPage.clickLoginBtn();
});
