import { useState } from 'react';

const useForm = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);

  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return [formData, handleFieldChange];
};

export default useForm;
