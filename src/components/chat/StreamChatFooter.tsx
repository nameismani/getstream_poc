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
        <div className='pt-3 px-6'>
            <div className='flex items-center gap-2 bg-black rounded-full px-4 py-1 border border-[#272a30]'>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Send a message"
                    className='flex-1 bg-transparent border-none outline-none text-white py-0.5'
                />

                <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className='text-white cursor-pointer'
                >
                    <IoSend />
                </button>
            </div>
        </div>


    )
}

export default StreamChatFooter