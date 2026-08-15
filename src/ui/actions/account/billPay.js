export async function fillBillPayForm(billPayPage, data) {
  await billPayPage.step('Fill Bill Pay form', async () => {
    await billPayPage.fillPayeeName(data.name);
    await billPayPage.fillStreet(data.street);
    await billPayPage.fillCity(data.city);
    await billPayPage.fillState(data.state);
    await billPayPage.fillZipCode(data.zipCode);
    await billPayPage.fillPhoneNumber(data.phoneNumber);
    await billPayPage.fillAccountNumber(data.accountNumber);
    await billPayPage.fillVerifyAccountNumber(data.verifyAccountNumber);
    await billPayPage.fillAmount(data.amount);
  });
}
