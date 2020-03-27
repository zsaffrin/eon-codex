import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  background: rgba(0,0,0,0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  align-items: center;
  justify-items: center;
`;
const Content = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    background: ${color.background};
  `;
});


const Modal = ({ close, children }) => (
  <Backdrop>
    <Content>
      {children}
    </Content>
  </Backdrop>
);

export default Modal;
