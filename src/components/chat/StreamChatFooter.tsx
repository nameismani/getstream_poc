import React, { useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { FaPaperclip } from 'react-icons/fa'

type Props = {
    handleSendMessage: (message: string) => void;
}

const StreamChatFooter = ({ handleSendMessage }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputMessage, setInputMessage] = useState("");

    // Auto-resize textarea function
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // Reset textarea height
    const resetTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    // Handle input change and auto-resize
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
        adjustTextareaHeight();
    };

    // Handle form submission
    const onSubmit = () => {
        const message = inputMessage.trim();
        if (message) {
            handleSendMessage(message);
            setInputMessage("");
            resetTextareaHeight();
        }
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className='pt-3 px-6'>
            <div className='flex items-end gap-2 bg-black rounded-2xl px-4 py-2 border border-[#272a30]'>
                {/* Auto-expanding textarea */}
                <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Send a message"
                    className='flex-1 bg-transparent border-none outline-none text-white py-0 resize-none min-h-[24px] max-h-[70px] overflow-y-auto'
                    rows={1}

                />

                {/* Send button */}
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!inputMessage.trim()}
                    className={`transition-colors mb-1 flex-shrink-0 ${inputMessage.trim()
                        ? 'text-blue-500 hover:text-blue-400 cursor-pointer'
                        : 'text-gray-600 cursor-not-allowed'
                        }`}
                >
                    <IoSend size={18} />
                </button>
            </div>
        </div>
    )
}

export default StreamChatFooter