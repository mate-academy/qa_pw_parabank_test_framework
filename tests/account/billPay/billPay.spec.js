import { faker } from '@faker-js/faker';

import { test } from '../../_fixtures/fixtures';

import { BillPayPage } from '../../../src/ui/pages/BillPayPage';

import { registerUser } from '../../../src/ui/actions/auth/registerUser';

import {
  EMPTY_PAYEE_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIP_CODE_MESSAGE,
  EMPTY_PHONE_NUMBER_MESSAGE,
  EMPTY_ACCOUNT_NUMBER_MESSAGE,
  EMPTY_VERIFY_ACCOUNT_MESSAGE,
  EMPTY_AMOUNT_MESSAGE,
  INVALID_ACCOUNT_NUMBER_MESSAGE,
  ACCOUNT_NUMBERS_MISMATCH_MESSAGE,
  INVALID_AMOUNT_MESSAGE,
} from '../../../src/ui/constants/billPayErrorMessages';

let billPayPage;

async function fillValidBillPayForm(data = {}) {
  const accountNumber = data.accountNumber ?? faker.string.numeric(8);

  await billPayPage.fillPayeeNameInput(data.payeeName ?? faker.company.name());
  await billPayPage.fillAddressInput(
    data.address ?? faker.location.streetAddress(),
  );
  await billPayPage.fillCityInput(data.city ?? faker.location.city());
  await billPayPage.fillStateInput(data.state ?? faker.location.state());
  await billPayPage.fillZipCodeInput(data.zipCode ?? faker.location.zipCode());
  await billPayPage.fillPhoneNumberInput(
    data.phoneNumber ?? faker.phone.number(),
  );
  await billPayPage.fillAccountNumberInput(accountNumber);
  await billPayPage.fillVerifyAccountInput(data.verifyAccount ?? accountNumber);
  await billPayPage.fillAmountInput(data.amount ?? 100);
}

