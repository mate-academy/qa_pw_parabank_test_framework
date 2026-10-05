import { test } from '../../_fixtures/fixtures';
import { generateUserData } from '../../../src/common/testData/generateUserInfo';
import {
EMPTY_PAYEE_NAME_MESSAGE, 
EMPTY_PAYEE_ADDRESS_MESSAGE, 
EMPTY_PAYEE_CITY_MESSAGE, 
EMPTY_PAYEE_STATE_MESSAGE,
EMPTY_PAYEE_ZIPCODE_MESSAGE, 
EMPTY_PAYEE_PHONE_NUMBER_MESSAGE, 
EMPTY_PAYEE_ACCOUNT_NUMBER_MESSAGE,
EMPTY_VERIFY_ACCOUNT_NUMBER_MESSAGE, 
MISSMATCHED_ACCOUNT_NUMBERS_MESSAGE,
EMPTY_AMOUNT_MESSAGE, 
INVALID_ACCOUNT_NUMBER_MESSAGE, 
INVALID_VERIFY_ACCOUNT_NUMBER_MESSAGE,
INVALID_AMOUNT_MESSAGE
} from '../../../src/ui/constants/billPayErrors';
import { severity, Severity } from 'allure-js-commons';


const negativeCases = [
  { description: 'payee name is empty', overrides: { firstName: '', lastName: '' }, expectedError: EMPTY_PAYEE_NAME_MESSAGE },
  { description: 'address is empty', overrides: { address: '' }, expectedError: EMPTY_PAYEE_ADDRESS_MESSAGE },
  { description: 'city is empty', overrides: { city: '' }, expectedError: EMPTY_PAYEE_CITY_MESSAGE },
  { description: 'state is empty', overrides: { state: '' }, expectedError: EMPTY_PAYEE_STATE_MESSAGE },
  { description: 'zip code is empty', overrides: { zipCode: '' }, expectedError: EMPTY_PAYEE_ZIPCODE_MESSAGE },
  { description: 'phone number is empty', overrides: { phone: '' }, expectedError: EMPTY_PAYEE_PHONE_NUMBER_MESSAGE },
  { description: 'account number is empty', overrides: { accountNumber: '' }, expectedError: EMPTY_PAYEE_ACCOUNT_NUMBER_MESSAGE },
  { description: 'verify account number is empty', overrides: { verifyAccountNumber: '' }, expectedError: EMPTY_VERIFY_ACCOUNT_NUMBER_MESSAGE },
  { description: 'account numbers do not match', overrides: { accountNumber: '12345', verifyAccountNumber: '54321' }, expectedError: MISSMATCHED_ACCOUNT_NUMBERS_MESSAGE },
  { description: 'amount is empty', overrides: { amount: '' }, expectedError: EMPTY_AMOUNT_MESSAGE },
  { description: 'invalid account number', overrides: { accountNumber: 'invalid' }, expectedError: INVALID_ACCOUNT_NUMBER_MESSAGE },
  { description: 'invalid verify account number', overrides: { verifyAccountNumber: 'invalid' }, expectedError: INVALID_VERIFY_ACCOUNT_NUMBER_MESSAGE },
  { description: 'invalid amount', overrides: { amount: 'invalid' }, expectedError: INVALID_AMOUNT_MESSAGE }, 
];

for (const testCase of negativeCases) {
  test(`Bill Pay fails when ${testCase.description}`, async ({ 
    existingUser, 
    billPayPage }) => {
    await severity(Severity.NORMAL);
    const payeeData = generateUserData(testCase.overrides);
    await billPayPage.open();
    await billPayPage.fillForm(payeeData);
    await billPayPage.clickSendPaymentButton();
    await billPayPage.assertErrorMessageIsShown(testCase.expectedError);
  });
}