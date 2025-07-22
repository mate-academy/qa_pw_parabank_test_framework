import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('user is able to log out', async ({
  homePage
}) => {
  await allure.severity(`normal`);

  await homePage.clickLogOut();
  await homePage.assertLoginFormIsVisible();
});
