import { CircleUser, MessageSquare, MoreVertical, Search } from "lucide-react";
import ChatList from "./ChatList";

const Sidebar = ({ onChatSelect, chats }: { onChatSelect: (chat: any) => void, chats: any[] }) => {
  return (
    <div className="w-1/3 flex flex-col border-r">
      <div className="bg-gray-200 p-2 flex justify-between items-center">
        <CircleUser size={40} />
        <div className="flex gap-4">
          <MessageSquare />
          <MoreVertical />
        </div>
      </div>
      <div className="p-2 bg-gray-100">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full rounded-lg p-2 pl-10 bg-white"
          />
        </div>
      </div>
      <ChatList onChatSelect={onChatSelect} chats={chats} />
    </div>
  );
};

export default Sidebar;
