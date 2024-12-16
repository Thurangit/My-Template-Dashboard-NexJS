import React, { useState, useRef, useEffect } from 'react';
import { Headset, Send, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        text: `Vous avez dit : "${inputMessage}". Je suis une réponse de placeholder !`,
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
      <motion.div
        key={message.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`flex mb-4 relative ${isUser ? 'justify-end' : 'pl-14'}`}
      >
        {!isUser && (
          <div className="absolute left-0 top-0 w-12 h-12">
            <img
              src="/api/placeholder/48/48"
              alt="AI Assistant"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}
        <div
          className={`
            max-w-[70%] p-3 rounded-lg 
            ${isUser
              ? 'bg-indigo-700 text-white'
              : 'bg-gray-200 text-black'}
          `}
        >
          {message.text}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className={`
          bg-indigo-800 
          text-white rounded-full w-16 h-16 
          flex items-center justify-center 
          shadow-2xl hover:bg-indigo-900 
          transition-colors z-50
        `}
      >
        <Headset className="w-8 h-8" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="
              fixed bottom-24 right-6 
              w-96 h-[500px] 
              bg-white/70 
              backdrop-blur-lg 
              rounded-xl 
              shadow-2xl border 
              flex flex-col 
              overflow-hidden
            "
          >
            {/* Chat Header */}
            <div
              className="
                bg-indigo-800/80 text-white 
                p-4 rounded-t-xl 
                flex justify-between items-center
                backdrop-blur-sm
              "
            >
              <h2 className="font-bold">Assistant IA</h2>
              <motion.button
                whileHover={{ rotate: 180 }}
                onClick={toggleChat}
                className="hover:bg-indigo-700/50 p-1 rounded-full"
              >
                <ArrowUp />
              </motion.button>
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="
                flex-grow overflow-y-auto 
                p-4 
                scrollbar-thin 
                scrollbar-thumb-indigo-500 
                scrollbar-track-gray-200/50
                flex flex-col
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
                p-4 border-t border-gray-200/50
                flex items-center 
                space-x-2
                bg-white/50
                backdrop-blur-sm
              "
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="
                  flex-grow p-2 
                  border border-gray-300/50 rounded-lg 
                  bg-white/70
                  text-black 
                  placeholder-gray-600
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-indigo-500
                "
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                className="
                  bg-indigo-700/80 text-white 
                  p-2 rounded-full 
                  hover:bg-indigo-800/80
                  transition-colors
                "
              >
                <Send className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingAssistantButton;