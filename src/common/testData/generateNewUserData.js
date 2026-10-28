import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const uniqueId = randomUUID().replaceAll('-', '').slice(0, 12);

  const user = {
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: `user${uniqueId}`,
    password: faker.internet.password({ length: 10 }),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }

  return user;
}
