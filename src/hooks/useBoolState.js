import { useState } from 'react';

const useBoolState = (initialValue) => {
  const [value, setValue] = useState(initialValue || false);

  const updateValue = (newValue) => {
    if (value) {
      setValue(false);
    } else {
      setValue(newValue || true);
    }
  };

  return [value, updateValue];
};

export default useBoolState;
