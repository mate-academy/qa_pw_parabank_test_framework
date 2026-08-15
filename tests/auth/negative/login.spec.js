import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { fillLoginForm } from '../../../src/ui/actions/auth/login';
import { negativeLoginCases } from '../../../src/common/testData/auth/loginNegativeCases';

for (const { title, username, password, expectedError } of negativeLoginCases) {
  test(`should not log in with ${title}`, async ({ homePage }) => {
    await allure.severity('normal');

    await homePage.openAndAssert();

    await fillLoginForm(homePage, { username, password });
    await homePage.clickLoginButton();

    await homePage.assertLoginError(expectedError);
  });
}
