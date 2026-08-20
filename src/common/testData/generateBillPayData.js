import { faker } from '@faker-js/faker';

export function generateBillPayData() {
  const accountNumber = faker.finance.accountNumber();

  return {
    payeeName: faker.person.fullName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    accountNumber,
    verifyAccount: accountNumber,
    amount: '100.00',
  };
}
