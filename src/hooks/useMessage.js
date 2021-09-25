import { useState } from 'react';

import { Message } from '../components/ui';

const useMessage = () => {
  const [message, setMessage] = useState(null);

  /**
   * Method to set message
   * 
   * @param {string} messageType Message type: success|warn|error|info[default]
   * @param {string} messageContent Description of param
   * @param {boolean} raw [Optional] JSON.stringify content
   * @return None
   */
  const handleMessageUpdate = (messageType, messageContent, raw) => {
    setMessage(!messageType && !messageContent
      ? null
      : (
        <Message type={messageType} raw={raw}>
          {messageContent}
        </Message>
      )
    );
  };

  return [message, handleMessageUpdate];
};

export default useMessage;
