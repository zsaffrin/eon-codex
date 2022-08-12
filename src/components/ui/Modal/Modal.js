import styled from 'styled-components';

const Backdrop = styled.div(({ theme }) => {
  const { modals, space } = theme;
  return `
    background: ${modals.background};
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
    width: 95%;
    max-width: 32rem;
    overflow: auto;
  `;
});

const Modal = ({ children }) => {
  return (
    <Backdrop>
      <Content>
        {children}
      </Content>
    </Backdrop>
  );
};

export default Modal;
