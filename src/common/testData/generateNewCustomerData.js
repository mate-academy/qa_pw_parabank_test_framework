import { faker } from '@faker-js/faker';

export function generateNewCustomerData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();

  const customer = {
    firstName,
    lastName,
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.phone.number(),
    ssn: faker.helpers.replaceSymbols('###-##-####'),
    username:
      `${firstName}_${lastName}_${faker.string.alphanumeric(6)}`.toLowerCase(),
    password,
    confirmPassword: password,
  };

  if (logger) {
    logger.debug(`Generated new customer data: ${JSON.stringify(customer)}`);
  }

  return customer;
}
