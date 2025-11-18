
import React from 'react';

interface EditorPaneProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  error?: boolean;
  actions: React.ReactNode;
  footer: React.ReactNode;
}

const EditorPane: React.FC<EditorPaneProps> = ({
  title,
  value,
  onChange,
  readOnly = false,
  placeholder,
  error = false,
  actions,
  footer,
}) => {
  const baseClasses = "w-full h-full p-4 bg-gray-800 text-gray-200 font-mono rounded-b-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";
  const errorClasses = "ring-2 ring-red-500";
  
  return (
    <div className="flex flex-col h-[60vh] min-h-[400px] bg-gray-800/50 rounded-lg border border-gray-700 shadow-lg">
      <header className="flex items-center justify-between p-3 bg-gray-700/50 rounded-t-lg border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      </header>
      <div className="relative flex-grow">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`${baseClasses} ${error ? errorClasses : ''}`}
          spellCheck="false"
        />
      </div>
       <footer className="flex items-center justify-end p-2 bg-gray-700/50 rounded-b-lg border-t border-gray-700">
        {footer}
      </footer>
    </div>
  );
};

export default EditorPane;
