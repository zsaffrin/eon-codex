import styled from 'styled-components';

const StyledSelect = styled.select(({ theme }) => {
  const { input } = theme;

  return `
    background: ${input.inputBg};
    border: ${input.inputBorder};
    border-radius: ${input.inputBorderRadius};
    padding: ${input.inputPadding};
    font-size: ${input.inputFontSize};
    width: 100%;

    &:focus {
      outline: 0;
      background: ${input.inputActiveBg};
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
