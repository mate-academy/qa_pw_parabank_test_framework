import { test } from '../../_fixtures/fixtures';
import { REGISTRATION_ERROR_MESSAGES } from '../../../src/ui/constants/registrationMessages';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { RegisterPage } from '../../../src/ui/pages/RegisterPage';
import * as allure from 'allure-js-commons';

test.beforeEach(async ({ registeredUser }) => {
  void registeredUser;
  await allure.severity('critical');
});

test('User cannot register with an existing username', async ({
  user1,
  user2,
  page2,
}) => {
  const homePage2 = new HomePage(page2, 2);
  const registerPage2 = new RegisterPage(page2, 2);

  await homePage2.open();
  await homePage2.clickRegister();
  await registerPage2.fillRegistrationForm(user2);
  await registerPage2.fillUsername(user1.username);
  await registerPage2.submitRegistration();
  await registerPage2.verifyErrorMessage(
    REGISTRATION_ERROR_MESSAGES.usernameExists,
  );
});
