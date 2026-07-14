import React from 'react'
import Chat from '../components/Chat'
import ChatSidebar from '../components/ChatSidebar'

export default function ChatPage() {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 flex-1 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <ChatSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Chat />
        </div>
      </div>
    </div>
  )
}
