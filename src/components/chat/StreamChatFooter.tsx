import React from 'react'
import { IoSend } from 'react-icons/io5'
import { FaPaperclip } from 'react-icons/fa'

type Props = {
    inputMessage: string;
    setInputMessage: (message: string) => void;
    handleSendMessage: () => void;
}

const StreamChatFooter = ({ inputMessage, setInputMessage, handleSendMessage }: Props) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (

        <div className='flex items-center gap-2 bg-gray-900 rounded-full px-4 py-1'>
            <button className='text-gray-400'>
                <FaPaperclip />
            </button>

            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Send a message"
                className='flex-1 bg-transparent border-none outline-none text-white py-2'
            />

            <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className='text-white'
            >
                <IoSend />
            </button>
        </div>

    )
}

export default StreamChatFooter