import{expect, testStep} from '../../../common/helpers/pwHelpers';
import {MIN_DEPOSIT} from '../../../ui/constants/constDeposit';

export class AccountDetailsPage{
 constructor (page){
 this.page = page;
 this.accountDetails = page.getByRole('heading', { name: 'Account Details' });
 this.accountType = page.getByRole('cell', { name: 'Account Type:' });
 this.accountBalance = page.locator('#balance');
 }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Account Details' page`, async () => {
      await this.page.goto('/');
    });
  }

  async assertAccountDetailsIsVisible(){
    await this.step(`Account details Page is opening`, async () =>{
    await expect(this.accountDetails).toBeVisible();
    });
  }

  async assertAccountBalanceIsVisible(){
    await this.step(`Acount balance: '${MIN_DEPOSIT}' is visible`, async () =>{
    await expect(this.accountBalance).toHaveText(`$${MIN_DEPOSIT}`);
    });
  }
  async assertAccountTypeIsVisible(){
    await this.step(`Acount type is visible`, async () =>{
    await expect(this.accountType).toBeVisible();
    });
  }

}