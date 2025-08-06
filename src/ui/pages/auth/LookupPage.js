import { expect, testStep } from '../../../common/helpers/pwHelpers';
import {
  ERROR_TITLE,
  LOOKUP_SUCCESSFUL_SUB,
  LOOKUP_SUCCESSFUL_TITLE,
  LOOKUP_UNSUCCESSFUL_SUB,
} from '../../constants/authMessages';

export class LookupPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;

    // Fields
    this.rightPanelTitle = page.locator('#rightPanel h1.title');
    this.rightPanelSubtitle = page.locator('#rightPanel p').first();
    this.rightPanelContent = page.locator('#rightPanel p').nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Customer Lookup' page`, async () => {
      await this.page.goto('/parabank/lookup.htm');
    });
  }

  async assertlookupIsSuccessful() {
    await this.step(`Assert 'Lookup' success message is shown`, async () => {
      await this.rightPanelTitle.waitFor({ state: 'visible' });
      await expect(this.rightPanelTitle).toContainText(LOOKUP_SUCCESSFUL_TITLE);
      await expect(this.rightPanelSubtitle).toHaveText(LOOKUP_SUCCESSFUL_SUB);
    });
  }

  async assertlookupIsUnsuccessful() {
    await this.step(`Assert 'Lookup' unsuccess message is shown`, async () => {
      await this.rightPanelTitle.waitFor({ state: 'visible' });
      await expect(this.rightPanelTitle).toContainText(ERROR_TITLE);
      await expect(this.rightPanelSubtitle).toContainText(
        LOOKUP_UNSUCCESSFUL_SUB,
      );
    });
  }

  async assertLookedupUserIsCorrect(user) {
    await this.step(
      `Check found user credentials after looking up`,
      async () => {
        const credentialsText = await this.rightPanelContent.textContent();
        const username = credentialsText?.match(/Username:\s*(\w+)/)?.[1];
        const password = credentialsText?.match(/Password:\s*(\w+)/)?.[1];

        expect(username).toBe(user.username);
        expect(password).toBe(user.password);
      },
    );
  }
}
