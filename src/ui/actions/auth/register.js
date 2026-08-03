export async function fillRegistrationForm(registerPage, data) {
  await registerPage.step('Fill registration form', async () => {
    await registerPage.fillFirstName(data.firstName);
    await registerPage.fillLastName(data.lastName);
    await registerPage.fillStreet(data.street);
    await registerPage.fillCity(data.city);
    await registerPage.fillState(data.state);
    await registerPage.fillZipCode(data.zipCode);
    await registerPage.fillPhoneNumber(data.phoneNumber);
    await registerPage.fillSsn(data.ssn);
    await registerPage.fillUsername(data.username);
    await registerPage.fillPassword(data.password);
    await registerPage.fillConfirmPassword(data.confirmPassword);
  });
}

export async function registerNewUser(registerPage, data) {
  await registerPage.open();
  await fillRegistrationForm(registerPage, data);
  await registerPage.clickRegisterButton();
  await registerPage.assertRegistrationSuccessful(data.username);
}
