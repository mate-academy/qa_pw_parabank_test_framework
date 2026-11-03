import { faker } from '@faker-js/faker';
import { formatObject, slice } from '../../helpers/stringHelpers';
import { USER_DATA_MAX_LENGTH as MAX_LEN } from '../../constants/constraints';

export function generateNewUserData(logger = null) {
  const suffix = faker.string.alphanumeric({ length: 6, casing: 'lower' });
  const firstName = slice(faker.person.firstName(), MAX_LEN.firstName);
  const lastName = slice(faker.person.lastName(), MAX_LEN.lastName);

  const user = {
    firstName,
    lastName,
    address: slice(faker.location.streetAddress(), MAX_LEN.address),
    city: slice(faker.location.city(), MAX_LEN.city),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.string.numeric(MAX_LEN.zipCode),
    phone: faker.string.numeric(MAX_LEN.phone),
    ssn: faker.helpers.replaceSymbols('###-##-####'),
    username: slice(`${firstName}_${lastName}_${suffix}`, MAX_LEN.username),
    password: faker.internet.password({ length: 12, memorable: false }),
  };

  if (logger) {
    logger.debug(`Generated new user data:\n${formatObject(user)}`);
  }
  return user;
}
