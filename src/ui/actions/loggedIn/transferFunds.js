import { testStep } from '../../../common/helpers/pwHelpers';
import { TransferPage } from '../../pages/loggedIn/TransferPage';

export async function transferFunds(page, { amount, fromAccountId, toAccountId }) {
  await testStep(
    `Transfer ${amount} from account ${fromAccountId} to account ${toAccountId}`,
    async () => {
      const transferPage = new TransferPage(page);

      await transferPage.transfer({ amount, fromAccountId, toAccountId });
      await transferPage.assertTransferCompleted({ amount, fromAccountId, toAccountId });
    },
  );
}
