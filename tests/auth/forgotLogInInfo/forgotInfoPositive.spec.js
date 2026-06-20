import { test } from '../../_fixtures/fixtures';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let createdUser;


test.beforeEach(async({page}) => {
  createdUser = await signUpUser(page);
  
});

test('Successful `Sign in` flow test', async ({ 
    homePage,
    lookupPage,
    page
}) => {
  
    await homePage.clickLogoutButton();
    await homePage.clickForgotInfoButton();
    await lookupPage.inputFirstNameField(createdUser.firstName);
    await lookupPage.inputLastNameField(createdUser.lastName);
    await lookupPage.inputAdressField(createdUser.address);
    await lookupPage.inputCityField(createdUser.city);
    await lookupPage.inputStateField(createdUser.state);
    await lookupPage.inputZipCodeField(createdUser.zipCode);
    await lookupPage.inputSSNCodeField(createdUser.ssn);
    await lookupPage.clickFindMyLoginInfoButton();
    await lookupPage.assertSuccsessOperationTextIsVisible();

});
