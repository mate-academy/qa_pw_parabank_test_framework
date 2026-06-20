import {expect, testStep} from '../../common/helpers/pwHelpers';


export class OpenNewAccountPage {
  constructor(page, user, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.user = user;
    this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.accountTypeDropdown = page.locator('#type');
    this.accountNumber = page.getByRole('link').first();
    this.accountOpenedText = page.getByText('Account Opened!');
    this.newAccountIdButton = page.locator('#newAccountId');

    
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Open new account' page`, async () => {
      await this.page.goto('/parabank/openaccount.htm', { waitUntil: 'networkidle' });
      
    });
  }

  async clickOnAccountNumber() {
    await this.step(`Click newly created account number`, async () => {
      await this.accountNumber.click();
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click 'Open new account' button`, async () => {
      await this.openNewAccountButton.click();
      
    });
  }

  async selectSavingAccountType() {
    await this.step(`Select Saving Account Type`, async () => {
      await this.accountTypeDropdown.selectOption('1');
    });
  }
  async clickNewAccountIdButton(){
       await this.step(`Click on 'New Account' button `, async () => {
      await this.newAccountIdButton.click();

        });
  }
  
  
 async getAccountNumber() {
    await this.newAccountIdButton.waitFor({ state: 'visible' });
    return (await this.newAccountIdButton.textContent()).trim();
  }

  async assertAccountOpened() {
       await this.step(`'Account Opened!' text is visible`, async () => {
      await expect(this.accountOpenedText).toBeVisible();
  });


}

async getAccountType() {
  return await this.step(`Get account type`, async () => {
    return await this.accountTypeDropdown.inputValue();
  });
}

async getBalance() {
  return await this.step(`Get account balance`, async () => {
    return await this.accountBalance.innerText();
  });
}


}
