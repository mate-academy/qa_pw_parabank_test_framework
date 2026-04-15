import { test } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { createNewAccount } from '../../../src/ui/actions/account/createNewAccount';
import { calculateBalance, formatCurrency } from '../../../src/common/helpers/balanceHelper';
import { 
  PAYEE_NAME_ERROR_MESSAGE, 
  ADDRESS_ERROR_MESSAGE, 
  CITY_ERROR_MESSAGE, 
  STATE_ERROR_MESSAGE, 
  ZIP_CODE_ERROR_MESSAGE, 
  PHONE_ERROR_MESSAGE, 
  EMPTY_ACCOUNT_NUMBER_ERROR_MESSAGE, 
  EMPTY_VERIFY_ACCOUNT_ERROR_MESSAGE, 
  EMPTY_AMOUNT_ERROR_MESSAGE, 
  INVALID_ACCOUNT_NUMBER_ERROR_MESSAGE, 
  INVALID_VERIFY_ACCOUNT_ERROR_MESSAGE, 
  INVALID_AMOUNT_ERROR_MESSAGE, 
  VERIFY_ACCOUNT_MISMATCH_ERROR_MESSAGE 
} from '../../../src/ui/constants/payBillErrorMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

let currentAccountID;
let initialBalance;
let newUser;

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});
test('Pay bill empty fields error messages test', async ({ billPayPage }) => {
  await billPayPage.open();
  await billPayPage.clickSendPayment();
  await billPayPage.assertEmptyPayeeNameErrorMessage(PAYEE_NAME_ERROR_MESSAGE);
  await billPayPage.assertEmptyAddressErrorMessage(ADDRESS_ERROR_MESSAGE);
  await billPayPage.assertEmptyCityErrorMessage(CITY_ERROR_MESSAGE);
  await billPayPage.assertEmptyStateErrorMessage(STATE_ERROR_MESSAGE);
  await billPayPage.assertEmptyZipCodeErrorMessage(ZIP_CODE_ERROR_MESSAGE);
  await billPayPage.assertEmptyPhoneErrorMessage(PHONE_ERROR_MESSAGE);
  await billPayPage.assertEmptyAccountNumberErrorMessage(EMPTY_ACCOUNT_NUMBER_ERROR_MESSAGE);
  await billPayPage.assertEmptyVerifyAccountErrorMessage(EMPTY_VERIFY_ACCOUNT_ERROR_MESSAGE);
  await billPayPage.assertEmptyAmountErrorMessage(EMPTY_AMOUNT_ERROR_MESSAGE);
})

test('Pay bill invalid values in fields error messages test', async ({ billPayPage }) => {
  await billPayPage.open();
  await billPayPage.fillAccountNumber('ABC');
  await billPayPage.fillVerifyAccountNumber('ABC');
  await billPayPage.fillAmount('ABC');
  await billPayPage.clickSendPayment();
  await billPayPage.assertInvalidAccountNumberErrorMessage(INVALID_ACCOUNT_NUMBER_ERROR_MESSAGE);
  await billPayPage.assertInvalidVerifyAccountErrorMessage(INVALID_VERIFY_ACCOUNT_ERROR_MESSAGE);
  await billPayPage.assertInvalidAmountErrorMessage(INVALID_AMOUNT_ERROR_MESSAGE);
})

test('Pay bill mismatch account numbers error messages test', async ({ billPayPage }) => {
  await billPayPage.open();
  await billPayPage.fillAccountNumber('123');
  await billPayPage.fillVerifyAccountNumber('456');
  await billPayPage.clickSendPayment();
  await billPayPage.assertVerifyAccountNumberMismatchErrorMessage(VERIFY_ACCOUNT_MISMATCH_ERROR_MESSAGE);
})

test('Pay bill successful test', async ({ billPayPage, accountsOverviewPage, user, page, openAccountPage }) => {
  newUser = generateNewUserData();
  await accountsOverviewPage.open();
  currentAccountID = await accountsOverviewPage.getFirstAccountId();
  initialBalance = await accountsOverviewPage.getAccountBalance(currentAccountID);
  await createNewAccount(page, 'SAVINGS', user);
  const newAccountID = await openAccountPage.getNewAccountId();
  await billPayPage.open();
  await billPayPage.fillBillPayForm(newUser, currentAccountID, newAccountID, '10');
  await billPayPage.clickSendPayment();
  await billPayPage.assertPaymentSuccess(newUser.firstName, formatCurrency(10), currentAccountID);
  await accountsOverviewPage.open();
  await accountsOverviewPage.assertAccountIsVisible(currentAccountID);
  await accountsOverviewPage.assertAccountBalance(currentAccountID, calculateBalance(initialBalance, -110));
})
