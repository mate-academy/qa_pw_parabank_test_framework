import { test } from '../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {faker} from '@faker-js/faker';
import { BillPayPage } from '../../src/ui/pages/transactions/BillPayPage';

let createdUser;
const VALID_AMOUNT = '100.00';
const ACCOUNT_NUMBER = faker.string.numeric(5);

test.use({ contextsNumber: 2, });

test.beforeEach(async ({ pages, users }) => {
  createdUser = await signUpUser(pages[0], users[1], 1);
   
  await signUpUser(pages[1], users[2], 2);
});

test('Bill pay for another user account', async ({
  users,
  pages,
  
}) => {
    const billPayPage = new BillPayPage(pages[1], 2);
await billPayPage.open();
await billPayPage.inputPayeeNameField(createdUser.username);
await billPayPage.inputPayeeAdressField(createdUser.address);
await billPayPage.inputPayeeCityField(createdUser.city);
await billPayPage.inputPayeeStateField(createdUser.state);
await billPayPage.inputPayeeZipCodeField(createdUser.zipCode);
await billPayPage.inputPayeePhoneNumberField(createdUser.phoneNumber);
await billPayPage.inputPayeeAccountNumberField(ACCOUNT_NUMBER);
await billPayPage.inputVerifyAccountNumberField(ACCOUNT_NUMBER);
await billPayPage.inputAmountField(VALID_AMOUNT);
await billPayPage.clickOnSendPaymentButton();
await billPayPage.assertBillPaymetCompleateTextIsVisible();
});

