import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/helpers/testData/generateNewUserData';
import * as BillPayErrorMessages from '../../src/ui/constants/billPayErrorMessages';

const payee = generateNewUserData();
const PAYEE_ACCOUNT = '13344';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  {
    payeeName: '',
    address: payee.address,
    city: payee.city,
    state: payee.state,
    zipCode: payee.zipCode,
    phone: payee.phone,
    account: PAYEE_ACCOUNT,
    amount: 50,
    message: BillPayErrorMessages.EMPTY_PAYEE_NAME_MESSAGE,
    title: 'empty payee name',
  },
  {
    payeeName: 'John Doe',
    address: '',
    city: payee.city,
    state: payee.state,
    zipCode: payee.zipCode,
    phone: payee.phone,
    account: PAYEE_ACCOUNT,
    amount: 50,
    message: BillPayErrorMessages.EMPTY_ADDRESS_MESSAGE,
    title: 'empty address',
  },
  {
    payeeName: 'John Doe',
    address: payee.address,
    city: '',
    state: payee.state,
    zipCode: payee.zipCode,
    phone: payee.phone,
    account: PAYEE_ACCOUNT,
    amount: 50,
    message: BillPayErrorMessages.EMPTY_CITY_MESSAGE,
    title: 'empty city',
  },
  {
    payeeName: 'John Doe',
    address: payee.address,
    city: payee.city,
    state: '',
    zipCode: payee.zipCode,
    phone: payee.phone,
    account: PAYEE_ACCOUNT,
    amount: 50,
    message: BillPayErrorMessages.EMPTY_STATE_MESSAGE,
    title: 'empty state',
  },
  {
    payeeName: 'John Doe',
    address: payee.address,
    city: payee.city,
    state: payee.state,
    zipCode: '',
    phone: payee.phone,
    account: PAYEE_ACCOUNT,
    amount: 50,
    message: BillPayErrorMessages.EMPTY_ZIP_CODE_MESSAGE,
    title: 'empty zip code',
  },
  {
    payeeName: 'John Doe',
    address: payee.address,
    city: payee.city,
    state: payee.state,
    zipCode: payee.zipCode,
    phone: '',
    account: PAYEE_ACCOUNT,
    amount: 50,
    message: BillPayErrorMessages.EMPTY_PHONE_MESSAGE,
    title: 'empty phone',
  },
  {
    payeeName: 'John Doe',
    address: payee.address,
    city: payee.city,
    state: payee.state,
    zipCode: payee.zipCode,
    phone: payee.phone,
    account: '',
    amount: 50,
    message: BillPayErrorMessages.EMPTY_ACCOUNT_MESSAGE,
    title: 'empty account number',
  },
  {
    payeeName: 'John Doe',
    address: payee.address,
    city: payee.city,
    state: payee.state,
    zipCode: payee.zipCode,
    phone: payee.phone,
    account: PAYEE_ACCOUNT,
    amount: '',
    message: BillPayErrorMessages.EMPTY_AMOUNT_MESSAGE,
    title: 'empty amount',
  },
];

testParameters.forEach(
  ({ payeeName, address, city, state, zipCode, phone, account, amount, message, title }) => {
    test.describe('Bill pay negative tests', () => {
      test(`Bill pay with ${title}`, async ({ billPayPage }) => {
        await billPayPage.open();
        await billPayPage.fillPayeeNameField(payeeName);
        await billPayPage.fillAddressField(address);
        await billPayPage.fillCityField(city);
        await billPayPage.fillStateField(state);
        await billPayPage.fillZipCodeField(zipCode);
        await billPayPage.fillPhoneField(phone);
        await billPayPage.fillAccountField(account);
        await billPayPage.fillVerifyAccountField(account);
        await billPayPage.fillAmountField(amount);
        await billPayPage.clickSendPaymentButton();
        await billPayPage.assertErrorMessageContainsText(message);
      });
    });
  },
);
