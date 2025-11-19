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
  return (
    <div className={`flex flex-col h-[65vh] min-h-[500px] rounded-xl overflow-hidden border shadow-2xl transition-all duration-300 ${error ? 'border-red-500/50 shadow-red-900/10' : 'border-slate-700/50 shadow-black/20 bg-slate-900/50 backdrop-blur-sm'}`}>
      
      {/* Editor Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
        <div className="flex items-center gap-4">
          {/* Mac-style window dots decoration */}
          <div className="flex space-x-1.5">
            <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-slate-600'}`}></div>
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          </div>
          <span className="text-sm font-medium text-slate-300 select-none">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      </header>

      {/* Editor Content */}
      <div className="relative flex-grow bg-slate-950/50 group">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full h-full p-4 font-mono text-sm leading-6 bg-transparent text-slate-200 resize-none focus:outline-none selection:bg-indigo-500/30 placeholder-slate-600`}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        
        {/* Subtle focus ring via inset shadow or border on parent if needed, keeping clean for now */}
      </div>

       {/* Editor Footer / Status Bar */}
       <footer className="flex items-center justify-end px-4 py-2 bg-slate-900/80 border-t border-slate-800 text-sm font-medium">
        {footer}
      </footer>
    </div>
  );
};

export default EditorPane;