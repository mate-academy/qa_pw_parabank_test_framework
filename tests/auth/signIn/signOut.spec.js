import {test} from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { label, severity } from 'allure-js-commons';

test('Successful `Sign Out` flow test', async ({ signInPage, homePage, page }) => {
    await label('parentSuite', 'Parabank');
    await label('suite', 'Sign In');
    await label('subSuite', 'Sign Out');
    await severity('critical');
    
    await signUpUser(page);
    await homePage.assertHomePageIsVisible();
    await homePage.clickLogoutButton();
    await signInPage.assertSignInPageIsVisible();
});