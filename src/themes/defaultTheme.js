const space = {
  thin: "2px",
  sm: "0.25em",
  md: "0.5em",
  lg: "1em",
  xl: "2em"
};
const color = {
  // Color palette generated on Palx
  // https://palx.jxnblk.com/1561ad
  grays: ["#f8f9f9", "#ecedee", "#dee0e3", "#bfc4c8", "#adb3b9", "#818a92"],
  purples: ["", "", "", "#6115ad"],
  background: "#f8f9f9",
  primary: "#8e44ad",
  secondary: "#5b90c5",
  accent: "#cfd3d6",
  white: "#f8f9f9",
  black: "#384048"
};
const inputs = {
  borderColor: color.accent,
  buttonColorDefault: color.accent,
  buttonColorDisabled: color.accent,
  buttonTextColorLight: color.white,
  buttonTextColorDark: color.black,
  buttonTextColorDisabled: color.white
};

const defaultTheme = {
  space,
  color,
  inputs
};

export default defaultTheme;
