const space = {
  thin: '2px',
  sm: '0.25em',
  md: '0.5em',
  lg: '1em',
  xl: '2em',
};
const color = {
  // Color palette generated on Palx
  // https://palx.jxnblk.com/1561ad
  primary: '#8e44ad',
  secondary: '#5b90c5',
  accent: '#cfd3d6',
  lightgray: '#dfe1e3',
  darkgray: '#626d78',
  highlight: '#FFE65D',
  white: '#f8f9f9',
  black: '#384048',

  background: '#f9f9fa',
  danger: '#BE1525',
};
const text = {
  color: color.black,
  linkColor: '#C12E79',
  linkHoverColor: color.primary,
};
const inputs = {
  borderColor: color.accent,
  buttonColorDanger: color.danger,
  buttonColorDefault: color.accent,
  buttonColorDisabled: color.accent,
  buttonTextColorLight: color.white,
  buttonTextColorDark: color.black,
  buttonTextColorDisabled: color.white,
};
const tables = {
  rowBorderColor: color.lightgray,
};
const footer = {
  background: color.darkgray,
  color: color.background,
};

const defaultTheme = {
  space,
  color,
  footer,
  inputs,
  tables,
  text,
};

export default defaultTheme;
