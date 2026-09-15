import { faker } from '@faker-js/faker';

/**
 * Parabank stores customers in fixed-width HSQLDB columns
 * (WEB-INF/classes/com/parasoft/parabank/dao/jdbc/sql/create.sql).
 * Overflowing a column is not reported as a validation error - registration
 * fails with the misleading "This username already exists." - so generated
 * test data has to stay inside these limits.
 */
export const PARABANK_FIELD_LIMITS = {
  firstName: 30,
  lastName: 30,
  address: 45,
  city: 20,
  state: 20,
  zipCode: 20,
  phone: 20,
  ssn: 15,
  username: 20,
  password: 20,
};

/**
 * Truncates every generated field to its column width. Applied to the whole
 * user object so a new field cannot silently skip its limit.
 */
function applyFieldLimits(user) {
  return Object.fromEntries(
    Object.entries(user).map(([field, value]) => {
      const limit = PARABANK_FIELD_LIMITS[field];

      return [field, limit ? value.slice(0, limit) : value];
    }),
  );
}

function generateUsername(firstName) {
  const prefix = firstName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 4);

  // Base36 millisecond timestamp (8 chars) plus a random suffix keeps the
  // username unique across runs and workers while fitting the 20 char column.
  const timestamp = Date.now().toString(36);
  const suffix = faker.string.alphanumeric(4).toLowerCase();

  return `${prefix}${timestamp}${suffix}`.slice(
    0,
    PARABANK_FIELD_LIMITS.username,
  );
}

export function generateNewUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return applyFieldLimits({
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number({ style: 'national' }),
    ssn: faker.string.numeric(9),
    username: generateUsername(firstName),
    password: faker.internet.password({ length: 12 }),
  });
}
