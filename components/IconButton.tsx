import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  disabled?: boolean;
  variant?: 'default' | 'primary';
  compact?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  onClick, 
  icon, 
  text, 
  disabled = false, 
  variant = 'default',
  compact = false
}) => {
  
  const baseClasses = "flex items-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = variant === 'primary'
    ? "text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500 shadow-lg shadow-indigo-900/20"
    : "text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white focus:ring-slate-500 border border-slate-700/50";

  const sizeClasses = compact 
    ? "px-2 py-1 text-xs" 
    : "px-3 py-1.5 text-sm";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
      aria-label={text}
    >
      <span className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${text ? 'mr-2' : ''}`}>{icon}</span>
      {text}
    </button>
  );
};

export default IconButton;