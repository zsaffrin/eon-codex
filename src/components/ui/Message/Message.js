import { arrayOf, node, oneOfType, string } from 'prop-types';
import styled from 'styled-components';
import { FaInfoCircle, FaTimesCircle, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const StyledMessage = styled.div(({ theme, type }) => {
  const { messages, space } = theme;

  let background = messages.infoBackground;
  let color = messages.infoColor;
  if (type === 'success') {
    background = messages.successBackground;
    color = messages.successColor;
  }
  if (type === 'warn') {
    background = messages.warnBackground;
    color = messages.warnColor;
  }
  if (type === 'error') {
    background = messages.errorBackground;
    color = messages.errorColor;
  }
  if (type === 'info') {
    background = messages.infoBackground;
    color = messages.infoColor;
  }

  return `
    background: ${background};
    border: 1px solid ${color};
    border-left-width: ${space.md};
    color: ${color};
    display: grid;
    grid-template-columns: max-content 1fr;
  
    & > div {
      padding: ${space.md};
    }
  `;
});

const Message = ({ children, type }) => {
  let messageIcon;
  if (type === 'success') { messageIcon = <FaCheckCircle />; }
  if (type === 'warn') { messageIcon = <FaExclamationCircle />; }
  if (type === 'error') { messageIcon = <FaTimesCircle />; }
  if (type === 'info') { messageIcon = <FaInfoCircle />; }
  
  return (
    <StyledMessage type={type}>
      {messageIcon && <div>{messageIcon}</div>}
      <div>{children}</div>
    </StyledMessage>
  );
};
Message.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]),

  /** Message type: success|warn|error|info (default) */
  type: string,
};

export default Message;
