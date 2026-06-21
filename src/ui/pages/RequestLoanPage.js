import{expect, testStep} from '../../common/helpers/pwHelpers';

export class RequestLoanPage{
constructor(page, userId){
    this.page = page;
    this.userId = userId;
    this.loanAmount = page.locator('#amount');
    this.downPayment = page.locator('#downPayment');
    this.fromAccount = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.approvedLoanText = page.getByText(/Congratulations, your loan has been approved\./i);
    this.loanStatus = page.locator('#loanStatus');
    this.newAccountIdButton = page.locator('#newAccountId');
    this.accountDetails = page.getByRole('heading', { name: 'Account Details' });
    this.accountType = page.locator('#accountType');
    this.accountBalance = page.locator('#balance');
    this.errorMessage = page.getByText('We cannot grant a loan in that amount with your available funds.');

    }
        async step(title, stepToRun){
        return await testStep(title, stepToRun, this.userId);
    }
    async open(){
        await this.step(`Open 'Sign Up' page`, async()=>{
        await this.page.goto('/parabank/requestloan.htm');
        });
        }

    async inputLoanAmount(amount){
        await this.step(`Fill the 'Loan Amount' field'`,  async () => {
        await this.loanAmount.fill(amount);
    });
        }
    async inputDownPayment( payment){
        await this.step(`Fill the 'Down Payment' field'` , async () => {
        await this.downPayment.fill(payment);
    });
        }
     async inputFromAccount(){
        await this.step(`Fill the 'Down Payment' field'` , async () => {
        await this.fromAccount.fill();
    });
        }

    // async selectFromSecondAccount(){
    //     await this.step(`Fill the 'Down Payment: $' field'`)
    //  await this.accountTypeDropdown.selectOption('1');
    // }
     async clickApplyNowButton(){
        await this.step(`Click on 'Apply Now' button `, async () => {
     await this.applyNowButton.click();
    });
        }

    
     async assertLoanRequestApprovedTextVisible(){
        await this.step(`'Loan Request' is visible `, async () => {
     await expect(this.approvedLoanText).toBeVisible();
     });
        }


    async assertLoanStatusIs(expectedStatus = 'Approved'){
        await this.step(`'Loan Status' is visible `, async () => {
     await expect(this.loanStatus).toHaveText(expectedStatus);
     });
        }

     async clickNewAccountIdButton(){
       await this.step(`Click on 'New Account Id' button `, async () => {
      await this.newAccountIdButton.click();

   });
    }
    

    async assertAccountDetailsIsVisible(){
        await this.step(`'Account Details' is visible `, async () => {
     await expect(this.accountDetails).toBeVisible();  
     });
        }

        async assertAccountBalance(expectedAmount){
        await this.step(`'Account Balance' text is visible `, async () => {
            if (expectedAmount) {
                await expect(this.accountBalance).toContainText(expectedAmount);
                return;
            }

            await expect(this.accountBalance).toBeVisible();
     });
        }
  
    async assertAccountType(expectedType){
        await this.step(`'Account Type' is visible `, async () => {
            if (expectedType) {
                await expect(this.accountType).toHaveText(expectedType);
                return;
            }

            await expect(this.accountType).toBeVisible();
     });
        }
 async assertLoanErrorMessageIsVisible(){
        await this.step (`Assert the Load Error is shown`, async () => {
            await expect(this.errorMessage).toBeVisible();
     });
        }
    }
