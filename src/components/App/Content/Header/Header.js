import React from 'react';
import styled from 'styled-components';

import HeaderNav from './HeaderNav';

const ImageWrap = styled.div(({ theme }) => {
  const { color, space } = theme;
  return `
    background: ${color.background}  ;
    height: 4.5rem;
    overflow: hidden;
    padding: ${space.sm};
    text-align: center;

    & img {
      height: 100%;
    }
  `;
});

const Header = () => (
  <header>
    <ImageWrap>
      <img
        src="https://res.cloudinary.com/dbg0v7696/image/upload/v1588811231/eon-codex/Eon_Codex_Logo.png"
        alt="Eon Codex"
      />
    </ImageWrap>
    <HeaderNav />
  </header>
);

export default Header;
