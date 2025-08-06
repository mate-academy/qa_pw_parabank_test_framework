import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();

  const phonePrefix = '1714';
  const randomSeven = Math.floor(Math.random() * 1_000_0000)
    .toString()
    .padStart(7, '0');
  const phoneNumber = phonePrefix + randomSeven;
  const fullName = `${firstName} ${lastName}`;

  const username = faker.string.uuid().split('-').pop();

  const user = {
    firstName: firstName,
    lastName: lastName,
    fullName: fullName,
    payeeName: fullName,
    phoneNumber: phoneNumber,
    ssn: faker.helpers.replaceSymbols('###-##-###'),
    //email: faker.internet.email(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    username: username,
    password: password,
    repeatPassword: password,
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }

  return user;
}
