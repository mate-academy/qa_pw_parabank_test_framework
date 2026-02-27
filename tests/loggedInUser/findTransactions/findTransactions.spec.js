import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';





test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Successful `Find Transaction by amount` flow test', async ({ 
  billPayPage, 
  accountOverviewPage,
  findTransactionsPage
}) => {
  const payeeInformation = generateNewUserData();
  const randomAmount = Math.floor(Math.random() * 100) + 1;
  const randomAccount = Math.floor(Math.random() * 1000) + 1;
  
  await accountOverviewPage.clickAccountsOverviewLink();
  const accountMainData = await accountOverviewPage.getMainAccountData();
  

  await accountOverviewPage.clickBillPayLink();

  await billPayPage.fillPayeeNameField(`${payeeInformation.firstName} ${payeeInformation.lastName}`);
  await billPayPage.fillPayeeAddressStreetField(payeeInformation.street);
  await billPayPage.fillPayeeAddressCityField(payeeInformation.city);
  await billPayPage.fillPayeeAddressStateField(payeeInformation.state);
  await billPayPage.fillPayeeAddressZipCodeField(payeeInformation.zipCode);
  await billPayPage.fillPayeePhoneNumberField(payeeInformation.phone);
  await billPayPage.fillPayeeAccountNumberField(randomAccount);
  await billPayPage.fillVerifyAccountField(randomAccount);
  await billPayPage.fillAmountField(randomAmount);
  await billPayPage.selectFromAccount(accountMainData.accountNumber);
  await billPayPage.clickSendPaymentButton();

  await billPayPage.assertBillPaymentCompleteHeaderIsVisible();


  await billPayPage.clickFindTransactionsLink();


  await findTransactionsPage.fillAmountField(randomAmount);
  await findTransactionsPage.clickFindByAmountTransactionButton();

  await findTransactionsPage.assertBillTransactionIsVisible(
  payeeInformation.firstName,
  payeeInformation.lastName,
  );








});
