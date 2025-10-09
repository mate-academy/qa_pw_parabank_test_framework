import { test } from '../../../fixtures/fixturesUser';

test.describe('Update Contact Info', () => {

  test('User can update contact details successfully', async ({ userActions, userTestData }) => {
    const user = userTestData.validUser;

    const updatedContact = {
      firstName: 'John',
      lastName: 'Doe',
      address: '789 Updated Avenue',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      phone: '555-9090'
    };

    await userActions.updateContactInfo(updatedContact);
  });

  test('User cannot submit empty contact form', async ({ userActions }) => {
    await userActions.updateContactInfo({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    });
  });

});
