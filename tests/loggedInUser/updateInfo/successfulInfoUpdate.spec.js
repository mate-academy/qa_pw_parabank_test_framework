import { generateUserData } from "../../../src/common/testData/generateUserInfo";
import { test  } from '../../_fixtures/fixtures';
import { severity, Severity } from 'allure-js-commons';

test('Successful Info Update', async ({ 
  existingUser, 
  updateContactInfoPage 
}) => {
  await severity(Severity.CRITICAL);
  const userData = generateUserData();
  await updateContactInfoPage.open();
  await updateContactInfoPage.fillForm(userData);
  await updateContactInfoPage.clickUpdateProfileButton();
  await updateContactInfoPage.page.waitForTimeout(2000);
  await updateContactInfoPage.assertSuccessfulUpdateMessageIsShown();
  await updateContactInfoPage.open();
  await updateContactInfoPage.assertInfoIsUpdated(userData);
});