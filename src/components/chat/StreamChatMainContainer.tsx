import React, { Dispatch, SetStateAction } from 'react'
import StreamChatContent from './StreamChatContent'
import StreamChatHeading from './StreamChatHeading'
import StreamChatFooter from './StreamChatFooter'

type Props = {
  setIsChatOpen: Dispatch<SetStateAction<boolean>>
}

const StreamChatMainContainer = ({ setIsChatOpen }: Props) => {
  return (
    <div className='flex flex-col justify-between h-full '>
      <StreamChatHeading />
      <StreamChatContent />
      <StreamChatFooter />
    </div>
  )
}

export default StreamChatMainContainer