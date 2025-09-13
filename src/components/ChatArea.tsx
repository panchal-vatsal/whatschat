import { Paperclip, Search, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import Message from './Message';

const ChatArea = ({
  chat,
  onSendMessage,
  onTyping,
  onStopTyping,
  typingUsers,
}: {
  chat: any,
  onSendMessage: (chatId: number, message: string) => void,
  onTyping: (chatId: number, user: string) => void,
  onStopTyping: () => void,
  typingUsers: string[],
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(chat.id, newMessage.trim());
      setNewMessage('');
      onStopTyping();
      setIsTyping(false);
    }
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      onTyping(chat.id, 'You'); // Assuming the user is 'You'
    }
    // Reset typing status after a delay
    setTimeout(() => {
      setIsTyping(false);
      onStopTyping();
    }, 2000);
  };

  if (!chat) {
    return <div className="w-2/3 flex items-center justify-center">Select a chat to start messaging</div>;
  }

  return (
    <div className="w-2/3 flex flex-col">
      <div className="bg-gray-200 p-2 flex justify-between items-center border-l">
        <div className="flex items-center">
          <div className="ml-4">
            <h3 className="font-semibold">{chat.name}</h3>
            {typingUsers.length > 0 ? (
              <p className="text-xs text-gray-500">{typingUsers.join(', ')} is typing...</p>
            ) : (
              <p className="text-xs text-gray-500">online</p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <Search />
          <MoreVertical />
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {chat.messages.map((message: any) => (
          <Message key={message.id} text={message.text} sent={message.sent} />
        ))}
      </div>
      <div className="bg-gray-200 p-2 flex items-center">
        <Paperclip />
        <input
          type="text"
          placeholder="Type a message"
          className="w-full rounded-lg p-2 ml-4"
          value={newMessage}
          onChange={handleTypingChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
      </div>
    </div>
  );
};

export default ChatArea;
