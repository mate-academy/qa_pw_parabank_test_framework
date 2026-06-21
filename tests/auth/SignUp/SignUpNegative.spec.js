import {test} from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import{
PASSWORDS_MISMACH,
UNUNIQUE_USERNAME,
EMPTY_PASSWORD,
EMPTY_USERNAME ,
EMPTY_SSN,
EMPTY_ZIP,
EMPTY_STATE, 
EMPTY_CITY,
EMPTY_ADRESS,
EMPTY_LAST_NAME,
EMPTY_FIRST_NAME,
EMPTY_CONFIRMATION_PASSWORD, } from '../../../src/ui/constants/authErrorMessages';


const user = generateNewUserData();

const testParameters = [
{
firstName: '',
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password:user.password,
confirmation:user.password,
message: EMPTY_FIRST_NAME,
title: 'empty last name',
},
{
firstName: user.firstName,
lastName: '',
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation:user.password,
message: EMPTY_LAST_NAME,
title:'empty first name',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: '',
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation: user.password,
message: EMPTY_ADRESS,
title:'empty address',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: '',
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation: user.password,
message: EMPTY_STATE,
title:'empty state',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: '',
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation: user.password,
message: EMPTY_ZIP,
title:'empty zip code',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: '',
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation: user.password,
message: EMPTY_CITY,
title:'empty city',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: '',
username: user.username,
password: user.password,
confirmation: user.password,
message: EMPTY_SSN,
title:'empty ssn code',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: '',
password: user.password,
confirmation: user.password,
message: EMPTY_USERNAME,
title:'empty username',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: '',
confirmation: user.password,
message: EMPTY_PASSWORD,
title:'empty password',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation: '',
message: EMPTY_CONFIRMATION_PASSWORD,
title:'empty confirmation password',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: user.username,
password: user.password,
confirmation: '1',
message: PASSWORDS_MISMACH,
title:'password mismatch',
},
{
firstName: user.firstName,
lastName: user.lastName,
address: user.address,
city: user.city,
state: user.state,
zipCode: user.zipCode,
phoneNumber: user.phoneNumber,
ssnCode: user.ssn,
username: 'Margarita',
password: user.password,
confirmation: user.password,
message: UNUNIQUE_USERNAME,
title:'ununique username',
},
];
testParameters.forEach(({ message, title, firstName, lastName, address, state, city, zipCode, phoneNumber, ssnCode, username, password, confirmation,}) =>{
 test.describe('Sign Up negative tests', () => {
    test(`Sign in with ${title}`, async ({ signUpPage, page}) => {
        await signUpPage.open();
        await signUpPage.inputFirstNameField(firstName);
        await signUpPage.inputLastNameField(lastName);
        await signUpPage.inputAdressField(address);
        await signUpPage.inputCityField(city);
        await signUpPage.inputStateField(state);
        await signUpPage.inputZipCodeField(zipCode);
        await signUpPage.inputPhoneNumberField(phoneNumber);
        await signUpPage.inputSSNCodeField(ssnCode);
        await signUpPage.inputUsernameField(username);
        await signUpPage.inputPasswordField(password);
        await signUpPage.inputConfirmationPasswordField(confirmation);
        await signUpPage.clickOnRegisterButton();
        await page.waitForTimeout(1000);
        await signUpPage.assertErrorMessageContainsText(message);
    });
  });
});













// Порожні поля
// Вже іcнуючий username
// Паролі не cпівпадають