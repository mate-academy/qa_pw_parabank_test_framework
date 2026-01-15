import { testStep } from '../../../common/helpers/pwHelpers';
import { BillPayPage } from '../../pages/accountServices/BillPayPage';

export async function payBill(page, payeeData, amount, userId = 0, logger = null) {
  await testStep(
    `Pay bill of $${amount} to ${payeeData.payeeName}`,
    async () => {
      const billPayPage = new BillPayPage(page, userId, logger);

      await billPayPage.open();
      await billPayPage.fillPayeeNameInput(payeeData.payeeName);
      await billPayPage.fillAddressInput(payeeData.address);
      await billPayPage.fillCityInput(payeeData.city);
      await billPayPage.fillStateInput(payeeData.state);
      await billPayPage.fillZipCodeInput(payeeData.zipCode);
      await billPayPage.fillPhoneNumberInput(payeeData.phoneNumber);
      await billPayPage.fillAccountNumberInput(payeeData.accountNumber);
      await billPayPage.fillVerifyAccountNumberInput(payeeData.accountNumber);
      await billPayPage.fillAmountInput(amount);
      await billPayPage.clickSendPaymentButton();
      await billPayPage.assertSuccessTitleContainsText();
    },
    userId,
  );
}
