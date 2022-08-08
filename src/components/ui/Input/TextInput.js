import { func, string } from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input(({ theme }) => {
  const { inputs } = theme;
  
  return `
    background: ${inputs.background};
    border: ${inputs.border};
    border-radius: ${inputs.borderRadius};
    padding: ${inputs.padding};
    font-size: ${inputs.fontSize};
    width: 100%;

    &:focus {
      outline: 0;
      background: ${inputs.focusBackground};
    }
  `;
});

const TextInput = ({ id, type, onChange, ...props }) => {
  return (
    <StyledInput
      id={id}
      type={type === 'password' ? 'password' : 'text'}
      onChange={(e) => onChange({
        id,
        value: e.target.value,
      })}
      {...props}
    />
  );
};
TextInput.propTypes = {
  id: string,
  type: string,
  value: string,
  onChange: func,
  onBlur: func,
};
TextInput.defaultProps = {
  id: '',
  type: 'text',
  value: '',
  onChange: () => {},
  onBlur: () => {},
};

export default TextInput;
