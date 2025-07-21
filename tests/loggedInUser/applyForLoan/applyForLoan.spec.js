import { test } from "../../_fixtures/fixtures";
import { signUpUser } from "../../../src/common/helpers/signUpUser";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
})

test('user is able to apply for a loan', async ({
  applyForLoanPage
}) => {
  const loanAmount = faker.number.int({ min: 600, max: 1000 });
  const downPayment = faker.number.int({ max: 500 });

  await applyForLoanPage.clickRequestLoanButton();
  await applyForLoanPage.fillLoanAmountField(loanAmount);
  await applyForLoanPage.fillDownPaymentField(downPayment);
  await applyForLoanPage.clickApplyNowButton();
  await applyForLoanPage.assertSuccessfulMessage();
});
