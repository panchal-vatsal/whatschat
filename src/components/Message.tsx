import React from 'react';

const Message = ({ text, sent }: { text: string; sent?: boolean }) => {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`rounded-lg p-2 ${sent ? 'bg-green-200' : 'bg-white'}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;