import { testStep } from '../../../common/helpers/pwHelpers';
import { TransferFundsPage } from '../../pages/accountServices/TransferFundsPage';

export async function transferFundsBetweenAccounts(
  page,
  amount,
  fromAccount = null,
  toAccount = null,
  userId = 0,
  logger = null,
) {
  await testStep(
    `Transfer $${amount} between accounts`,
    async () => {
      const transferFundsPage = new TransferFundsPage(page, userId, logger);

      await transferFundsPage.open();
      await transferFundsPage.fillAmountInput(amount);

      if (fromAccount) {
        await transferFundsPage.fillFromAccountSelect(fromAccount);
      }

      if (toAccount) {
        await transferFundsPage.fillToAccountSelect(toAccount);
      }

      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertSuccessTitleContainsText();
    },
    userId,
  );
}
