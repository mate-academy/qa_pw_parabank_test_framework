import { testStep } from '../../helpers/pwHelpers';
import { UpdateContactPage } from '../pages/updateContactPage';
import { RequestLoanPage } from '../pages/requestLoanPage';
import { HomePage } from '../pages/basePage';

export class UserActions {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.updateContactPage = new UpdateContactPage(page, userId);
    this.requestLoanPage = new RequestLoanPage(page, userId);
    this.homePage = new HomePage(page, userId);
  }

  async updateContactInfo(newContactData) {
    await testStep(`Update user contact info`, async () => {
      await this.updateContactPage.open();
      await this.updateContactPage.fillContactForm(newContactData);
      await this.updateContactPage.submit();
      await this.updateContactPage.verifyContactUpdateSuccess();
    }, this.userId);
  }

  async requestLoan(loanData) {
    await testStep(`Request loan of ${loanData.amount}`, async () => {
      await this.requestLoanPage.open();
      await this.requestLoanPage.fillLoanRequestForm(loanData);
      await this.requestLoanPage.submit();
      await this.requestLoanPage.verifyLoanRequestResult();
    }, this.userId);
  }

  async logout() {
    await testStep(`Log out`, async () => {
      await this.homePage.logout();
      await this.homePage.verifyLogoutSuccess();
    }, this.userId);
  }
}
