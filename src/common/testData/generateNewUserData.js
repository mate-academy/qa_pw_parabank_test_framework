import { faker } from '@faker-js/faker';

export function generateNewUserData(logger) {
  const uniqueUsername = `u${faker.string.alphanumeric(10)}`;

  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric('###-##-####'),
    username: uniqueUsername,
    password: faker.internet.password(),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(userData)}`);
  }

  return userData;
}
