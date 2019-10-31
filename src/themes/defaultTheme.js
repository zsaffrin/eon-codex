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
  primary: "#8e44ad",
  primaryLight: "#AB69C8",
  accent: "#cfd3d6"
};
const inputs = {
  borderColor: color.accent
};

const defaultTheme = {
  space,
  color,
  inputs
};

export default defaultTheme;
