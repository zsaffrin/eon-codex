const stringToKey = (string) => {
  return string
    .replace(/[\s]+/g, '-')
    .replace(/[^\w-_]+/g, '')
    .toLowerCase();
};

export default stringToKey;
