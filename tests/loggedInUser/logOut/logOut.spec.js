import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';






test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);

});

test('Successful `Log out` flow test', async ({ logOutPage }) => {

  await logOutPage.clickLogOutLink();
  await logOutPage.assertLogInButtonIsVisible();

 


});
