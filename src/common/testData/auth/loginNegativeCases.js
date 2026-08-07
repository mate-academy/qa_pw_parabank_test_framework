import { LOGIN_MISSING_FIELDS_ERROR } from '../../constants/auth/authMessages';

export const negativeLoginCases = [
  {
    title: 'empty username and password',
    username: '',
    password: '',
    expectedError: LOGIN_MISSING_FIELDS_ERROR,
  },
  {
    title: 'empty username',
    username: '',
    password: 'Passw0rd1',
    expectedError: LOGIN_MISSING_FIELDS_ERROR,
  },
  {
    title: 'empty password',
    username: 'someUser',
    password: '',
    expectedError: LOGIN_MISSING_FIELDS_ERROR,
  },
];
