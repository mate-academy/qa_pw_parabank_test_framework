export const REQUIRED_FORGOT_LOGIN_FIELDS = [
  { field: 'firstName', errorField: 'firstName' },
  { field: 'lastName', errorField: 'lastName' },
  { field: 'address', errorField: 'address.street' },
  { field: 'city', errorField: 'address.city' },
  { field: 'state', errorField: 'address.state' },
  { field: 'zipCode', errorField: 'address.zipCode' },
  { field: 'ssn', errorField: 'ssn' },
];
