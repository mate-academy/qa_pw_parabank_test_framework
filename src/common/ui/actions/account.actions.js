// src/common/ui/actions/account.actions.js
import { testStep } from '../../helpers/pwHelpers';
import { AccountOverviewPage } from '../pages/accountOverviewPage';
import { NewAccountPage } from '../pages/newAccountPage';
import { AccountActivityPage } from '../pages/accountActivityPage';
import { TransferFundsPage } from '../pages/transferFundsPage';
import { BillPayPage } from '../pages/billPayPage';

export class AccountActions {
  constructor(page, logger, userId = 0) {
    this.page = page;
    this.logger = logger;
    this.userId = userId;
    this.accountOverviewPage = new AccountOverviewPage(page, userId);
    this.newAccountPage = new NewAccountPage(page, userId);
    this.accountActivityPage = new AccountActivityPage(page, userId);
    this.transferFundsPage = new TransferFundsPage(page, userId);
    this.billPayPage = new BillPayPage(page, userId);
  }

  async viewAccountOverview() {
    await testStep('View Account Overview', async () => {
      await this.accountOverviewPage.open();
    }, this.userId);
  }

  async viewAccountDetails(accountId) {
    await testStep(`View account details for ${accountId}`, async () => {
      await this.accountOverviewPage.openAccountDetails(accountId); // corrected method
    }, this.userId);
  }

  async transferFunds(fromAccount, toAccount, amount) {
    await testStep(`Transfer ${amount} from ${fromAccount} to ${toAccount}`, async () => {
      await this.transferFundsPage.open();
      await this.transferFundsPage.fillTransferForm({ fromAccount, toAccount, amount });
      await this.transferFundsPage.submit();
      await this.transferFundsPage.verifyTransferSuccess();
    }, this.userId);
  }

  async payBill({ payee, amount, fromAccount }) {
    await testStep(`Pay bill to ${payee}`, async () => {
      await this.billPayPage.open();
      await this.billPayPage.fillBillPayForm({ payee, amount, fromAccount });
      await this.billPayPage.submit();
      await this.billPayPage.verifyPaymentSuccess();
    }, this.userId);
  }

  async openNewAccount(type, fromAccount) {
    await testStep(`Open new account type ${type}`, async () => {
      await this.newAccountPage.open();
      await this.newAccountPage.selectAccountType(type);
      await this.newAccountPage.selectFromAccount(fromAccount);
      await this.newAccountPage.submit();
      await this.newAccountPage.assertSuccess();
    }, this.userId);
  }

  async openAccountActivity(accountId) {
    await testStep(`Open account activity for ${accountId}`, async () => {
      await this.accountActivityPage.openAccountDetails(accountId); // align method
    }, this.userId);
  }
}
