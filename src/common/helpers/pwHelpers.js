import { test } from '@playwright/test';

export async function testStep(title, stepToRun, userLabel = '') {
  const stepTitle = userLabel ? `${userLabel}: ${title}` : title;

  return await test.step(stepTitle, stepToRun);
}

export { expect } from '@playwright/test';
