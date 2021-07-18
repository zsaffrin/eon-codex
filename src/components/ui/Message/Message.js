import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { BiCheckCircle, BiErrorCircle, BiInfoCircle, BiXCircle } from 'react-icons/bi';

const StyledMessage = styled.div(({ theme, type }) => {
  const { message, space } = theme;

  let messageColor = message.infoColor;
  if (type === 'error') { messageColor = message.errorColor; }
  if (type === 'success') { messageColor = message.successColor; }
  if (type === 'warn') { messageColor = message.warnColor; }

  return `
    background: ${tinycolor(messageColor).setAlpha(0.1)};
    border: 1px solid ${messageColor};
    border-radius: 5px;
    color: ${messageColor};
    display: grid;
    grid-template-columns: min-content 1fr;
    padding: ${space.md};
    grid-gap: ${space.md};
  `;
});


const Message = ({ children, type, raw }) => {
  let messageIcon = <BiInfoCircle />;
  if (type === 'error') { messageIcon = <BiXCircle />; }
  if (type === 'success') { messageIcon = <BiCheckCircle />; }
  if (type === 'warn') { messageIcon = <BiErrorCircle />; }

  return (
    <StyledMessage type={type}>
      <div>{messageIcon}</div>
      {raw
        ? <pre>{JSON.stringify(children, ' ', 2)}</pre>
        : <div>{children}</div>
      }
    </StyledMessage>
  );
};

export default Message;
