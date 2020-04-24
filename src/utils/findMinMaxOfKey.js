const findMinMaxOfKey = (items, keyToCheck) => items.reduce((acc, item) => ({
  min: Number(!acc.min || item[keyToCheck] < acc.min ? item[keyToCheck] : acc.min),
  max: Number(!acc.max || item[keyToCheck] > acc.max ? item[keyToCheck] : acc.max),
}), { min: null, max: null });

export default findMinMaxOfKey;
