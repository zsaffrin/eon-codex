const space = {
  thin: '2px',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '2rem',
};

const color = {
  // Color palette generated on Palx
  // https://palx.jxnblk.com/1561ad
  primary: '#8e44ad',
  secondary: '#5b90c5',
  accent: '#cfd3d6',
  highlight: '#C12E79',

  lightgray: '#dfe1e3',
  darkgray: '#626d78',
  white: '#f8f9f9',
  black: '#384048',

  background: '#f9f9fa',
  danger: '#BE1525',
};

const app = {
  background: color.background,
  color: color.black,
};

const text = {
  linkColor: color.highlight,
  linkHoverColor: color.primary,
};

const tables = {
  rowBorderColor: color.lightgray,
};

const buttons = {
  borderColor: color.accent,
  dangerButtonColor: color.danger,
  defaultButtonColor: color.accent,
  disabledButtonColor: color.accent,
  textColorLight: color.white,
  textColorDark: color.black,
  textColorDisabled: color.white,
};

const inputs = {
  borderColor: color.accent,
};

const footer = {
  background: color.darkgray,
  color: color.background,
};

const ravien = {
  space,
  color,
  app,
  tables,
  text,
  buttons,
  inputs,
  footer,
};

export default ravien;
