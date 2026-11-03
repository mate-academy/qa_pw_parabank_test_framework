import { expect, testStep } from '../../../common/helpers/pwHelpers';

const ACCOUNT_CREATED_MESSAGE =
  'Your account was created successfully. You are now logged in.';

export async function createUser(request, user, userId = 0) {
  await testStep(
    'Create user',
    async () => {
      // Без cookie сессии ParaBank отвечает на регистрацию кодом 500.
      await request.get('register.htm');

      const response = await request.post('register.htm', {
        form: {
          'customer.firstName': user.firstName,
          'customer.lastName': user.lastName,
          'customer.address.street': user.address,
          'customer.address.city': user.city,
          'customer.address.state': user.state,
          'customer.address.zipCode': user.zipCode,
          'customer.phoneNumber': user.phone,
          'customer.ssn': user.ssn,
          'customer.username': user.username,
          'customer.password': user.password,
          repeatedPassword: user.password,
        },
      });

      const body = await response.text();
      expect(response.ok()).toBeTruthy();
      expect(body).toContain(`Welcome ${user.username}`);
      expect(body).toContain(ACCOUNT_CREATED_MESSAGE);
    },
    userId,
  );
}
