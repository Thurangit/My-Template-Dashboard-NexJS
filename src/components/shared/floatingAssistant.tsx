import React, { useState, useRef, useEffect } from 'react';
import { Headset, Send, ChevronDown } from 'lucide-react';
import { THEMEASSISTICON } from '@/styles/themes';

// Message type for type safety
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const FloatingAssistantButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');

    // Simulate assistant response (replace with actual AI integration)
    setTimeout(() => {
      const assistantResponse: Message = {
        id: Date.now() + 1,
        text: `You said: "${inputMessage}". I'm a placeholder response!`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, assistantResponse]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Enter key for sending messages
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Render individual message
  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    return (
      <div
        key={message.id}
        className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`
            max-w-[70%] p-3 rounded-lg 
            ${isUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'}
          `}
        >
          {message.text}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`
          ${THEMEASSISTICON.assist.background} 
          text-white rounded-full w-16 h-16 
          flex items-center justify-center 
          shadow-lg hover:bg-blue-600 
          transition-colors z-50
        `}
      >
        <Headset className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className="
            fixed bottom-24 right-6 
            w-96 h-[500px] 
            bg-white rounded-xl 
            shadow-2xl border 
            flex flex-col 
            transition-all duration-300 
            ease-in-out
          "
        >
          {/* Chat Header */}
          <div
            className="
              bg-blue-500 text-white 
              p-4 rounded-t-xl 
              flex justify-between items-center
            "
          >
            <h2 className="font-bold">AI Assistant</h2>
            <button
              onClick={toggleChat}
              className="hover:bg-blue-600 p-1 rounded-full"
            >
              <ChevronDown />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="
              flex-grow overflow-y-auto 
              p-4 
              scrollbar-thin 
              scrollbar-thumb-blue-500 
              scrollbar-track-gray-200
            "
          >
            {/* Only show last 10 messages */}
            {messages
              .slice(-10)
              .map(renderMessage)}
          </div>

          {/* Message Input Area */}
          <div
            className="
              p-4 border-t 
              flex items-center 
              space-x-2
            "
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="
                flex-grow p-2 
                border rounded-lg 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
              "
            />
            <button
              onClick={sendMessage}
              className="
                bg-blue-500 text-white 
                p-2 rounded-full 
                hover:bg-blue-600 
                transition-colors
              "
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAssistantButton;