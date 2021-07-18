import tinycolor from 'tinycolor2';

const name = 'Default';


const color = {
  white: '#f8f9f9',
  black: '#010101',
  
  darkgray: '#858a8f',
  gray: '#c2c4c6',
  lightgray: '#e0e1e2',
  
  danger: '#BE1525',
  success: '#27ae60',
  info: '#2980b9',
  warn: '#d35400',
};

const app = {
  background: color.black,
  backgroundLevel: [
    tinycolor(color.black).lighten(5),
    tinycolor(color.black).lighten(10),
    tinycolor(color.black).lighten(15),
    tinycolor(color.black).lighten(20),
  ],
  color: color.white,
};

const headers = {
  background: app.backgroundLevel[1],
};

const text = {
  linkColor: '#64B5F6',
  linkHoverColor: '#EC407A',
  fadedColor: color.darkgray,
};

const input = {
  labelColor: color.lightgray,
  inputBorder: `1px solid ${color.darkgray}`,
  inputBg: color.lightgray,
  inputActiveBg: color.white,
  inputColor: color.black,
  inputDisabledBorder: `1px solid ${color.darkgray}`,
  inputDisabledBg: color.lightgray,
  inputDisabledColor: color.darkgray,
};

const button = {
  dangerColor: color.danger,
  defaultColor: color.darkgray,
  disabledColor: color.gray,
  primaryColor: '#332940',
  textColorLight: color.white,
  textColorDark: color.black,
};

const message = {
  errorColor: color.danger,
  infoColor: color.info,
  successColor: color.success,
  warnColor: color.warn,
};

const box = {
  background: app.backgroundLevel[1],
  borderColor: app.backgroundLevel[3],
};

const table = {
  borderColor: tinycolor(app.background).lighten(20),
};

const modal = {
  background: tinycolor(color.black).lighten(10).setAlpha(0.95),
};

const defaultDark = {
  app,
  box,
  headers,
  button,
  color,
  input,
  message,
  modal,
  name,
  table,
  text,
};

export default defaultDark;