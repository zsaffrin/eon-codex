import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const StyledButton = styled.button(({ small, theme }) => {
  const { space } = theme;
  return `
    -webkit-appearance: none;
    border-radius: ${space.sm};
    cursor: pointer;
    font-size: ${small ? "0.9em" : "1em"};
    font-weight: bold;
    padding: ${small ? `${space.thin} ${space.md}` : `${space.md} ${space.lg}`};
  `;
});
const ColorButton = styled(StyledButton)(
  ({ primary, danger, disabled, theme }) => {
    const { color, inputs } = theme;
    const {
      buttonColorDanger,
      buttonColorDefault,
      buttonColorDisabled,
      buttonTextColorLight,
      buttonTextColorDark
    } = inputs;

    let buttonColor = buttonColorDefault;
    if (primary) {
      buttonColor = color.primary;
    }
    if (disabled) {
      buttonColor = buttonColorDisabled;
    }
    if (danger) {
      buttonColor = buttonColorDanger;
    }

    let buttonTextColor = "";
    if (tinycolor(buttonColor).isLight()) {
      buttonTextColor = buttonTextColorDark;
    } else {
      buttonTextColor = buttonTextColorLight;
    }

    return `
    background: ${tinycolor(buttonColor)};
    background: linear-gradient(${tinycolor(buttonColor).lighten(
      15
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
  }
);

const Button = props => {
  return <ColorButton {...props}>{props.children}</ColorButton>;
};

export default Button;
