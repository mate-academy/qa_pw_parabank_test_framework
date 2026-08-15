import { testStep } from '../../../common/helpers/pwHelpers';

export async function logout(page) {
  await testStep('Log out', async () => {
    await page.getByRole('link', { name: 'Log Out' }).click();
  });
}
