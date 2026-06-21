import{expect, testStep} from '../../common/helpers/pwHelpers'

export class UpdateProfilePage{
 constructor (page){
    this.page = page;
    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.adressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberField = page.locator('[id="customer.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.profileUpdatedHeading = page.getByRole('heading', { name: 'Profile Updated' });
    this.updatedProfileText = page.locator('#rightPanel').getByText('Your updated address and phone number have been added to the system.');

 }
  async step(title, stepToRun) {
    return await testStep(title, stepToRun);
  }

  async open() {
    await this.step(`Open 'Look Up' page`, async () => {
      await this.page.goto('/parabank/updateprofile.htm');
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

    async clickUpdateProfileButton(){
        await this.step(`Click  'Update Profile' button`, async()=>{
        await this.updateProfileButton.click();
        }); 
    }
    async assertSuccsessOperationTextIsVisible(){
        await this.step(`Assert the 'Profile Updated' is shown`, async()=>{
        await expect(this.updatedProfileText.first()).toBeVisible();
        }); 
    }

    async assertContactDataIsSaved(profileData){
        await this.step(`Assert updated contact data is saved`, async()=>{
        await expect(this.adressField).toHaveValue(profileData.address);
        await expect(this.cityField).toHaveValue(profileData.city);
        await expect(this.stateField).toHaveValue(profileData.state);
        await expect(this.zipCodeField).toHaveValue(profileData.zipCode);
        await expect(this.phoneNumberField).toHaveValue(profileData.phoneNumber);
        });
    }

    async assertUpdateProfileFormIsVisible(){
        await this.step(`Assert update profile form is visible`, async()=>{
        await expect(this.updateProfileButton).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Error!' })).toHaveCount(0);
        });
    }
}
