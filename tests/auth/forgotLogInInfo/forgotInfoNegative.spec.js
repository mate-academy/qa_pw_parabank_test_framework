import { test } from '../../_fixtures/fixtures';
import { label, severity } from 'allure-js-commons';

import {
CUSTOMER_INFO_NOT_FOUND,
} from '../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

const user = generateNewUserData();


test.beforeEach(async({page}) => {
   await signUpUser(page);
  
});

test('Successful `Sign in` flow test', async ({ 
    homePage,
    lookupPage,
    page,
    user,
}) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Forgot Log In Info');
    await label('subSuite', 'Forgot Info Negative');
    await severity('normal');
  
    await homePage.clickLogoutButton();
    await homePage.clickForgotInfoButton();
    await lookupPage.inputFirstNameField(user.firstName);
    await lookupPage.inputLastNameField(user.lastName);
    await lookupPage.inputAdressField(user.address);
    await lookupPage.inputCityField(user.city);
    await lookupPage.inputStateField(user.state);
    await lookupPage.inputZipCodeField(user.zipCode);
    await lookupPage.inputSSNCodeField(user.ssn);
    await lookupPage.clickFindMyLoginInfoButton();
    await page.waitForTimeout(1000);
    await lookupPage.errorMessageIsVisible(CUSTOMER_INFO_NOT_FOUND);

});