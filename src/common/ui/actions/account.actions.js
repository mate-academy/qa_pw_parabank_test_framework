// src/common/ui/actions/account.actions.js
import { testStep } from '../../helpers/pwHelpers';
import { AccountOverviewPage } from '../pages/accountOverviewPage';
import { NewAccountPage } from '../pages/newAccountPage';
import { AccountActivityPage } from '../pages/accountActivityPage';

export class AccountActions {
  constructor(page, logger, userId = 0) {
    this.page = page;
    this.logger = logger;
    this.userId = userId;
    this.accountOverviewPage = new AccountOverviewPage(page, userId);
    this.newAccountPage = new NewAccountPage(page, userId);
    this.accountActivityPage = new AccountActivityPage(page, userId);
  }

  async openNewAccount(type, fromAccount) {
    await testStep(`Open new account: type=${type}`, async () => {
      await this.newAccountPage.open();
      await this.newAccountPage.selectAccountType(type);
      await this.newAccountPage.selectFromAccount(fromAccount);
      await this.newAccountPage.submit();
      await this.newAccountPage.assertSuccess();
    }, this.userId);
  }

  async openAccountActivity(accountId) {
    await testStep(`Open account activity for account ${accountId}`, async () => {
      await this.accountOverviewPage.openAccountActivity(accountId);
    }, this.userId);
  }

  async filterTransactions(filterOptions) {
    await testStep(`Filter transactions`, async () => {
      await this.accountActivityPage.applyFilters(filterOptions);
      await this.accountActivityPage.verifyFilteredResults();
    }, this.userId);
  }

  async searchTransactionsByAmount(amount) {
    await testStep(`Search transactions by amount: ${amount}`, async () => {
      await this.accountActivityPage.searchByAmount(amount);
    }, this.userId);
  }
}
