import { test } from '../../_fixtures/fixtures';
import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('open new account Saving');
  await allure.subSuite('Positive scenarios');
  await singUpUser(page, user);
});

test(`Open new accoutn saving`, async ({ homePage, openNewAccuontPage }) => {
  await allure.severity(Severity.NORMAL);
  await homePage.clickOpenNewAccountButton();
  await openNewAccuontPage.waitForURL();
  await openNewAccuontPage.selectTypeSavings();
  await openNewAccuontPage.clickSelectOptionIdAccount();
  await openNewAccuontPage.clickOpenNewAccountButton();
  await openNewAccuontPage.assertOpenNewAccountMessageText();
});
