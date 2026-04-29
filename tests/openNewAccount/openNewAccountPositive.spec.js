import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

const testParameters = [
  { type: '0', typeName: 'CHECKING' },
  { type: '1', typeName: 'SAVINGS' },
];

testParameters.forEach(({ type, typeName }) => {
  test.describe('Open new account positive tests', () => {
    test(`Successfully open a new ${typeName} account`, async ({
      openNewAccountPage,
    }) => {
      await openNewAccountPage.open();
      await openNewAccountPage.selectAccountType(type);
      await openNewAccountPage.clickOpenNewAccountButton();
      await openNewAccountPage.assertAccountOpened();
    });
  });
});
