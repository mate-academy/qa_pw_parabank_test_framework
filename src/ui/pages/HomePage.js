import { expect, testStep } from '../../common/helpers/pwHelpers';



export class HomePage{
    constructor(page, user){
    this.page = page;
    this.user = user;
    this.logOutButton = page.getByRole('link', { name: 'Log Out' });
    this.homePageTab = page.locator('.title');
    this.accountOverviewButton = page.getByRole('link', { name: 'Accounts Overview' });
    this.forgotInfoButton = page.getByRole('link', { name: 'Forgot login info?' });
    this.updateContactInfoButton = page.getByRole('link', { name: 'Update Contact Info' });
    this.requestLoanButton = page.getByRole('link', { name: 'Request Loan' });
    this.transferFundButton = page.getByRole('link', { name: 'Transfer Funds' });

    }

    //user.accountId
   async getAccountId() {
    return await this.page.getByRole('link').first().innerText();
}

    async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

    async assertHomePageIsVisible(){
     await this.step('Open `Home Page`',async()=>{
        await expect(this.logOutButton).toBeVisible();
     });
    }

    async clickLogoutButton(){
        await this.step('Click `Log Out` button',async()=>{
        await this.logOutButton.click();
     });
    }
    async clickAccountOverviewButton(){
        await this.step('Click `Account Overview` button',async()=>{
        await this.accountOverviewButton.click();
     });
    }

     async clickForgotInfoButton(){
        await this.step('Click `Forgot Login Info` button',async()=>{
        await this.forgotInfoButton.click();
     });
     }
     async clickUpdateContactInfoButton(){
        await this.step('Click `Update Contact Info` button',async()=>{
        await this.updateContactInfoButton.click();
     });
     }

      async clickrequestLoanButton(){
        await this.step('Click `Request Loan` button',async()=>{
        await this.requestLoanButton.click();
     });
     }

     async clickTransferFundButton(){
        await this.step('Click `Transfer Fund` button',async()=>{
        await this.transferFundButton.click();
     });
     }
    }
    



