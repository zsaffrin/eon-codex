import { useState } from 'react';

const useBoolState = (initialValue) => {
  const [value, setValue] = useState(!!initialValue || false);

  const updateValue = (newValue) => {
    setValue(!!newValue || !value);
  };

  return [value, updateValue];
};

export default useBoolState;