const emptyRequiredFields = [
  {
    fieldName: 'Payee Name',
    data: { payeeName: '' },
    assertError: async () => {
      await billPayPage.assertPayeeNameErrorContainsText(
        EMPTY_PAYEE_NAME_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Address',
    data: { address: '' },
    assertError: async () => {
      await billPayPage.assertAddressErrorContainsText(EMPTY_ADDRESS_MESSAGE);
    },
  },
  {
    fieldName: 'City',
    data: { city: '' },
    assertError: async () => {
      await billPayPage.assertCityErrorContainsText(EMPTY_CITY_MESSAGE);
    },
  },
  {
    fieldName: 'State',
    data: { state: '' },
    assertError: async () => {
      await billPayPage.assertStateErrorContainsText(EMPTY_STATE_MESSAGE);
    },
  },
  {
    fieldName: 'Zip Code',
    data: { zipCode: '' },
    assertError: async () => {
      await billPayPage.assertZipCodeErrorContainsText(EMPTY_ZIP_CODE_MESSAGE);
    },
  },
  {
    fieldName: 'Phone Number',
    data: { phoneNumber: '' },
    assertError: async () => {
      await billPayPage.assertPhoneNumberErrorContainsText(
        EMPTY_PHONE_NUMBER_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Account Number',
    data: { accountNumber: '' },
    assertError: async () => {
      await billPayPage.assertAccountEmptyErrorContainsText(
        EMPTY_ACCOUNT_NUMBER_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Verify Account',
    data: { verifyAccount: '' },
    assertError: async () => {
      await billPayPage.assertVerifyAccountEmptyErrorContainsText(
        EMPTY_VERIFY_ACCOUNT_MESSAGE,
      );
    },
  },
  {
    fieldName: 'Amount',
    data: { amount: '' },
    assertError: async () => {
      await billPayPage.assertAmountEmptyErrorContainsText(
        EMPTY_AMOUNT_MESSAGE,
      );
    },
  },
];

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);

  billPayPage = new BillPayPage(pages[0]);

  await billPayPage.clickBillPayLink();
  await billPayPage.assertBillPaymentServiceTitleIsVisible();
});

test.describe('Bill Payment tests', () => {
  test('User can make bill payment', async () => {
    const payeeName = faker.company.name();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    const phoneNumber = faker.phone.number();
    const accountNumber = faker.string.numeric(8);
    const amount = 100;

    await billPayPage.fillPayeeNameInput(payeeName);
    await billPayPage.fillAddressInput(address);
    await billPayPage.fillCityInput(city);
    await billPayPage.fillStateInput(state);
    await billPayPage.fillZipCodeInput(zipCode);
    await billPayPage.fillPhoneNumberInput(phoneNumber);
    await billPayPage.fillAccountNumberInput(accountNumber);
    await billPayPage.fillVerifyAccountInput(accountNumber);
    await billPayPage.fillAmountInput(amount);

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertBillPaymentCompletedSuccessfully();
    await billPayPage.assertPayeeNameResult(payeeName);
    await billPayPage.assertAmountResult(amount);
  });

  test('User cannot make bill payment with mismatched account numbers', async () => {
    const accountNumber = faker.string.numeric(8);
    const differentAccountNumber = faker.string.numeric(8);

    await billPayPage.fillPayeeNameInput(faker.company.name());
    await billPayPage.fillAddressInput(faker.location.streetAddress());
    await billPayPage.fillCityInput(faker.location.city());
    await billPayPage.fillStateInput(faker.location.state());
    await billPayPage.fillZipCodeInput(faker.location.zipCode());
    await billPayPage.fillPhoneNumberInput(faker.phone.number());

    await billPayPage.fillAccountNumberInput(accountNumber);
    await billPayPage.fillVerifyAccountInput(differentAccountNumber);
    await billPayPage.fillAmountInput(100);

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertVerifyAccountMismatchErrorContainsText(
      ACCOUNT_NUMBERS_MISMATCH_MESSAGE,
    );
  });

  test('User cannot make bill payment with invalid account number', async () => {
    const invalidAccountNumber = 'invalid';

    await billPayPage.fillPayeeNameInput(faker.company.name());
    await billPayPage.fillAddressInput(faker.location.streetAddress());
    await billPayPage.fillCityInput(faker.location.city());
    await billPayPage.fillStateInput(faker.location.state());
    await billPayPage.fillZipCodeInput(faker.location.zipCode());
    await billPayPage.fillPhoneNumberInput(faker.phone.number());

    await billPayPage.fillAccountNumberInput(invalidAccountNumber);
    await billPayPage.fillVerifyAccountInput(invalidAccountNumber);
    await billPayPage.fillAmountInput(100);

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertAccountInvalidErrorContainsText(
      INVALID_ACCOUNT_NUMBER_MESSAGE,
    );
  });

  test('User cannot make bill payment with invalid amount', async () => {
    const accountNumber = faker.string.numeric(8);

    await billPayPage.fillPayeeNameInput(faker.company.name());
    await billPayPage.fillAddressInput(faker.location.streetAddress());
    await billPayPage.fillCityInput(faker.location.city());
    await billPayPage.fillStateInput(faker.location.state());
    await billPayPage.fillZipCodeInput(faker.location.zipCode());
    await billPayPage.fillPhoneNumberInput(faker.phone.number());

    await billPayPage.fillAccountNumberInput(accountNumber);
    await billPayPage.fillVerifyAccountInput(accountNumber);
    await billPayPage.fillAmountInput('invalid');

    await billPayPage.clickSendPaymentButton();

    await billPayPage.assertAmountInvalidErrorContainsText(
      INVALID_AMOUNT_MESSAGE,
    );
  });

  for (const { fieldName, data, assertError } of emptyRequiredFields) {
    test(`User cannot make bill payment with empty ${fieldName} field`, async () => {
      await fillValidBillPayForm(data);

      await billPayPage.clickSendPaymentButton();

      await assertError();
    });
  }
});
