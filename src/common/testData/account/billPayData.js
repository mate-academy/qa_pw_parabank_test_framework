import { faker } from '@faker-js/faker';

export function generateBillPayData() {
  const accountNumber = faker.string.numeric(9);

  return {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.string.numeric(10),
    accountNumber,
    verifyAccountNumber: accountNumber,
    amount: faker.number.int({ min: 10, max: 200 }),
  };
}
