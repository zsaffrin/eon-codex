import { useState } from 'react';

const useToggle = (initialValue) => {
  const [value, setValue] = useState(!!initialValue || false);

  const toggleValue = () => {
    setValue(!value);
  };

  return [value, toggleValue];
};

export default useToggle;
