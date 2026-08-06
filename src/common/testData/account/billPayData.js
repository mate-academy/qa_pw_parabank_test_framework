import { faker } from '@faker-js/faker';

export function generateBillPayData(logger) {
  const accountNumber = faker.string.numeric(9);

  const billPayData = {
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

  logger?.debug(`Generated bill pay data for account #${accountNumber}`);

  return billPayData;
}
