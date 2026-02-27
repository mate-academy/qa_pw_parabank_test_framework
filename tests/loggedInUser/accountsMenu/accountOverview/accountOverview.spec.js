import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';







test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
  

});

test('Accounts Overview layout test', async ({ 
   
  accountOverviewPage,
}) => {

  
  await accountOverviewPage.clickAccountsOverviewLink();
  await accountOverviewPage.assertDashboardLayout();



});
