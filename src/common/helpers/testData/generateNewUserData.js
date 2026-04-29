import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    firstName,
    lastName,
    username: `${firstName}_${lastName}`.replaceAll(`'`).toLowerCase(),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),

    phone: faker.phone.number(),
    ssn: faker.string.numeric('###-##-####'),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}
