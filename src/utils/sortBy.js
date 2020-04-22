const sortBy = (data, key, direction = 'asc') => data.sort((a, b) => {
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
  if (a[key] > b[key]) {
    return 1;
  }
  if (b[key] > a[key]) {
    return -1;
  }
  return 0;
});

export default sortBy;
