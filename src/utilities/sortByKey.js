/**
 * Sort array of objects by key (property)
 * @param {array} data Array of objects to sort
 * @param {string} key Item property name to sort by
 * @param {string} direction [desc|asc(default)] Direction of sort
 * @returns Same array, sorted
 */
const sortByKey = (data, key, direction = 'asc') => data.sort((a, b) => {
  if (direction === 'desc') {
    if (a[key] > b[key]) {
      return -1;
    }
    if (b[key] > a[key]) {
      return 1;
    }
    return 0;
  }

  if (a[key] && a[key].toDate && b[key] && b[key].toDate) {
    if (a[key].toDate() > b[key].toDate()) {
      return 1;
    }
    if (b[key].toDate() > a[key].toDate()) {
      return -1;
    }
    return 0;
  }
  
  if (a[key] && typeof(a[key]) === 'number' && b[key] && typeof(b[key]) === 'number') {
    return a[key] - b[key];
  }

  if (a[key] > b[key]) {
    return 1;
  }
  if (b[key] > a[key]) {
    return -1;
  }
  return 0;
});

export default sortByKey;
