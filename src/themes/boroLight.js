import tinycolor from 'tinycolor2';

const name = 'Boro Light';

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
  background: color.white,
  backgroundLevel: [
    tinycolor(color.white).darken(5),
    tinycolor(color.white).darken(10),
    tinycolor(color.white).darken(15),
    tinycolor(color.white).darken(20),
  ],
  color: color.black,
};

const boroLight = {
  app,
  name,
};

export default boroLight;
