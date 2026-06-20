import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';
import {testStep} from '../../../common/helpers/pwHelpers';
import { generateNewUserData } from '../../../common/testData/generateNewUserData';

export async function signUpUser (page, userOrId = 0){
    let createdUser = typeof userOrId === 'object' && userOrId !== null
        ? userOrId
        : generateNewUserData();
    const userId = typeof userOrId === 'number' ? userOrId : 0;
    const maxAttempts = 5;
   
    return await testStep (
    `Sign up user`,
    async () => {
        const signUpPage = new SignUpPage(page, userId);
        const homePage = new HomePage(page, createdUser);


        await signUpPage.open();
        await signUpPage.inputFirstNameField(createdUser.firstName);
        await signUpPage.inputLastNameField(createdUser.lastName);
        await signUpPage.inputAdressField(createdUser.address);
        await signUpPage.inputCityField(createdUser.city);
        await signUpPage.inputStateField(createdUser.state);
        await signUpPage.inputZipCodeField(createdUser.zipCode);
        await signUpPage.inputPhoneNumberField(createdUser.phoneNumber);
        await signUpPage.inputSSNCodeField(createdUser.ssn);
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            await signUpPage.inputUsernameField(createdUser.username);
            await signUpPage.inputPasswordField(createdUser.password);
            await signUpPage.inputConfirmationPasswordField(createdUser.password);
            await signUpPage.clickOnRegisterButton();

            const isLoggedIn = await homePage.logOutButton
                .waitFor({ state: 'visible', timeout: 1500 })
                .then(() => true)
                .catch(() => false);
            if (isLoggedIn) {
                break;
            }

            if (attempt === maxAttempts) {
                throw new Error('Unable to register user after multiple retries.');
            }

            const nextUserData = generateNewUserData();
            createdUser.username = nextUserData.username;
            createdUser.password = nextUserData.password;
        }

        await homePage.assertHomePageIsVisible();

        createdUser.accountId = await homePage.getAccountId();

        return createdUser;
    },
    );
}