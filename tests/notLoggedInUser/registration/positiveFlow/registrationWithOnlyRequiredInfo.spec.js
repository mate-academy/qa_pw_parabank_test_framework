import { generateUserData } from "../../../../src/common/testData/generateUserInfo";
import { test  } from '../../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Registration flow with only required info', 
  async ({ registrationPage }) => {
  const userData = generateUserData({ phone: '' });
  await severity(Severity.CRITICAL);
  await registrationPage.open();
  await registrationPage.fillForm(userData);
  await registrationPage.clickRegisterButton();
  await registrationPage.assertWelcomeMessageIsDisplayed(userData.username);
});