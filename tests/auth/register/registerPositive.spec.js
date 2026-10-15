import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test('Register a new user successfully', async ({ page, user }) => {
  await allure.severity('critical');

  await registerUser(page, user);
});
