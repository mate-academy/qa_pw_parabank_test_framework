import{expect, testStep} from '../../../common/helpers/pwHelpers';


export class BillPayPage{
 constructor (page){
    this.page = page;
    this.payeeNameField = page.locator('input[name="payee.name"]');
    this.payeeAdressField = page.locator('input[name="payee.address.street"]');
    this.payeeCityField = page.locator('input[name="payee.address.city"]');
    this.payeeStateFieldField = page.locator('input[name="payee.address.state"]');
    this.payeeZipCodeField = page.locator('input[name="payee.address.zipCode"]');
    this.payeePhoneNumberField = page.locator('input[name="payee.phoneNumber"]');
    this.payeeAccountNumberField = page.locator('input[name="payee.accountNumber"]');
    this.payeeVerifyAccountNumberField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.billPaymetCompleateText = page.locator('h1', { hasText: 'Bill Payment Complete' });

 }

async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Bill Pay Page' page`, async () => {
      await this.page.goto('/parabank/billpay.htm');
    });
  }
 async inputPayeeNameField(username){
        await this.step(`Fill the 'Name' field'`, async()=>{
        await this.payeeNameField.fill(username);
        });
    }

 async inputPayeeAdressField(adress){
        await this.step(`Fill the 'Adress' field'`, async()=>{
        await this.payeeAdressField.fill(adress);
        });
    }
async inputPayeeCityField(city){
        await this.step(`Fill the 'City' field'`, async()=>{
        await this.payeeCityField.fill(city);
        });
    }
    async inputPayeeStateField(state){
        await this.step(`Fill the 'State' field'`, async()=>{
        await this.payeeStateFieldField.fill(state);
        });
    }
     async inputPayeeZipCodeField(zip){
        await this.step(`Fill the 'Zip' field'`, async()=>{
        await this.payeeZipCodeField.fill(zip);
        });
    }
    async inputPayeePhoneNumberField(phone){
        await this.step(`Fill the 'Phone' field'`, async()=>{
        await this.payeePhoneNumberField.fill(phone);
        });
    }
    async inputPayeeAccountNumberField(number){
        await this.step(`Fill the 'Account Number' field'`, async()=>{
        await this.payeeAccountNumberField.fill(number);
        });
    }
    async inputVerifyAccountNumberField(number){
        await this.step(`Fill the 'Verify Account Number' field'`, async()=>{
        await this.payeeVerifyAccountNumberField.fill(number);
        });
    }
    async inputAmountField(amount){
        await this.step(`Fill the 'Amount' field'`, async()=>{
        await this.amountField.fill(amount);
        });
    }
    async clickOnSendPaymentButton(){
        await await this.step(`Click the 'Send Payment' button'`, async()=>{
        await this.sendPaymentButton.click();
     });
    }

    async assertBillPaymetCompleateTextIsVisible(){
      await this.step(`Assert the 'Bill Payment Complete' is shown`, async()=>{
        await expect(this.billPaymetCompleateText).toBeVisible();
     });
    }
    }



