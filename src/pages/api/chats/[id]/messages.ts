import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'src/data/data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
};

const writeData = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { message } = req.body;
    const data = readData();
    const chatIndex = data.chats.findIndex((chat: any) => chat.id === Number(id));

    if (chatIndex === -1) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const newMessage = {
      id: data.chats[chatIndex].messages.length + 1,
      text: message,
      sent: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    data.chats[chatIndex].messages.push(newMessage);
    data.chats[chatIndex].lastMessage = message;
    data.chats[chatIndex].timestamp = new Date().toLocaleTimeString();

    writeData(data);

    res.status(201).json(newMessage);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
