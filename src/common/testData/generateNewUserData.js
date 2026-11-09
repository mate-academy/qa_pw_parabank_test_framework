import { faker } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const password = faker.internet.password();

  const user = {
    firstName,
    lastName,

    username: `${firstName}_${lastName}`.replaceAll(`'`, '').toLowerCase(),
    email: `${firstName}_${faker.internet.email()}`.toLowerCase(),
    password,
    confirmPassword: password,

    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    phone: faker.phone.number(),
    zipCode: faker.location.zipCode(),

    ssn: faker.helpers.replaceSymbols('###-##-####'),
  };

  return user;
}
