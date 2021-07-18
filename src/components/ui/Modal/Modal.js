import React from 'react';
import {
  arrayOf, node, oneOfType,
} from 'prop-types';
import styled from 'styled-components';

const Backdrop = styled.div(({ theme }) => {
  const { modal, space } = theme;
  return `
    background: ${modal.background};
    position: fixed;
    inset: 0;
    display: grid;
    align-items: center;
    justify-items: center;
    padding: ${space.lg};
  `;
});
const Content = styled.div(({ theme }) => {
  const { app } = theme;
  return `
    background: ${app.background};
    max-height: 85vh;
    overflow: auto;
  `;
});

const Modal = ({ children }) => (
  <Backdrop>
    <Content>
      {children}
    </Content>
  </Backdrop>
);
Modal.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};
Modal.defaultProps = {
  children: [],
};

export default Modal;
