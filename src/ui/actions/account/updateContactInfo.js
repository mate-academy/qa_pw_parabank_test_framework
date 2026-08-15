export async function fillUpdateContactInfoForm(updateContactInfoPage, data) {
  await updateContactInfoPage.step('Fill Update Profile form', async () => {
    await updateContactInfoPage.fillFirstName(data.firstName);
    await updateContactInfoPage.fillLastName(data.lastName);
    await updateContactInfoPage.fillStreet(data.street);
    await updateContactInfoPage.fillCity(data.city);
    await updateContactInfoPage.fillState(data.state);
    await updateContactInfoPage.fillZipCode(data.zipCode);
    await updateContactInfoPage.fillPhoneNumber(data.phoneNumber);
  });
}
