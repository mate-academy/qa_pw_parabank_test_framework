import { test } from '../../_fixtures/fixtures';
import { singUpUser } from '../../../src/ui/actions/auth/SignUpUser';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

test.beforeEach(async ({ page, user, homePage, openNewAccuontPage }) => {
  await allure.parentSuite('Authentication');
  await allure.suite('Open new accoutn another existing account to transfer');
  await allure.subSuite('Positive scenarios');

  await singUpUser(page, user);
  await homePage.clickOpenNewAccountButton();
  await openNewAccuontPage.waitForURL();
  await openNewAccuontPage.selectTypeChecking();
  await openNewAccuontPage.clickSelectOptionIdAccount();
  await openNewAccuontPage.clickOpenNewAccountButton();
  await openNewAccuontPage.assertOpenNewAccountMessageText();
});

test(`Open new accoutn another existing account to transfer`, async ({
  homePage,
  openNewAccuontPage,
}) => {
  await allure.severity(Severity.NORMAL);
  await homePage.clickOpenNewAccountButton();
  await openNewAccuontPage.waitForURL();
  await openNewAccuontPage.selectTypeChecking();
  await openNewAccuontPage.clickSelectOptionIdAnotherAccount();
  await openNewAccuontPage.clickOpenNewAccountButton();
  await openNewAccuontPage.assertOpenNewAccountMessageText();
});
