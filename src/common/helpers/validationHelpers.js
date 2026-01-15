export async function checkInvalidAmountValidation(
  page,
  successLocator,
  amount,
  logger,
  operationType = 'operation'
) {

  await page.waitForLoadState('networkidle');
  
  const startTime = Date.now();
  const checkDuration = 5000;
  let successAppeared = false;
  let lastResultVisible = false;
  let lastHasSuccess = false;
  
  while (Date.now() - startTime < checkDuration) {
    await page.waitForTimeout(500);
    
    const hasSuccess = await successLocator.isVisible().catch(() => false);
    
    if (hasSuccess) {
      successAppeared = true;
      lastResultVisible = true;
      lastHasSuccess = hasSuccess;
      break;
    }
  }
  
  logger?.debug(`Validation check: amount=${amount}, successAppeared=${successAppeared}, lastResultVisible=${lastResultVisible}, lastHasSuccess=${lastHasSuccess}`);
  
  if (successAppeared) {
    const successText = await successLocator.textContent().catch(() => 'N/A');
    logger?.error(`${operationType} succeeded with invalid amount: ${amount}`);
    throw new Error(
      `${operationType} succeeded with invalid amount: ${amount}\n` +
      `Expected: ERROR message or validation failure`
    );
  }
  

  const internalError = page.locator('p.error:has-text("An internal error has occurred")');
  const hasInternalError = await internalError.isVisible().catch(() => false);
  
  if (hasInternalError) {
    logger?.warn(`INTERNAL SERVER ERROR for amount=${amount} - server crashed instead of validating`);

    throw new Error(
      `Server returned "internal error" instead of validating amount: ${amount}\n` +
      `Expected: Client-side validation error or proper rejection message.\n` +
      `Actual: "An internal error has occurred and has been logged."`
    );
  }
  
  return {
    hasInternalError
  };
}

export async function hasValidationErrors(page) {
  const validationErrors = page.locator('[id*="validationModel"], [id$=".errors"]');
  const validationErrorsCount = await validationErrors.count();
  
  for (let i = 0; i < validationErrorsCount; i++) {
    if (await validationErrors.nth(i).isVisible()) {
      return true;
    }
  }
  
  return false;
}

export function getFieldErrorLocator(page, fieldName, prefix = '') {

  if (fieldName === 'confirmPassword' || fieldName === 'repeatedPassword') {
    return page.locator('[id="repeatedPassword.errors"]');
  }
  
  if (prefix) {
    return page.locator(`[id="${prefix}${fieldName}.errors"]`);
  }
  
  return page.locator(`[id="${fieldName}.errors"]`);
}

export async function findVisibleElement(page, selector) {
  const allElements = page.locator(selector);
  const elementCount = await allElements.count();
  
  for (let i = 0; i < elementCount; i++) {
    const element = allElements.nth(i);
    if (await element.isVisible().catch(() => false)) {
      return element;
    }
  }
  
  return null;
}

export async function hasVisibleElement(page, selector) {
  const visibleElement = await findVisibleElement(page, selector);
  return visibleElement !== null;
}
