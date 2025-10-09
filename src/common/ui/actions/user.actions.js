// src/common/ui/actions/user.actions.js
import { testStep } from '../../helpers/pwHelpers';
import { UpdateContactPage } from '../pages/updateContactPage';
import { RequestLoanPage } from '../pages/requestLoanPage';
import { HomePage } from '../pages/homePage';

export class UserActions {
  constructor(page, logger, userId = 0) {
    this.page = page;
    this.logger = logger;
    this.userId = userId;
    this.updateContactPage = new UpdateContactPage(page, userId);
    this.requestLoanPage = new RequestLoanPage(page, userId);
    this.homePage = new HomePage(page, userId);
  }

  async updateContactInfo(newData) {
    await testStep('Update contact info', async () => {
      await this.updateContactPage.open();
      await this.updateContactPage.fillContactForm(newData);
      await this.updateContactPage.submit();
      await this.updateContactPage.verifyContactUpdateSuccess();
    }, this.userId);
  }

  async requestLoan(amount, downPayment, fromAccount) {
    await testStep(`Request loan: ${amount}`, async () => {
      const loanData = { amount, downPayment, fromAccount };
      await this.requestLoanPage.open();
      await this.requestLoanPage.fillLoanForm(loanData);
      await this.requestLoanPage.submit();
      await this.requestLoanPage.assertLoanResult();
    }, this.userId);
  }

  async logout() {
    await testStep('Logout user', async () => {
      await this.homePage.logout();
      await this.homePage.verifyLogoutSuccess();
    }, this.userId);
  }
}
