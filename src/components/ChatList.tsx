import React from 'react';
import { chats } from '@/data/chats';
import ChatListItem from './ChatListItem';

const ChatList = ({ onChatSelect, chats }: { onChatSelect: (chat: any) => void, chats: any[] }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => onChatSelect(chat)}>
          <ChatListItem chat={chat} />
        </div>
      ))}
    </div>
  );
};

export default ChatList;