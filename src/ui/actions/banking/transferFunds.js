import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { testStep } from '../../../common/helpers/pwHelpers';

export async function transferFunds(page, amount, userId = 0) {
  await testStep(
    `Transfer funds`,
    async () => {
      const transferFundsPage = new TransferFundsPage(page, userId);

      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertTransferComplete();
    },
    userId,
  );
}
