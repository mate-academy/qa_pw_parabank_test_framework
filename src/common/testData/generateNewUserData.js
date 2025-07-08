import { faker } from '@faker-js/faker';

export function generateNewUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    firstName,
    lastName,
    username: `${firstName}_${lastName}`.replaceAll(`'`).toLowerCase(),
    email: `${firstName}_${faker.internet.email()}`.toLowerCase(),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number('+1-###-###-####'),
    ssn: faker.helpers.replaceSymbols('###-##-####'),
  };

  return user;
}
