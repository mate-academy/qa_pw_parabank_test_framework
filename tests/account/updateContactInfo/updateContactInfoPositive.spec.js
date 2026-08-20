import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';

test('Update Contact Info with valid customer data', async ({
  registeredCustomer,
  accountServicesNavPage,
  updateContactInfoPage,
}) => {
  await allure.severity(Severity.CRITICAL);

  await accountServicesNavPage.clickUpdateContactInfo();

  await updateContactInfoPage.submitContactInfoForm(registeredCustomer);

  await updateContactInfoPage.assertProfileUpdatedSuccessfully();
});
