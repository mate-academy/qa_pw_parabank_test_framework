import{expect, testStep} from '../../common/helpers/pwHelpers'

export class LookUpPage{
 constructor (page){
    this.page = page;
    this.succsessOperationText = page.getByText('Your login information was located successfully. You are now logged in');
    this.findMyLoginInfoButton = page.getByRole('button').filter({ hasText: 'Find My Login Info' });
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.adressField = page.locator('[id="address.street"]');
    this.cityField = page.locator('[id="address.city"]');
    this.stateField = page.locator('[id="address.state"]');
    this.zipCodeField = page.locator('[id="address.zipCode"]');
    this.ssnCodeField = page.locator('[id="ssn"]');
    this.errorMessage = page.locator('.error');

 }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Look Up' page`, async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }
  
  async assertSuccsessOperationTextIsVisible(){
    await this.step(`Information was located successfully`, async () => {
    await expect(this.succsessOperationText).toBeVisible();
    });
  }

  async clickFindMyLoginInfoButton(){
    await this.step(`Click 'Find My Login Info' button`, async () => {
    await this.findMyLoginInfoButton.click();
  });

}

async inputFirstNameField(firstName){
        await this.step(`Fill the 'First Name' field'`, async()=>{
        await this.firstNameField.fill(firstName);

        });
    }
    async inputLastNameField(lastName){
        await this.step(`Fill the 'Last Name' field'`, async()=>{
        await this.lastNameField.fill(lastName);

        });
    }
    
    async inputAdressField(adress){
        await this.step(`Fill the 'Adress' field'`, async()=>{
        await this.adressField.fill(adress);

        });
    }

     async inputCityField(city){
        await this.step(`Fill the 'City' field'`, async()=>{
        await this.cityField.fill(city);

        });
    }
    async inputStateField(state){
        await this.step(`Fill the 'State' field'`, async()=>{
        await this.stateField.fill(state);

        });
    }
     async inputZipCodeField(zip){
        await this.step(`Fill the 'Zip Code' field'`, async()=>{
        await this.zipCodeField.fill(zip);

        });

    }
     async inputSSNCodeField(ssnNumber){
        await this.step(`Fill the 'SSN' field'`, async()=>{
        await this.ssnCodeField.fill(ssnNumber);

        });
    }
    async errorMessageIsVisible(messageText){
      await this.step(`Assert the '${messageText}' error is shown`, async()=>{
        await expect(this.errorMessage).toContainText(messageText);

        });
    
    }
  }