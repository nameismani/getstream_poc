import React, { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoSend } from 'react-icons/io5'
import { FaPaperclip } from 'react-icons/fa'

type MessageFormData = {
    message: string;
}

type Props = {
    handleSendMessage: (message: string) => void;
}

const StreamChatFooter = ({ handleSendMessage }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
        register,
        watch,
        reset,
        setFocus,
        setValue
    } = useForm<MessageFormData>({
        defaultValues: {
            message: ""
        }
    });

    const currentMessage = watch("message");

    // Auto-resize textarea function
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // Reset textarea height when message is cleared
    const resetTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    // Focus textarea when component mounts
    useEffect(() => {
        setFocus("message");
    }, [setFocus]);

    // Handle form submission
    const onSubmit = () => {
        const message = currentMessage?.trim();
        if (message) {
            handleSendMessage(message);
            reset();
            resetTextareaHeight();
            // Re-focus after sending
            setTimeout(() => setFocus("message"), 0);
        }
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    // Handle input change and auto-resize
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue("message", e.target.value);
        adjustTextareaHeight();
    };

    // Register the textarea with react-hook-form
    const { onChange, onBlur, name, ref } = register("message");

    return (
        <div className='pt-3 px-6'>
            <div className='flex items-end gap-2 bg-black rounded-2xl px-4 py-2 border border-[#272a30]'>
                {/* Attachment button */}
                <button
                    type="button"
                    className='text-gray-400 hover:text-white transition-colors mb-1 flex-shrink-0'
                    onClick={() => console.log("Open attachment modal")}
                >
                    <FaPaperclip size={16} />
                </button>

                {/* Auto-expanding textarea */}
                <textarea
                    ref={(e) => {
                        ref(e); // react-hook-form ref
                        textareaRef.current = e; // our ref for height manipulation
                    }}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                        onChange(e); // react-hook-form onChange
                        handleInputChange(e); // our custom onChange for auto-resize
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="Send a message"
                    className='flex-1 bg-transparent border-none outline-none text-white py-1 resize-none min-h-[24px] max-h-[120px] overflow-y-auto'
                    rows={1}
                    style={{
                        lineHeight: '1.5',
                        fontSize: '14px'
                    }}
                />

                {/* Send button */}
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!currentMessage?.trim()}
                    className={`transition-colors mb-1 flex-shrink-0 ${currentMessage?.trim()
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