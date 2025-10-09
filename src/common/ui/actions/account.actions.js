import { testStep } from '../../helpers/pwHelpers';
import { AccountOverviewPage } from '../pages/accountOverviewPage';
import { TransferFundsPage } from '../pages/transferFundsPage';
import { BillPayPage } from '../pages/billPayPage';

export class AccountActions {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountOverviewPage = new AccountOverviewPage(page, userId);
    this.transferFundsPage = new TransferFundsPage(page, userId);
    this.billPayPage = new BillPayPage(page, userId);
  }

  async viewAccountOverview() {
    await testStep(`View account overview`, async () => {
      await this.accountOverviewPage.open();
      await this.accountOverviewPage.assertOverviewVisible();
    }, this.userId);
  }

  async viewAccountDetails(accountId) {
    await testStep(`View account details for ${accountId}`, async () => {
      await this.accountOverviewPage.openAccountDetails(accountId);
      await this.accountOverviewPage.assertAccountDetailsVisible();
    }, this.userId);
  }

  async transferFunds(fromAccount, toAccount, amount) {
    await testStep(`Transfer ${amount} from ${fromAccount} to ${toAccount}`, async () => {
      await this.transferFundsPage.open();
      await this.transferFundsPage.fillTransferForm(fromAccount, toAccount, amount);
      await this.transferFundsPage.submitTransfer();
      await this.transferFundsPage.verifyTransferSuccess(amount);
    }, this.userId);
  }

  async payBill(billData) {
    await testStep(`Pay bill to ${billData.payeeName}`, async () => {
      await this.billPayPage.open();
      await this.billPayPage.fillBillForm(billData);
      await this.billPayPage.submitPayment();
      await this.billPayPage.verifyPaymentSuccess();
    }, this.userId);
  }
}
