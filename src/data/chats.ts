export const chats = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    timestamp: '10:30 AM',
    avatar: '/avatars/john.png',
    messages: [
      { id: 1, text: 'Hey, how are you?', sent: false, timestamp: '10:30 AM' },
      { id: 2, text: 'I am good, thanks!', sent: true, timestamp: '10:31 AM' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'See you tomorrow!',
    timestamp: 'Yesterday',
    avatar: '/avatars/jane.png',
    messages: [
      { id: 1, text: 'See you tomorrow!', sent: false, timestamp: 'Yesterday' },
    ],
  },
];
