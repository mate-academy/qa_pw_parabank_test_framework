export async function fillCustomerLookupForm(customerLookupPage, data) {
  await customerLookupPage.step('Fill customer lookup form', async () => {
    await customerLookupPage.fillFirstName(data.firstName);
    await customerLookupPage.fillLastName(data.lastName);
    await customerLookupPage.fillStreet(data.street);
    await customerLookupPage.fillCity(data.city);
    await customerLookupPage.fillState(data.state);
    await customerLookupPage.fillZipCode(data.zipCode);
    await customerLookupPage.fillSsn(data.ssn);
  });
}
