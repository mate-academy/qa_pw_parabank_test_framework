import { RegisterPage } from "../../pages/auth/RegisterPage";

export async function fillRegistrationForm(registerPage, user) {
  await registerPage.step('Fill registration form', async () => {
    await registerPage.fillFirstName(user.firstName);
    await registerPage.fillLastName(user.lastName);
    await registerPage.fillStreet(user.street);
    await registerPage.fillCity(user.city);
    await registerPage.fillState(user.state);
    await registerPage.fillZipCode(user.zipCode);
    await registerPage.fillPhoneNumber(user.phoneNumber);
    await registerPage.fillSsn(user.ssn);
    await registerPage.fillUsername(user.username);
    await registerPage.fillPassword(user.password);
    await registerPage.fillConfirmPassword(user.confirmPassword);
  });
}

export async function registerNewUser(page, user) {
  const registerPage = new RegisterPage(page);

  await registerPage.openAndAssert();
  await fillRegistrationForm(registerPage, user);
  await registerPage.clickRegisterButton();
  await registerPage.assertRegistrationSuccessful(user.username);
}
