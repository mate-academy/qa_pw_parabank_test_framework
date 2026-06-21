import  {expect, testStep} from '../../../common/helpers/pwHelpers';

export class SignUpPage{
constructor(page, userId){
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.adressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberField = page.locator('[id="customer.phoneNumber"]');
    this.ssnCodeField = page.locator('[id="customer.ssn"]');
    this.usernameField = page.locator('[id="customer.username"]');
    this.passwordField = page.locator('[id="customer.password"]');
    this.confirmationPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.errorMessage = page.locator('.error');
    this.usernameExistsError = page.getByText('This username already exists');

    }


    async step(title, stepToRun){
        return await testStep(title, stepToRun, this.userId);
    }
    async open(){
        await this.step(`Open 'Sign Up' page`, async()=>{
        await this.page.goto('/parabank/register.htm');
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
    async inputPhoneNumberField(number){
        await this.step(`Fill the 'Phone #' field'`, async()=>{
        await this.phoneNumberField.fill(number);

        });
    }
    async inputSSNCodeField(ssnNumber){
        await this.step(`Fill the 'SSN' field'`, async()=>{
        await this.ssnCodeField.fill(ssnNumber);

        });
    }
     async inputUsernameField(username){
        await this.step(`Fill the 'Username' field'`, async()=>{
        await this.usernameField.fill(username);

        });
    }
     async inputPasswordField(password){
        await this.step(`Fill the 'Password' field'`, async()=>{
        await this.passwordField.fill(password);
        });
    }
      async inputConfirmationPasswordField(password){
        await this.step(`Fill the 'Confirm' field'`, async()=>{
        await this.confirmationPasswordField.fill(password);
        });
    }
    async clickOnRegisterButton(){
        await this.step(`Click on the 'Register' button'`, async()=>{
        await this.registerButton.click();
        });
    }

    async assertErrorMessageContainsText(messageText){
        await this.step (`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

    async isUsernameAlreadyExistsErrorVisible(){
        try {
            const count = await this.usernameExistsError.count();
            if (count === 0) {
                return false;
            }

            return await this.usernameExistsError.first().isVisible().catch(() => false);
        } catch {
            return false;
        }
    }
    }
