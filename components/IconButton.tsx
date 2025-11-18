
import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, text, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="w-4 h-4 mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default IconButton;
