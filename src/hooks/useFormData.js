import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
import { useState } from 'react';

/**
 * useFormState hook
 * Builds an updateable form state
 * 
 * @param {Object[]} fields Array of field objects
 * @param {String} fields[].key Input key and ID to use
 * @param {Number|String} fields[].defaultValue Default field value to initialize
 * @param {Object} data Optional: Existing object value set
 * 
 * @returns {type} Array: [Form state object | Field value updater function]
 */

const defaultValueType = (fieldType) => {
  if (fieldType === 'multiselect') {
    return [];
  }

  return '';
};

const initialFormState = (fields, data) => {
  const formState = {};

  fields.forEach(({ key, defaultValue, type }) => {
    let initialValue = defaultValue || defaultValueType(type);
    if (data && data[key]) {
      initialValue = data[key];
    }
    formState[key] = initialValue; 
  });

  return formState;
};

const useFormData = (fields, data) => {
  const [formData, setFormData] = useState(fields ? initialFormState(fields, data) : {});

  const handleFieldChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  return [formData, handleFieldChange];
};
useFormData.propTypes = {
  fields: arrayOf(shape({
    key: string,
    defaultValue: oneOfType([number, string]),
  })),
  data: shape({}),
};
useFormData.defaultProps = {
  fields: [],
  data: {},
};

export default useFormData;
