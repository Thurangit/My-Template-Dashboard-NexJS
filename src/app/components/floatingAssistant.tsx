import React from 'react';
import { HelpCircle } from 'lucide-react';

const FloatingAssistantButton: React.FC = () => {
  return (
    <button 
      className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
    >
      <HelpCircle className="w-8 h-8" />
    </button>
  );
};

export default FloatingAssistantButton;