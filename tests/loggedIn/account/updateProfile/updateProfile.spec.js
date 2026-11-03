import { test } from '../../../_fixtures/fixtures';

const requiredErrors = [
  'firstNameRequiredError',
  'lastNameRequiredError',
  'addressRequiredError',
  'cityRequiredError',
  'stateRequiredError',
  'zipCodeRequiredError',
];

test.describe('Update Contact Info', () => {
  test.describe.configure({ timeout: 120_000 });

  test('Update is rejected when required fields are empty', async ({
    registeredUser,
    updateProfilePage,
  }) => {
    void registeredUser;

    await updateProfilePage.submitProfile({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    });
    await updateProfilePage.assertUpdateRejected(requiredErrors);
  });

  test('User can update contact info and the saved profile is shown again', async ({
    registeredUser,
    updateProfilePage,
  }) => {
    const updated = {
      firstName: 'Mary Ann',
      lastName: registeredUser.user.lastName,
      address: '1 Main St',
      city: 'New York',
      state: 'CA',
      zipCode: '90210',
      phone: '',
    };

    await updateProfilePage.open();
    await updateProfilePage.assertProfile(registeredUser.user);
    await updateProfilePage.submitProfile(updated);
    await updateProfilePage.assertProfileUpdated();
    await updateProfilePage.assertWelcomeMessageContainsUserName(
      registeredUser.user.firstName,
      registeredUser.user.lastName,
    );
    await updateProfilePage.open();
    await updateProfilePage.assertProfile(updated);
    await updateProfilePage.assertWelcomeMessageContainsUserName(
      registeredUser.user.firstName,
      registeredUser.user.lastName,
    );
  });
});
