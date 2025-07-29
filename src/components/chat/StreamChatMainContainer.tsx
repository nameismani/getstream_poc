import React, { Dispatch, SetStateAction, useState } from 'react'
import StreamChatContent from './StreamChatContent'
import StreamChatHeading from './StreamChatHeading'
import StreamChatFooter from './StreamChatFooter'

// Message type definition
type Message = {
  id: string;
  text: string;
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
      timestamp: new Date()
    },
    {
      id: '2',
      text: 'sdfsf',
      timestamp: new Date()
    },
    {
      id: '3',
      text: 'fsdfsfe',
      timestamp: new Date()
    },
    {
      id: '4',
      text: 'fsdfsdfe',
      timestamp: new Date()
    },
    {
      id: '5',
      text: 'dfsdfe',
      timestamp: new Date()
    },
    {
      id: '6',
      text: 'dfssdfe',
      timestamp: new Date()
    },
    {
      id: '7',
      text: 'sdfsdfе',
      timestamp: new Date()
    },
    {
      id: '8',
      text: 'sdfsdfе',
      timestamp: new Date()
    },
    {
      id: '9',
      text: 'dsfsdfе',
      timestamp: new Date()
    },
    {
      id: '10',
      text: 'dsfsdfе',
      timestamp: new Date()
    }

  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage,
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