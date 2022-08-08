/**
 * Generate a random character string
 * @param {number} stringLength Length of string to generate 
 * @returns {string} Random string of characters
 */
const randomCharString = (stringLength) => {
  const template = [...Array(stringLength).keys()];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return template.reduce((acc) => [
    ...acc,
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ], []).join('');
};

export default randomCharString;
