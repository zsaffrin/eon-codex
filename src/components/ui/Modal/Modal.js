import React from 'react';
import {
  arrayOf, node, oneOfType,
} from 'prop-types';
import styled from 'styled-components';

const Backdrop = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    background: rgba(0,0,0,0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    align-items: center;
    justify-items: center;
    padding: ${space.lg};
  `;
});
const Content = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    background: ${color.background};
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
