import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../_fixtures/fixtures';
import { generateNewCustomerData } from '../../../src/common/testData/generateNewCustomerData';

test('Forgot login info with unregistered customer data', async ({
  forgotLoginInfoPage,
}) => {
  await allure.severity(Severity.NORMAL);

  const unregisteredCustomer = generateNewCustomerData();

  await forgotLoginInfoPage.open();
  await forgotLoginInfoPage.submitLookupForm(unregisteredCustomer);

  await forgotLoginInfoPage.assertErrorMessage();
});
