import { useState } from 'react';

import { Message } from '../components/ui';

const useMessage = () => {
  const [message, setMessage] = useState(null);

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
