import { fakerEN_US as fakerUS } from '@faker-js/faker';

export function generateNewUserData(logger = null) {
  const randomNumber = Math.floor(Math.random() * 100000) + 1;
  const firstName = fakerUS.person.firstName();
  const lastName = fakerUS.person.lastName();
  const street = fakerUS.location.streetAddress();
  const city = fakerUS.location.city();
  const state = fakerUS.location.state();
  const zipCode = fakerUS.location.zipCode();
  const phone = fakerUS.string.numeric(10);
  const ssn = fakerUS.string.numeric(9);
  const username = `${lastName}_${randomNumber}`.replaceAll(`'`).toLowerCase();
  const password = fakerUS.internet.password();


  const user = {
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}
