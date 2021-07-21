const randomKey = (keyLength) => {
  const template = [...Array(keyLength).keys()];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return template.reduce((acc) => [
    ...acc,
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ], []).join('');
};

export default randomKey;
