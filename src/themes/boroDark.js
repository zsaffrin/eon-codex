import tinycolor from 'tinycolor2';

const name = 'Boro Dark';

const palette = {
  primary: '#9A0680',
  secondary: '#64B5F6',
};

const color = {
  ...palette,
  
  white: tinycolor(palette.primary).lighten(85).toString(),
  black: tinycolor(palette.primary).darken(29).toString(),
  
  darkgray: '#928590',
  gray: '#c8c2c7',
  lightgray: '#e3e0e2',
  
  danger: '#d50000',
  success: '#046c16',
  info: '#06369a',
  warn: '#d35400',
};

const app = {
  background: color.black,
  backgroundLevel: [
    tinycolor(color.black).lighten(2),
    tinycolor(color.black).lighten(6),
    tinycolor(color.black).lighten(10),
    tinycolor(color.black).lighten(15),
  ],
};

const text = {
  color: color.white,
  fadedColor: color.gray,
};

const links = {
  color: palette.secondary,
  hoverColor: '#EC407A',
  backgroundActive: app.backgroundLevel[2],
  backgroundHover: app.backgroundLevel[3],
};

const borders = {
  color: tinycolor(color.primary).desaturate(50).lighten(10),
};

const headers = {
  mainBackground: app.backgroundLevel[0],
  mainBackgroundActive: app.backgroundLevel[2],
  mainBackgroundHover: app.backgroundLevel[3],
  mainBottomBorder: `1px solid ${borders.color.clone().darken(20)}`,
  secondaryBackground: app.backgroundLevel[2],
  secondaryBackgroundHover: app.backgroundLevel[3],
  secondaryBottomBorder: `1px solid ${borders.color.clone().darken(20)}`,
  infoBackground: app.backgroundLevel[0],
  infoBackgroundActive: app.backgroundLevel[2],
  infoBackgroundHover: app.backgroundLevel[3],
  infoBottomBorder: `1px solid ${borders.color.clone().darken(20)}`,
};

const inputs = {
  background: color.lightgray,
  border: `1px solid ${color.darkgray}`,
  borderRadius: '0.25rem',
  focusBackground: color.white,
  fontSize: '0.9rem',
  padding: '0.25rem',
};

const buttons = {
  dangerColor: color.danger,
  defaultColor: color.gray,
  disabledColor: color.darkgray,
  primaryColor: palette.secondary,
  textColor: color.black,
  textColorDisabled: color.lightgray,
};

const messages = {
  successColor: color.success,
  successBackground: tinycolor.mix(color.success, color.lightgray, 75),
  warnColor: color.warn,
  warnBackground: tinycolor.mix(color.warn, color.lightgray, 75),
  errorColor: color.danger,
  errorBackground: tinycolor.mix(color.danger, color.lightgray, 75),
  infoColor: color.info,
  infoBackground: tinycolor.mix(color.info, color.lightgray, 75),
};

const box = {
  background: app.backgroundLevel[0],
  borderColor: borders.color,
  highlightedBackground: tinycolor(color.success).darken(17),
  highlightedBorderColor: color.success,
  mutedBackground: app.backgroundLevel[0],
  mutedBorderColor: color.darkgray,
};

const tables = {
  border: `1px solid ${color.darkgray}`,
};

const modals = {
  background: tinycolor(color.black).lighten(5).setAlpha(0.95),
};

const boroDark = {
  app,
  borders,
  box,
  buttons,
  color,
  headers,
  inputs,
  links,
  messages,
  modals,
  name,
  tables,
  text,
};

export default boroDark;
