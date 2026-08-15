export async function fillCustomerLookupForm(customerLookupPage, user) {
  await customerLookupPage.step('Fill customer lookup form', async () => {
    await customerLookupPage.fillFirstName(user.firstName);
    await customerLookupPage.fillLastName(user.lastName);
    await customerLookupPage.fillStreet(user.street);
    await customerLookupPage.fillCity(user.city);
    await customerLookupPage.fillState(user.state);
    await customerLookupPage.fillZipCode(user.zipCode);
    await customerLookupPage.fillSsn(user.ssn);
  });
}
