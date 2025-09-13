"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import { chats } from "@/data/chats";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

let socket: any;

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [allChats, setAllChats] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated') {
      fetch('/api/chats')
        .then((res) => res.json())
        .then((data) => {
          setAllChats(data);
          setSelectedChat(data[0]);
        });

      socket = io();

      socket.on("connect", () => {
        console.log("connected to socket server");
      });

      socket.on('chat message', (msg: { chatId: number, message: string }) => {
        const newChats = allChats.map((chat) => {
          if (chat.id === msg.chatId) {
            const newMessage = {
              id: chat.messages.length + 1,
              text: msg.message,
              sent: false,
              timestamp: new Date().toLocaleTimeString(),
            };
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: msg.message,
              timestamp: new Date().toLocaleTimeString(),
            };
          }
          return chat;
        });
        setAllChats(newChats);
        if (selectedChat && selectedChat.id === msg.chatId) {
          setSelectedChat(newChats.find((c) => c.id === msg.chatId)!);
        }
      });

      socket.on('typing', (data: { user: string, chatId: number }) => {
        if (selectedChat && selectedChat.id === data.chatId) {
          setTypingUsers(prev => [...prev, data.user]);
        }
      });

      socket.on('stop typing', () => {
        setTypingUsers(prev => prev.slice(0, -1));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [status]);

  const handleSendMessage = (chatId: number, message: string) => {
    const newChats = allChats.map((chat) => {
      if (chat.id === chatId) {
        const newMessage = {
          id: chat.messages.length + 1,
          text: message,
          sent: true,
          timestamp: new Date().toLocaleTimeString(),
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message,
          timestamp: new Date().toLocaleTimeString(),
        };
      }
      return chat;
    });
    setAllChats(newChats);
    setSelectedChat(newChats.find((c) => c.id === chatId)!);
    socket.emit("chat message", { chatId, message });
  };

  const handleTyping = (chatId: number, user: string) => {
    socket.emit('typing', { chatId, user });
  };

  const handleStopTyping = () => {
    socket.emit('stop typing');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex h-screen">
      <Sidebar onChatSelect={setSelectedChat} chats={allChats} />
      <ChatArea
        chat={selectedChat}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
        typingUsers={typingUsers}
      />
    </main>
  );
}
