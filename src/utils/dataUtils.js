export const sortBy = (data, key, direction = 'asc') => data.sort((a, b) => {
  if (direction === 'desc') {
    if (a[key] > b[key]) {
      return -1;
    }
    if (b[key] > a[key]) {
      return 1;
    }
    return 0;
  }

  if (a[key] && a[key].toDate) {
    if (a[key].toDate() > b[key].toDate()) {
      return 1;
    }
    if (b[key].toDate() > a[key].toDate()) {
      return -1;
    }
    return 0;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  if (b[key] > a[key]) {
    return -1;
  }
  return 0;
});

export const findMinMaxOfKey = (items, keyToCheck) => items.reduce((acc, item) => ({
  min: Number(!acc.min || item[keyToCheck] < acc.min ? item[keyToCheck] : acc.min),
  max: Number(!acc.max || item[keyToCheck] > acc.max ? item[keyToCheck] : acc.max),
}), { min: null, max: null });

export function moveArrayItem(items, currentIndex, newIndex) {
  items.splice(newIndex, 0, items.splice(currentIndex, 1)[0]);
  return items;
}
