import { faker } from '@faker-js/faker';

export function generateUserData(overrides = {}, logger = null) {
  const password = faker.internet.password();
  const accountNumber = faker.string.numeric(9);

  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: faker.internet.username(),
    password,
    confirm: password,
    accountNumber,
    verifyAccountNumber: accountNumber,
    amount: faker.finance.amount({ min: 10, max: 500 }),
    loanAmount: faker.finance.amount({ min: 500, max: 1500 }),
    downPayment: faker.finance.amount({ min: 5, max: 50 }),
    ...overrides,
  };

  if (logger) {
    logger.debug(`Generated registration data: ${JSON.stringify(user)}`);
  }

  return user;
}