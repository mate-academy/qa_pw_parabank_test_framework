import { test } from '@playwright/test';
import { RegisterPage } from '../../src/ui/pages/auth/RegisterPage';
import { getRegisterData } from '../_fixtures/register.fixture';

test.describe('Authentication - Register', () => {
  let registerPage: RegisterPage;
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.open();
  });

  test('Register positive', async () => {
    await registerPage.registerUser(getRegisterData());
    await registerPage.assertRegistrationSuccessful();
  });

  test('Register negative - existing username', async () => {
    await registerPage.registerUser({
      ...getRegisterData(),
      username: 'john',
    });
    await registerPage.assertRegistrationError();
  });
});
