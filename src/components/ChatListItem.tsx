import React from 'react';
import { CircleUser } from 'lucide-react';

const ChatListItem = ({ chat }: { chat: any }) => {
  return (
    <div className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-100">
      <CircleUser size={50} />
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-xs text-gray-500">{chat.timestamp}</p>
        </div>
        <p className="text-sm text-gray-600">{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;