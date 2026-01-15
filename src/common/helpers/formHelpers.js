export async function fillFormExcept(fieldMap, userData, exceptField, emptyValue = undefined) {
  const fieldNames = Object.keys(fieldMap);
  
  for (const fieldName of fieldNames) {
    if (fieldName === exceptField) {
      if (emptyValue !== undefined) {
        await fieldMap[fieldName](emptyValue);
      }

    } else {

      const value = userData[fieldName];
      if (value !== undefined && value !== null) {
        await fieldMap[fieldName](value);
      }
    }
  }
}
