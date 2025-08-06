import { testStep } from '../../../common/helpers/pwHelpers';
import { OverviewPage } from '../../pages/account/OverviewPage';

export async function calculateBalance(page, userId = 0) {
  return await testStep(
    `Calculate balance`,
    async () => {
      const overviewPage = new OverviewPage(page, userId);
      const rowsData = await overviewPage.getAllRowsData(page);

      const sum = rowsData.reduce(
        (acc, row) => acc + parseFloat(row.balance.replace('$', '')),
        0,
      );

      return sum;
    },
    userId,
  );
}
