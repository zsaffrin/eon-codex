import { useState } from 'react';

import { Message } from '../components/ui';

const useMessage = () => {
  const [message, setMessage] = useState(null);

  const handleMessageUpdate = (messageType, messageContent) => {
    setMessage(
      <Message type={messageType}>
        {messageContent}
      </Message>
    );
  };

  return [message, handleMessageUpdate];
};

export default useMessage;
