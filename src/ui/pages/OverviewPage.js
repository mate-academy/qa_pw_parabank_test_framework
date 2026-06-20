// /parabank/register.htm
import{expect, testStep} from '../../common/helpers/pwHelpers';
import { DEFAULT_DEPOSIT_BALANCE, MIN_DEPOSIT} from '../../ui/constants/constDeposit';



export class OverviewPage{
   constructor(page, user, userId = 0){
   this.page = page;
   this.userID = userId;
   this.overviewPageTab = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountOverviewPanel = page.locator('#overviewAccountsApp');
    this.firstRowBalance = this.accountOverviewPanel.locator('table tr:first-child td:nth-child(2)');
    this.secondRowBalance = this.accountOverviewPanel.locator('table tr:first-child(2) td:nth-child(2)');
  

 }

 
    async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

   async open(){
      await this.step(`Open 'Overview' page`, async()=>{
        await this.page.goto('/parabank/overview.htm', { waitUntil: 'networkidle' });
        });
        }
   

    async assertOverviewPageIsVisible(){
     await this.step(`Open 'Home Page'`,async()=>{
        await expect(this.overviewPageTab).toBeVisible();
     });
   }
    

    async assertAccountIdIsVisible(user){
      await this.step(`Acount id '${user.accountId}' is visible`, async()=>{
        await expect(this.accountNumber).toBeVisible(user);
     });
    }

    async assertRightFirstRowBalance(){
      await this.step(`Acount balance '${DEFAULT_DEPOSIT_BALANCE-MIN_DEPOSIT}' is visible`, async()=>{
        await expect(this.firstRowBalance).toBeVisible(DEFAULT_DEPOSIT_BALANCE-MIN_DEPOSIT);
     });
    }

    async assertRightSecondAccBalance(){
      await this.step(`Acount min deposit:'${MIN_DEPOSIT}' is visible`, async()=>{
        await expect(this.firstRowBalance).toBeVisible(MIN_DEPOSIT);
     });
    }

    
  }

    


    
    




