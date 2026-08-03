import { faker } from '@faker-js/faker';

export function generateRegistrationData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password({ length: 10 });

  return {
    firstName,
    lastName,
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.string.numeric(10),
    ssn: faker.string.numeric(9),
    username: `${firstName.toLowerCase()}${lastName}`,
    password,
    confirmPassword: password,
  };
}
