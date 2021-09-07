import styled from 'styled-components';

const StyledInput = styled.input(({ theme }) => {
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

const PasswordInput = ({ id, value, onChange }) => {
  return (
    <StyledInput
      type="password"
      id={id}
      value={value}
      onChange={(e) => onChange({
        id,
        value: e.target.value,
      })}
    />
  );
};

export default PasswordInput;
