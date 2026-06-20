import { test } from '../../_fixtures/fixtures';
import {
EMPTY_PASSWORD_OR_USERNAME_SIGN_IN,
USER_IS_NOT_VERIFFIED,
} from '../../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();

const testParameters = [
{
username: '',
password:user.password,
message: EMPTY_PASSWORD_OR_USERNAME_SIGN_IN,
title:'empty username',
},
{
username: user.username,
password: '',
message: EMPTY_PASSWORD_OR_USERNAME_SIGN_IN,
title:'empty password',
},
{
username: user.username,
password: user.password,
message: USER_IS_NOT_VERIFFIED,
title:'non-verified user',
}
];


testParameters.forEach(({ message, title, username, password,}) =>{
 test.describe('Sign In negative tests', () => {
    test(`Sign in with ${title}`, async ({ signInPage, page}) => {
    await signInPage.open();
    await signInPage.fillUsernameField(username);
    await signInPage.fillPasswordField(password);
    await signInPage.clickOnLogInButton();
    await page.waitForTimeout(1000);
    await signInPage.assertErrorMessageContainsText(message);
    });
  });
});
