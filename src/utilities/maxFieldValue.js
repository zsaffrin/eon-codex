/**
 * Gets the maximum value of a given field 
 * within a given array of objects
 *
 * @param {array} items The array of objects to evaluate
 * @param {string} fieldKey The field key to evaluate
 * @param {boolean} min [Optional] Evaluate the min value instead of max
 * @return {number} Max (or min) value result of evaluation
 */
const maxFieldValue = (items, fieldKey, min) => items.reduce((acc, item) => {
  if (min) {
    return (
      acc && acc <= item[fieldKey] ? acc : item[fieldKey]
    );
  }

  return (
    acc && acc >= item[fieldKey] ? acc : item[fieldKey]
  );
}, null);

export default maxFieldValue;
