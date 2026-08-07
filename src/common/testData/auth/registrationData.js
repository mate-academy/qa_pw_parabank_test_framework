import { faker } from '@faker-js/faker';
import { generateAddressData } from '../addressData';

export function generateRegistrationData(logger) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password({ length: 10 });

  const user = {
    firstName,
    lastName,
    ...generateAddressData(),
    ssn: faker.string.numeric(9),
    username: `${firstName.toLowerCase()}${lastName}`,
    password,
    confirmPassword: password,
  };

  logger?.debug(`Generated registration data for username "${user.username}"`);

  return user;
}
