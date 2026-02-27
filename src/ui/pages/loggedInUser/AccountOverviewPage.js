import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
    this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
    this.updateContactInfo = page.getByRole('link', { name: 'Update Contact Info' });

    


    this.accountsOverviewTitle = page.locator('#showOverview h1.title');
    this.accountTable = page.locator('#accountTable');

    this.firstRow = this.accountTable.getByRole('row').nth(0); // header
    this.secondRow = this.accountTable.getByRole('row').nth(1); // main account
    this.thirdRow = this.accountTable.getByRole('row').nth(2); // second account

    
    this.accountHeader = this.firstRow.getByRole('cell').nth(0); // Account
    this.balanceHeader = this.firstRow.getByRole('cell').nth(1); // Balance*
    this.availableAmountHeader = this.firstRow.getByRole('cell').nth(2); // Available Amount

    this.mainAccountNumberCell = this.secondRow.getByRole('cell').nth(0);
    this.mainAccountBalanceCell = this.secondRow.getByRole('cell').nth(1);
    this.mainAccountAvailableAmountCell = this.secondRow.getByRole('cell').nth(2);

    this.secondAccountNumberCell = this.thirdRow.getByRole('cell').nth(0);
    this.secondAccountBalanceCell = this.thirdRow.getByRole('cell').nth(1);
    this.secondAccountAvailableAmountCell = this.thirdRow.getByRole('cell').nth(2);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickAccountsOverviewLink() {
    await this.step(`Click the 'Accounts Overview' link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async clickTransferFundsLink() {
    await this.step(`Click the 'Transfer Funds' link`, async () => {
      await this.transferFundsLink.click();
    });
  }

  async clickUpdateContactInfo() {
    await this.step(`Click the 'Update Contact Info' link`, async () => {
      await this.updateContactInfo.click();
    });
  }

  async clickOpenNewAccountLink() {
    await this.step(`Click the 'Open New Account' link`, async () => {
      await this.openNewAccountLink.click();
    });
  }

  async clickBillPayLink() {
    await this.step(`Click the 'Bill Pay' link`, async () => {
      await this.billPayLink.click();
    });
  }

  


  async getMainAccountData() {
    return await this.step(`Get 'Main Account' data`, async () => {
      const accountLink = this.mainAccountNumberCell.getByRole('link');

      const accountNumber = (await accountLink.textContent()).trim();
      const accountHref = await accountLink.getAttribute('href');

      return {
        accountNumber,
        accountHref,
      };
    });
  }

  async getSecondAccountData() {
    return await this.step(`Get 'Second Account' data`, async () => {
      const secondAccountLink = this.secondAccountNumberCell.getByRole('link');

      const secondAccountNumber = (await secondAccountLink.textContent()).trim();
      const secondAccountHref = await secondAccountLink.getAttribute('href');

      return {
        secondAccountNumber,
        secondAccountHref,
      };
    });
  }

  async getMainAccountBalanceCellData() {
    return await this.step(`Get 'Main Account' balance`, async () => {
      const mainAccountBalance = await this.mainAccountBalanceCell.textContent();
      return mainAccountBalance;
    });
  }

  async getMainAccountAvailableAmountCellData() {
    return await this.step(`Get 'Main Account' available balance`, async () => {
      const mainAccountBalanceAvailableAmount = await this.mainAccountAvailableAmountCell.textContent();
      return mainAccountBalanceAvailableAmount;
    });
  }

  async clickRequestLoanLink() {
    await this.step(`Click the 'Request Loan' link`, async () => {
      await this.requestLoanLink.click();
    });
  }

  async clickMainAccountNumberCellLink() {
    await this.step(`Click the 'Account Number' link`, async () => {
      await this.mainAccountNumberCell.getByRole('link').click();
    });
  }

  async assertDashboardLayout() {
  await this.step(`Assert Accounts Overview dashboard layout`, async () => {
    await expect(this.accountsOverviewTitle).toHaveText('Accounts Overview');
    await expect(this.accountTable).toBeVisible();

    await expect(this.accountHeader).toHaveText('Account');
    await expect(this.balanceHeader).toContainText('Balance'); 
    await expect(this.availableAmountHeader).toHaveText('Available Amount');

    
    await expect(this.mainAccountNumberCell.getByRole('link')).toBeVisible();
  });
}

}