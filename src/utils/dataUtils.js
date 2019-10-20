export const sortBy = (data, key = "id", direction = "asc") =>
  data.sort((a, b) => {
    if ((direction = "desc")) {
      if (a[key] > b[key]) {
        return 1;
      }
      if (b[key] > a[key]) {
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
