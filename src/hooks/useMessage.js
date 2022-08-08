import { useState } from 'react';

import { Message } from '../components/ui';

const useMessage = (initialType, initialContent) => {
  const [message, setMessage] = useState(initialType || initialContent
    ? (
        <Message type={initialType}>
          {initialContent}
        </Message>
      )
    : null);

  /**
   * Method to set message
   * 
   * @param {string} messageType Message type: success|warn|error|info[default]
   * @param {string} messageContent Description of param
   * @return None
   */
  const handleMessageUpdate = (messageType, messageContent, renderAsJSON) => {
    setMessage(!messageContent
      ? null
      : (
        <Message type={messageType}>
          {typeof messageContent === Object || renderAsJSON ? JSON.stringify(messageContent, ' ', 2) : messageContent}
        </Message>
      )
    );
  };

  return [message, handleMessageUpdate];
};

export default useMessage;
