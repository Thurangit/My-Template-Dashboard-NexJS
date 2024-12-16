import React from 'react';
import { Headset, HelpCircle } from 'lucide-react';
import { THEMEASSISTICON } from '../styles/themes';
const FloatingAssistantButton: React.FC = () => {
  return (
    <button
      className={`fixed bottom-6 right-6 ${THEMEASSISTICON.assist.background} text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors`}
    >
      <Headset className={`w-8 h-8 `} />
    </button>
  );
};

export default FloatingAssistantButton;