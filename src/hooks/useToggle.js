import { useState } from 'react';

/**
 * State that toggles true/false
 * @param {boolean} initialState False by default
 * @returns {array} [value, toggleValue] Current value and function to toggle
 */
const useToggle = (initialState) => {
  const [value, setValue] = useState(initialState || false);

  const toggleValue = () => {
    setValue(!value);
  };

  return [value, toggleValue];
};

export default useToggle;
