import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {

  const password = faker.internet.password();

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
    passwordConfirmation: password,
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}
