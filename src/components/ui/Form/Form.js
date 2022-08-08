import { arrayOf, func, node, oneOfType, shape, string } from 'prop-types';
import styled from 'styled-components';

import { useFormData } from '../../../hooks';
import { Input, VerticalList } from '..';

const StyledForm = styled.form(({ theme }) => {
  const { space } = theme;

  return `
    display: grid;  
    grid-gap: ${space.md};
  `;
});

/**
 * Form component
 * 
 * @param {Object[]} fields Array of the form fields
 * @param {String} fields[].id The field Id
 * @param {String|ReactElement} fields[].label The label for the field
 * @param {String} fields[].type The data type of the field
 * @param {String|ReactElement} footer A full width row at the bottom of the form
 * @param {Function} onSubmit Function to execute on form submit
 * 
 * @returns {ReactElement} Rendered Element of form field inputs in VerticalList format
 */
const Form = ({ data, fields, footer, onSubmit }) => {
  const [formData, handleFieldChange] = useFormData(fields, data);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const listItems = fields.map(({
    key,
    name,
    type,
    lookup,
    lookupFilterKey,
    lookupFilterValue,
    lookupDisplayKey,
  }) => {
    return ({
      label: name || '',
      content: key ? (
        <Input
          id={key}
          onChange={handleFieldChange}
          value={formData[key]}
          type={type}
          lookup={lookup}
          lookupFilterKey={lookupFilterKey}
          lookupFilterValue={lookupFilterValue}
          lookupDisplayKey={lookupDisplayKey}
        />
      ) : '',
    });
  });
  footer && listItems.push({
    fullRow: true,
    content: footer,
  });
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      <VerticalList items={listItems} />
    </StyledForm>
  );
};
Form.propTypes = {
  fields: arrayOf(shape({
    key: string,
    name: string,
    type: string,
    lookup: string,
    lookupFilterKey: string,
    lookupFilterValue: string,
    lookupDisplayKey: string,
  })),
  footer: oneOfType([node, string]),
  onSubmit: func,
};
Form.defaultProps = {
  fields: [],
  onSubmit: () => {},
};

export default Form;
