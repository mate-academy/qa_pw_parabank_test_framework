import playwrightConfig from '../../../../playwright.config.js';
import { testStep } from '../../../common/helpers/pwHelpers';
import { AdminPage } from '../../pages/admin/AdminPage';

export const DATA_ACCESS_MODES = [
  { id: 'soap', name: 'SOAP' },
  { id: 'restXml', name: 'REST (XML)' },
  { id: 'restJson', name: 'REST (JSON)' },
  { id: 'jdbc', name: 'JDBC' },
];

const JDBC_MODE = DATA_ACCESS_MODES.find(mode => mode.id === 'jdbc');

export async function setDataAccessMode(page, mode, userId = 0) {
  await testStep(
    `Set data access mode to ${mode.name}`,
    async () => {
      const adminPage = new AdminPage(page, userId);
      await adminPage.open();
      await adminPage.selectDataAccessMode(mode.id);
      await adminPage.submitAdminForm();
      await adminPage.assertSettingsSaved();
    },
    userId,
  );
}

export async function restoreJdbcAccessMode(browser) {
  const context = await browser.newContext({
    baseURL: playwrightConfig.use.baseURL,
  });
  const page = await context.newPage();

  try {
    await setDataAccessMode(page, JDBC_MODE);
  } finally {
    await context.close();
  }
}
