import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const StyledButton = styled.button(({ large, small, theme, tiny }) => {
  const { space } = theme;

  let fontSize = '0.85rem';
  let pad = `${space.sm} ${space.md}`;
  let lineHeight = 'inherit';
  if (large) {
    fontSize = '1.1rem';
    pad = `${space.md} ${space.lg}`;
  }
  if (small) {
    fontSize = '0.75rem';
    pad = `${space.thin} ${space.sm}`;
  }
  if (tiny) {
    fontSize = '0.7rem';
    lineHeight = 1;
    pad = `${space.thin} ${space.sm}`;
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
    const { button } = theme;
    const {
      dangerColor,
      defaultColor,
      disabledColor,
      primaryColor,
      textColorLight,
      textColorDark,
    } = button;

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