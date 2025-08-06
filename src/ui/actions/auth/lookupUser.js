import { testStep } from '../../../common/helpers/pwHelpers';
import { LookupPage } from '../../pages/auth/LookupPage';
import { CustomerInfoForm } from '../../forms/CustomerInfoForm';

export async function lookupUser(page, user, userId = 0) {
  await testStep(
    `Lookup user`,
    async () => {
      const lookupPage = new LookupPage(page, userId);
      const customerInfoForm = new CustomerInfoForm(page, userId);

      await lookupPage.open();
      await customerInfoForm.submitLookupForm(user);

      await lookupPage.assertlookupIsSuccessful();
      await lookupPage.assertLookedupUserIsCorrect(user);
    },
    userId,
  );
}
