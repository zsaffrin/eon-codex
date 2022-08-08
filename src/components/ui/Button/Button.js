import { bool, node, string } from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const StyledButton = styled.button(({
  disabled,
  large,
  small,
  theme,
  tiny,
}) => {
  const { space } = theme;

  let pad = `${space.thin} ${space.md}`;
  let fontSize = '0.79rem';
  if (large) {
    fontSize = '0.86rem';
    pad = `${space.sm} ${space.lg}`;
  }
  if (small) {
    fontSize = '0.71rem';
    pad = `0 ${space.md}`;
  }
  if (tiny) {
    fontSize = '0.68rem';
    pad = `0 ${space.thin}`;
  }

  return `
    -webkit-appearance: none;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-radius: ${space.sm};
    cursor: ${disabled ? 'auto' : 'pointer'};
    display: grid;
    font-size: ${fontSize};
    font-weight: bold;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    grid-gap: ${space.sm};
    justify-content: center;
    padding: ${pad};
    text-transform: uppercase;
  `;
});
const ColorButton = styled(StyledButton)(({
  danger,
  disabled,
  inverted,
  primary,
  theme,
}) => {
  const { buttons } = theme;
  const {
    dangerColor,
    defaultColor,
    disabledColor,
    primaryColor,
    textColor,
    textColorDisabled,
  } = buttons;

  let buttonColor = defaultColor;
  if (primary) {
    buttonColor = primaryColor;
  }
  if (disabled) {
    buttonColor = disabledColor;
  }
  if (danger) {
    buttonColor = dangerColor;
  }

  let buttonTextColor = disabled ? textColorDisabled : textColor;

  return `
    background: ${inverted ? buttonTextColor : buttonColor};
    border-color: ${buttonColor};
    color: ${inverted ? buttonColor : buttonTextColor};
    transition: background-color 200ms, border-color 200ms;

    ${!disabled && `
      &:hover {
        background: ${inverted ? tinycolor(buttonTextColor).brighten(15) : tinycolor(buttonColor).brighten(10)};
        border-color: ${inverted ? tinycolor(buttonColor).brighten(15) : buttonColor};
        color: ${inverted ? tinycolor(buttonColor).brighten(15) : buttonTextColor};
      }
    `}
  `;
});
const Content = styled.div(({ tiny }) => {
  return `
    display: grid;
    align-items: center;
    min-height: ${tiny ? '1.25em' : '1.75em'};
  `;
});

const Button = ({
  danger,
  disabled,
  icon,
  inverted,
  label,
  primary,
  small,
  tiny,
  title,
  type,
  ...rest
}) => {
  return (
    <ColorButton
      danger={danger ? 1 : 0}
      disabled={disabled ? 1 : 0}
      inverted={inverted ? 1 : 0}
      primary={primary ? 1 : 0}
      small={small ? 1 : 0}
      tiny={tiny ? 1 : 0}
      type={type || 'button'}
      title={title || label}
      {...rest}
    >
      {icon && <Content tiny={tiny ? 1 : 0}>{icon}</Content>}
      {label && <Content tiny={tiny ? 1 : 0}>{label}</Content>}
    </ColorButton>
  );
};
Button.propTypes = {
  /**
   * Variant types
   * Use one or none
   */
  danger: bool,
  disabled: bool,
  primary: bool,

  /**
   * Invert button
   */
  inverted: bool,
  
  /**
   * Alternative sizes
   */
  large: bool,
  small: bool,
  tiny: bool,

  /**
   * The icon and/or text to display
   * All are optional
   */
  icon: node,
  label: string,
  title: string,
};
Button.defaultProps = {
  danger: false,
  disabled: false,
  primary: false,
  inverted: false,
  small: false,
  tiny: false,
};

export default Button;
