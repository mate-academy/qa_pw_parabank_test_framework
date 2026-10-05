import { generateUserData } from "../../../../src/common/testData/generateUserInfo";
import { test  } from '../../../_fixtures/fixtures';
import { MISMATCHED_PASSWORDS_MESSAGE } from "../../../../src/ui/constants/registrationErrors";
import { severity, Severity } from 'allure-js-commons';

  // eslint-disable-next-line max-len
  test(`Registration fails when passwords missmatch`, async ({ registrationPage }) => {
    await severity(Severity.CRITICAL);
    const userData = generateUserData({ confirm: 'qwerty' });

    await registrationPage.open();
    await registrationPage.fillForm(userData);
    await registrationPage.clickRegisterButton();
    // eslint-disable-next-line max-len
    await registrationPage.assertErrorMessageIsShown(MISMATCHED_PASSWORDS_MESSAGE);
  });