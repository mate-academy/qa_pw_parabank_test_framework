import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const user = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.helpers.replaceSymbols('###-##-####'),
    password: faker.internet.password(),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }

  return user;
}
