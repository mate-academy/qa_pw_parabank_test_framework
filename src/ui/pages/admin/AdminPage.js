import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class AdminPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.url = 'admin.htm';
    this.pageName = 'Admin page';
    this.successMessage = 'Settings saved successfully.';

    const dataAccessMode = this.page.locator('#adminForm table.form');
    this.dataAccessMode = {
      soapRadio: dataAccessMode.locator('#accessMode1'),
      restXmlRadio: dataAccessMode.locator('#accessMode2'),
      restJsonRadio: dataAccessMode.locator('#accessMode3'),
      jdbcRadio: dataAccessMode.locator('#accessMode4'),
    };

    this.submitButton = this.page
      .locator('#adminForm')
      .getByRole('button', { name: 'Submit' });
  }

  async selectDataAccessMode(modeId) {
    const radio = {
      soap: this.dataAccessMode.soapRadio,
      restXml: this.dataAccessMode.restXmlRadio,
      restJson: this.dataAccessMode.restJsonRadio,
      jdbc: this.dataAccessMode.jdbcRadio,
    }[modeId];

    await this.step(`Select ${modeId} data access mode`, async () => {
      await radio.check();
    });
  }

  async submitAdminForm() {
    await this.click(this.submitButton, 'Submit');
  }

  async assertSettingsSaved() {
    await this.step('Assert settings saved', async () => {
      await expect(this.page.getByText(this.successMessage)).toBeVisible();
    });
  }
}
