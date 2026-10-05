import { test  } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Forgot login info flow', async ({ existingUser, customerLookupPage }) => {
  await severity(Severity.CRITICAL);
  await customerLookupPage.open();
  await customerLookupPage.fillForm(existingUser);
  await customerLookupPage.clickFindMyLoginButton();
  await customerLookupPage.assertCustomerIsFound(
    existingUser.username, existingUser.password
  );
});