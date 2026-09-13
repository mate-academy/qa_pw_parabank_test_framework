import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    firstName,
    lastName,
    addressStreet: faker.location.streetAddress(),
    addressCity: faker.location.city(),
    addressState: faker.location.state(),
    addressZipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    snn: faker.string.numeric(9),
    password: faker.internet.password(),
    username: `${firstName}${lastName}`.replaceAll(`'`).toLowerCase(),
    newPassword: faker.internet.password(),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}
