import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import {test} from '../../_fixtures/fixtures'
import { label, severity } from 'allure-js-commons';


test('Sucsessful `Sign Up` flow test', async ({
signUpPage,
signInPage,
user,
page,
homePage,
})=>{
 await label('parentSuite', 'Parabank');
 await label('suite', 'Sign Up');
 await label('subSuite', 'Sign Up Positive');
 await severity('critical');
    
const password = user.password;
await signInPage.open();
await signInPage.clickOnRegisterButton();
await signUpPage.inputFirstNameField(user.firstName);
await signUpPage.inputLastNameField(user.lastName);
await signUpPage.inputAdressField(user.address);
await signUpPage.inputCityField(user.city);
await signUpPage.inputStateField(user.state);
await signUpPage.inputZipCodeField(user.zipCode);
await signUpPage.inputPhoneNumberField(user.phoneNumber);
await signUpPage.inputSSNCodeField(user.ssn);
await signUpPage.inputUsernameField(user.username);
await signUpPage.inputPasswordField(password);
await signUpPage.inputConfirmationPasswordField(password);
await signUpPage.clickOnRegisterButton();
await page.reload();

await page.waitForTimeout(1000);

await homePage.assertHomePageIsVisible();

});