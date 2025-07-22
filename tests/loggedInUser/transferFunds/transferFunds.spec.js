import { test } from "../../_fixtures/fixtures";
import { twoAccountsCreation } from "../../../src/common/helpers/twoAccountsCreation";
import { faker } from "@faker-js/faker";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page, user }) => {
  await twoAccountsCreation(page, user);
});

test('user can perform the transfer funds', async ({
  transferFundsPage
}) => {
  const amount = faker.number.int({ min: 100, max: 300 });

  await allure.severity(`normal`);

  await transferFundsPage.gotoTransferFundsPage();
  await transferFundsPage.fillAmountField(amount);
  await transferFundsPage.selectOptionFromAccountDropdown();
  await transferFundsPage.selectOptionToAccountDropdown();
  await transferFundsPage.clickTransferButton();
  await transferFundsPage.assertSuccessfulMessage();
});

