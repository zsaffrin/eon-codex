/**
 * Takes an array of objects and returns an object
 * where the key is the value of the defined field
 * of the item and the value is the item object
 *
 * @param {array} arr The array of objects to process
 * @param {string} key The fields key to use as the return object key
 * @return {object} object of the items keyed by the defined field
 * 
 * Example
 * arr = [{ a: 'aVal1', b: 'bVal1'}, { a: 'aVal2', b: 'bVal2'}, ...]
 * key = 'a'
 * returns: 
 * {
 *  aVal1: { a: 'aVal1', b: 'bVal1'},
 *  aVal2: { a: 'aVal2', b: 'bVal2'},
 *  ...
 * }
 */
const objectifyArray = (arr, key) => arr.reduce((acc, i) => ({
  ...acc,
  [i[key]]: i,
}), {});

export default objectifyArray;