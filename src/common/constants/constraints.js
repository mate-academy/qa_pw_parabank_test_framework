export const USER_DATA_MAX_LENGTH = {
  firstName: 20,
  lastName: 20,
  address: 40,
  city: 20,
  state: 2,
  zipCode: 5, //20
  phone: 12,
  username: 20,
  password: 20,
};

export const USER_DATA_MIN_LENGTH = {
  firstName: 1,
  lastName: 1,
  address: 1,
  city: 1,
  state: 1,
  zipCode: 1,
  phone: 5,
  username: 5,
  password: 8,
};

const minPassLen = USER_DATA_MIN_LENGTH.password;
const maxPassLen = USER_DATA_MAX_LENGTH.password;
const minUsernameLen = USER_DATA_MIN_LENGTH.username;
const maxUsernameLen = USER_DATA_MAX_LENGTH.username;

export const PASSWORD_REGEX = new RegExp(
  String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{${minPassLen},${maxPassLen}}$`,
);

export const USERNAME_REGEX = new RegExp(
  String.raw`^[a-zA-Z0-9_]{${minUsernameLen},${maxUsernameLen}}$`,
);

export const ZIP_CODE_REGEX = new RegExp(
  String.raw`^\d{5}$`,
);

export const PHONE_REGEX = new RegExp(
  String.raw`^\d{10}$`,
);
