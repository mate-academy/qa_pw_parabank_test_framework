import {test} from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test('Successful `Sign Out` flow test', async ({ signInPage, homePage, page }) => {
    await signUpUser(page);
    await homePage.assertHomePageIsVisible();
    await homePage.clickLogoutButton();
    await signInPage.assertSignInPageIsVisible();
});