import React from "react";
import styled from "styled-components";

const ImageWrap = styled.span(({ theme }) => {
  const { color, space } = theme;
  return `
    display: block;
    border: 1px solid ${color.accent};
    padding: ${space.md};
  `;
});
const StyledImg = styled.img`
  width: 100%;
`;
const Caption = styled.span(({ theme }) => {
  const { space } = theme;
  return `
    display: block;
    font-size: 0.85em;  
    padding: ${space.md};
  `;
});

const Image = ({ alt, src }) => {
  return (
    <ImageWrap>
      <StyledImg
        src={`https://res.cloudinary.com/dbg0v7696/image/upload/f_auto,q_auto/v1572134405/eon-codex/${src}`}
      />
      <Caption>{alt}</Caption>
    </ImageWrap>
  );
};

export default Image;
