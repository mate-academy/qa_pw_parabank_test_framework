import {test} from '../../_fixtures/fixtures';
import { label, severity } from 'allure-js-commons';

import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { OverviewPage } from '../../../src/ui/pages/OverviewPage';

let signInPage;
let overviewPage;
let createdUser;

test.use({ contextsNumber: 2 });

test.beforeEach(async({pages}) => {
  createdUser = await signUpUser(pages[0]);
  
  signInPage = new SignInPage(pages[1]);
  overviewPage = new OverviewPage(pages[1]);
});

test('Successful `Sign in` flow test', async ({ pages }) => {
    const page = pages[1];

    await label('parentSuite', 'Parabank');
    await label('suite', 'Sign In');
    await label('subSuite', 'Sign In Positive');
    await severity('critical');
    
    await signInPage.open();
    await signInPage.fillUsernameField(createdUser.username);
    await signInPage.fillPasswordField(createdUser.password);
    await signInPage.clickOnLogInButton();
    await page.reload();
    await overviewPage.assertOverviewPageIsVisible();
});