import React, { Dispatch, SetStateAction, useState } from 'react'
import StreamChatContent from './StreamChatContent'
import StreamChatHeading from './StreamChatHeading'
import StreamChatFooter from './StreamChatFooter'

// Message type definition
type Message = {
  id: string;
  text: string;
  user_id: number;
  timestamp: Date;
}

type Props = {
  setIsChatOpen: Dispatch<SetStateAction<boolean>>
}

const StreamChatMainContainer = ({ setIsChatOpen }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'fsdf',
      user_id: 1,
      timestamp: new Date()
    },
    {
      id: '2',
      text: 'sdfsf',
      user_id: 1,
      timestamp: new Date()
    },
    {
      id: '3',
      text: 'fsdfsfe',
      user_id: 2,
      timestamp: new Date()
    },
    {
      id: '4',
      text: 'fsdfsdfe',
      user_id: 2,
      timestamp: new Date()
    },
    {
      id: '5',
      text: 'dfsdfe',
      user_id: 1,
      timestamp: new Date()
    },
    {
      id: '6',
      text: 'dfssdfe',
      user_id: 2,
      timestamp: new Date()
    },
    {
      id: '7',
      text: 'sdfsdfе',
      user_id: 1,
      timestamp: new Date()
    },
    {
      id: '8',
      text: 'sdfsdfе',
      user_id: 1,
      timestamp: new Date()
    },
    {
      id: '9',
      text: 'dsfsdfе',
      user_id: 2,
      timestamp: new Date()
    },
    {
      id: '10',
      text: 'dsfsdfе',
      user_id: 1,
      timestamp: new Date()
    }

  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        user_id: 1,
        timestamp: new Date()
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <StreamChatHeading setIsChatOpen={setIsChatOpen} />
      <StreamChatContent messages={messages} />
      <StreamChatFooter
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  )
}

export default StreamChatMainContainer