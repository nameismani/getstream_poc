import React, { useEffect, useRef } from 'react'

type Message = {
    id: string;
    text: string;
    user_id: number;
    timestamp: Date;
}

type Props = {
    messages: Message[];
}

const StreamChatContent = ({ messages }: Props) => {

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const userId = 1
    // Format timestamp for the date divider
    const formatDate = (date: Date) => {
        return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };
    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);


    return (
        <div className='overflow-y-auto flex flex-col h-full px-6  py-2'>
            {/* Date divider */}
            <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-600 flex-grow"></div>
                <div className="mx-4 text-gray-400 text-sm">
                    {formatDate(new Date())}
                </div>
                <div className="border-t border-gray-600 flex-grow"></div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-2">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.user_id === userId ? 'justify-end' : 'justify-start'}`}>
                        <div className={`bg-[#272a30] text-white px-4 py-2 ${message.user_id === userId ? 'rounded-l-lg rounded-tr-lg' : 'rounded-r-lg rounded-tl-lg'} max-w-[80%]`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div ref={messagesEndRef} />
        </div>
    )
}

export default StreamChatContent