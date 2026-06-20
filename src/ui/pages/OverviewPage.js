// /parabank/register.htm
import{expect, testStep} from '../../common/helpers/pwHelpers';

const BALANCE_SUM = '$415.50';
const MIN_DEPOSIT = '$100.00';

export class OverviewPage{
   constructor(page){
   this.page = page;
   this.accountOverviewPanel = page.locator('#overviewAccountsApp');
   this.overviewPageTab = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountOverviewPanel = page.locator('#overviewAccountsApp');
    this.firstRowBalance = this.accountOverviewPanel.locator('table tr:first-child td:nth-child(2)');
    this.secondRowBalance = this.accountOverviewPanel.locator('table tr:nth-child(2) td:nth-child(2)');
    this.firstAccountLink = page.locator('#accountTable tbody a').first();
   this.accountId = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.transactionTypeSelect = page.locator('#transactionType');
   this.goButton = page.getByRole('button', { name: 'Go' });
   this.transactionTable = page.locator('#transactionTable');

 }

 
    async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

   async open(){
      await this.step(`Open 'Overview' page`, async()=>{
        await this.page.goto('/parabank/overview.htm', { waitUntil: 'networkidle' });
        });
        }

      async assertAccountOverviewPanelVisible() {
    await this.step(`Assert that overview panel is visible`, async () => {
      await expect(this.accountOverviewPanel).toBeVisible();
    });
  }
   

    async assertOverviewPageIsVisible(){
     await this.step(`Assert 'Overview' page is visible`,async()=>{
        await expect(this.overviewPageTab).toBeVisible();
     });
   }
    

    async assertAccountIdIsVisible(user){
      await this.step(`Acount id '${user.accountId}' is visible`, async()=>{
        await expect(this.accountId).toBeVisible(user);
     });
    }

    async assertRightFirstRowBalance(){
      await this.step(`Acount balance 'BALANCE_SUM' is visible`, async()=>{
        await expect(this.firstRowBalance).toHaveText(String(BALANCE_SUM));
     });
    }

    async assertRightSecondAccBalance(){
      await this.step(`Acount min deposit:'MIN_DEPOSIT' is visible`, async()=>{
        await expect(this.secondRowBalance).toHaveText(String(MIN_DEPOSIT));
     });
    }

      async clickFirstAccountLink(){
        await this.step('Click first account link',async()=>{
        await this.firstAccountLink.click();
     });
     }

     async assertAccountIdValue(accountId){
        await this.step(`Assert account id '${accountId}' is visible`,async()=>{
        await expect(this.accountId).toHaveText(accountId);
     });
     }

     async assertAccountType(type) {
    await this.step(`Assert account type is ${type}`, async () => {
      await expect(this.accountType).toHaveText(type);
    });
  }
    async selectTransactionType(type) {
    await this.step(`Select transaction type '${type}'`, async () => {
      await this.transactionTypeSelect.selectOption(type);
    });
  }
     async getFirstAccountId() {
    return (await this.firstAccountLink.textContent()).trim();
  }

  async clickGoButton() {
    await this.step(`Click 'Go' button`, async () => {
      await this.goButton.click();
    });
  }

  async assertTransactionTableVisible() {
    await this.step(`Assert transaction table is visible`, async () => {
      await expect(this.transactionTable).toBeVisible();
    });
  }
     
  }

    


    
    




