import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const StyledButton = styled.button(({ small, theme, tiny }) => {
  const { space } = theme;

  let fontSize = '1em';
  let pad = `${space.md} ${space.lg}`;
  let lineHeight = 'inherit';
  if (small) {
    fontSize = '0.85em';
    pad = `${space.sm} ${space.md}`;
  }
  if (tiny) {
    fontSize = '0.85em';
    lineHeight = 1;
    pad = `${space.thin} ${space.thin}`;
  }

  return `
    -webkit-appearance: none;
    border-radius: ${space.sm};
    cursor: pointer;
    font-size: ${fontSize};
    font-weight: bold;
    line-height: ${lineHeight};
    padding: ${pad};

    &:focus {
      outline: 0;
    }
  `;
});
const ColorButton = styled(StyledButton)(
  ({
    primary, danger, disabled, theme,
  }) => {
    const { buttons } = theme;
    const {
      dangerButtonColor,
      defaultButtonColor,
      disabledButtonColor,
      primaryButtonColor,
      textColorLight,
      textColorDark,
    } = buttons;

    let buttonColor = defaultButtonColor;
    if (primary) {
      buttonColor = primaryButtonColor;
    }
    if (disabled) {
      buttonColor = disabledButtonColor;
    }
    if (danger) {
      buttonColor = dangerButtonColor;
    }

    let buttonTextColor = '';
    if (tinycolor(buttonColor).isLight()) {
      buttonTextColor = textColorDark;
    } else {
      buttonTextColor = textColorLight;
    }

    return `
    background: ${tinycolor(buttonColor)};
    background: linear-gradient(${tinycolor(buttonColor).lighten(
    15,
  )}, ${tinycolor(buttonColor)});
    color: ${tinycolor(buttonTextColor)};
    border: 1px solid ${tinycolor(buttonColor).darken(10)};
    box-shadow: inset 0 1px 0 ${tinycolor(buttonColor).lighten(10)};
    text-shadow: ${
  tinycolor(buttonColor).isLight()
    ? `0 1px 0 ${tinycolor(buttonColor)
      .lighten(50)
      .setAlpha(0.25)
      .toRgbString()}`
    : `0 -1px 0 ${tinycolor(buttonColor)
      .darken(50)
      .setAlpha(0.5)
      .toRgbString()}`
};
    &:hover {
      background: ${tinycolor(buttonColor)};
    }
  `;
  },
);

const Button = (props) => {
  return (<ColorButton type={props.type || 'button'} {...props} />);
};

export default Button;