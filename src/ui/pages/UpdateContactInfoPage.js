import  {expect, testStep} from '../../../common/helpers/pwHelpers';

export class UpdateContactInfoPage{
constructor(page, userId){
    this.page = page;
    this.userID = userId;
    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.adressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberField = page.locator('[id="customer.phoneNumber"]');
    this.errorMessage = page.locator('.error');
    this.updatedInfoMessage = page.getByRole('heading', { name: 'Profile Updated' })

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

    async assertErrorMessageContainsText(messageText){
            await this.step (`Assert the '${messageText}' error is shown`, async () => {
          await expect(this.errorMessage).toContainText(messageText);
        });
      }

    async assertInfoIsUpdated(infoText){
        await this.step(`Assert the '${infoText}' is shown`, async () => {
          await expect(this.updatedInfoMessage).toContainText(infoText);
        });
      }
     
    }