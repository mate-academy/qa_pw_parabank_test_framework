// /parabank/register.htm
import{expect, testStep} from '../../common/helpers/pwHelpers';

const BALANCE_SUM = '$415.50';
const MIN_DEPOSIT = '$100.00';

export class OverviewPage{
   constructor(page, userId = 0){
    this.page = page;
    this.userId = userId;
    this.overviewPageTab = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountOverviewPanel = page.locator('#overviewAccountsApp');
    this.accountId = page.locator('#accountId');
    this.firstRowBalance = this.accountOverviewPanel.locator('table tr:first-child td:nth-child(2)');
    this.secondRowBalance = this.accountOverviewPanel.locator('table tr:nth-child(2) td:nth-child(2)');
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
            await expect(this.accountId).toBeVisible();
            await expect(this.accountId).toHaveText(String(user.accountId));
     });
    }

    async assertRightFirstRowBalance(){
      await this.step(`Acount balance 'BALANCE_SUM' is visible`, async()=>{
        await expect(this.firstRowBalance).toHaveText(String(BALANCE_SUM));
     });
    }

    async assertRightSecondAccBalance(){
      await this.step(`Acount min deposit:'${MIN_DEPOSIT}' is visible`, async()=>{
        await expect(this.secondRowBalance).toHaveText(String(MIN_DEPOSIT));
     });
    }

    
  }

    


    
    




