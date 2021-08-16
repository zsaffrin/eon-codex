import { useState } from 'react';

import { Input } from '../components/ui';

const buildFormState = (fields) => {
  const formState = {};

  fields.forEach(({ id, defaultValue }) => { formState[id] = defaultValue || ''; });

  return formState;
};

const useForm = (fields) => {
  const [formData, setFormData] = useState(fields ? buildFormState(fields) : {});
  
  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const formFields = fields.map(({ id, label, lookup, lookupFilterKey, lookupFilterValue, type }) => ({
    label,
    content: (
      <Input
        key={id}
        id={id}
        type={type}
        lookup={lookup}
        lookupFilterKey={lookupFilterKey}
        lookupFilterValue={lookupFilterValue}
        value={formData[id]}
        onChange={handleFieldChange}
      />
    ),
  }));


  return [formData, formFields];
};

export default useForm;
