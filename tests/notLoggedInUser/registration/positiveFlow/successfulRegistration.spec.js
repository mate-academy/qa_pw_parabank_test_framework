import { generateUserData } from "../../../../src/common/testData/generateUserInfo";
import { test  } from '../../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Successful Registration flow', async ({ registrationPage }) => {
  await severity(Severity.CRITICAL);
  const userData = generateUserData();
  await registrationPage.open();
  await registrationPage.fillForm(userData);
  await registrationPage.clickRegisterButton();
  await registrationPage.assertWelcomeMessageIsDisplayed(userData.username);
});