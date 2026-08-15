import { rmSync } from 'fs';
import { ALLURE_RESULTS_DIR } from './src/common/constants/allurePaths';

export default function globalSetup() {
  rmSync(ALLURE_RESULTS_DIR, { recursive: true, force: true });
}
