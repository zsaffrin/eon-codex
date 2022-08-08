import styled from 'styled-components';

const StyledSelect = styled.select(({ theme }) => {
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

const SelectInput = ({
  id, value, onChange, choices,
}) => {
  
  const handleChange = (e) => {
    const newValue = e.target.value === '' ? null : e.target.value;

    onChange({ id, value: newValue });
  };

  return (
    <StyledSelect id={id} value={value || ''} onChange={handleChange}>
      <option value="" />
      {choices.map(({ itemValue, label }) => (
        <option value={itemValue} key={itemValue}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectInput;
