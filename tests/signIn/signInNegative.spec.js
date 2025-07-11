import { test } from '../_fixtures/fixtures';

test('`Sign In` without password flow test', async ({ user, signInPage }) => {
  await signInPage.open();
  await signInPage.fillUserNameField('Test123');
  await signInPage.clickLoginBtn();
  await signInPage.errorTitleIsDisplayed('Error!');
  await signInPage.errorMessageIsDisplayed(
    'Please enter a username and password.',
  );
});

test('`Sign In` without Username flow test', async ({ user, signInPage }) => {
  await signInPage.open();
  await signInPage.fillPasswordField('123123');
  await signInPage.clickLoginBtn();
  await signInPage.errorTitleIsDisplayed('Error!');
  await signInPage.errorMessageIsDisplayed(
    'Please enter a username and password.',
  );
});
