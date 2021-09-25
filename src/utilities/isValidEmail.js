/**
 * Performs a regex test to validate whether a string is formatted
 * as a valid email address
 * 
 * @param {string} email Email to test for validity
 * @return {boolean} True if valid email, false if not
 */
const isValidEmail = (email) => {
  const test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return test.test(email);
};

export default isValidEmail;