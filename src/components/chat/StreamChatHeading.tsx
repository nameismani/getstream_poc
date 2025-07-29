"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { IoIosClose } from "react-icons/io";

type Props = {
    setIsChatOpen: Dispatch<SetStateAction<boolean>>
}

const StreamChatHeading = ({ setIsChatOpen }: Props) => {
    return (
        <div className='py-2 flex justify-between items-center'>
            Chat
            <button className='p-1 rounded-full bg-white/10 cursor-pointer' onClick={() => setIsChatOpen(false)}>
                <IoIosClose className='text-xl' />
            </button>
        </div>
    )
}

export default StreamChatHeading