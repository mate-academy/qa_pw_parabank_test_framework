import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";
import { generateBillPaymentData } from "../../../src/common/helpers/BillPaymentData";

test('user is able to perform bill payment', async ({
  billPaymentPage,
  page,
  user
}) => {
  const accountNumber = await signUpUser(page, user);
  const billData = generateBillPaymentData();

  await billPaymentPage.gotoBillPaymentPage();
  await billPaymentPage.fillPayeeNameField(billData.payeeName);
  await billPaymentPage.fillAddressField(billData.address);
  await billPaymentPage.fillCityField(billData.city);
  await billPaymentPage.fillStateField(billData.state);
  await billPaymentPage.fillZipField(billData.zip);
  await billPaymentPage.fillPhoneField(billData.phone);
  await billPaymentPage.fillAccountField(billData.account);
  await billPaymentPage.fillVerifyAccountField(billData.verifyAccount);
  await billPaymentPage.fillAmountField(billData.amount);
  await billPaymentPage.selectFromAccount(accountNumber);
  await billPaymentPage.clickSendPaymentButton();
  await billPaymentPage.assertSuccessfulMessage(billData.amount, accountNumber, billData.payeeName);
});
