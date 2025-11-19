import React, { useState, useEffect, useRef, useCallback } from 'react';
import EditorPane from './components/EditorPane';
import { convertJsonAndGetStats, formatJson } from './services/toonService';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import IconButton from './components/IconButton';
import { UploadIcon, DownloadIcon, ClipboardIcon, CheckIcon, MagicIcon, ZapIcon, CodeBracketIcon } from './components/icons';
import FAQ from './components/FAQ';

const DEFAULT_JSON = `{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
}`;

const BASIC_EXAMPLE = JSON.stringify({
  id: 1,
  product: "Laptop",
  price: 1200,
  inStock: true
}, null, 2);

const NESTED_EXAMPLE = JSON.stringify({
  orderId: "A1234",
  customer: {
    name: "Jane Doe",
    email: "jane.doe@example.com"
  },
  items: [
    { productId: "P001", quantity: 1 },
    { productId: "P002", quantity: 2 }
  ]
}, null, 2);

const COMPLEX_EXAMPLE = JSON.stringify({
  report: "Q3 Sales",
  data: [
    { "id": 1, "name": "Laptop", "price": 999.99, "category": "Electronics" },
    { "id": 2, "name": "Mouse", "price": 29.99, "category": "Electronics" },
    { "id": 3, "name": "Keyboard", "price": 79.99, "category": "Electronics" },
    { "id": 4, "name": "Desk Chair", "price": 149.50, "category": "Furniture" }
  ]
}, null, 2);


const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(DEFAULT_JSON);
  const [toonOutput, setToonOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [jsonTokens, setJsonTokens] = useState<number>(0);
  const [toonTokens, setToonTokens] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isJsonCopied, copyJson] = useCopyToClipboard(jsonInput);
  const [isToonCopied, copyToon] = useCopyToClipboard(toonOutput);

  useEffect(() => {
    try {
      if (jsonInput.trim() === '') {
        setToonOutput('');
        setError(null);
        setJsonTokens(0);
        setToonTokens(0);
        return;
      }

      const jsonObj = JSON.parse(jsonInput);
      const result = convertJsonAndGetStats(jsonObj);
      
      setToonOutput(result.toon);
      setJsonTokens(result.stats.jsonTokenCount);
      setToonTokens(result.stats.toonTokenCount);
      setError(null);
    } catch (e) {
      // Only show error if user is actively typing something that isn't valid yet
      // but we won't clear the output immediately to prevent flashing
      setError('Invalid JSON format');
      // Fallback token counting or 0 could go here
    }
  }, [jsonInput]);

  const handleFormat = useCallback((pretty: boolean) => {
    try {
      const formatted = formatJson(jsonInput, pretty);
      setJsonInput(formatted);
      setError(null);
    } catch (e) {
      setError('Cannot format invalid JSON.');
    }
  }, [jsonInput]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setJsonInput(text);
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleDownload = () => {
    if(!toonOutput) return;
    const blob = new Blob([toonOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.toon';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleLoadExample = (exampleJson: string) => {
    setJsonInput(exampleJson);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-x-hidden">
      
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
            v1.0.0 • Optimize for LLMs
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              JSON to TOON
            </span> Converter
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Reduce token usage by up to 60% for Gemini, GPT-4, and Claude. 
            Convert your data into the token-optimized TOON format instantly.
          </p>
        </header>

        {/* Quick Start / Examples */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Start Examples</span>
          <div className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 shadow-xl backdrop-blur-sm">
            <button onClick={() => handleLoadExample(BASIC_EXAMPLE)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Basic</button>
            <button onClick={() => handleLoadExample(NESTED_EXAMPLE)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Nested</button>
            <button onClick={() => handleLoadExample(COMPLEX_EXAMPLE)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">Complex</button>
          </div>
        </div>

        {/* Main Converter Area */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <EditorPane
            title="JSON Input"
            value={jsonInput}
            onChange={setJsonInput}
            placeholder="Paste your JSON here..."
            error={!!error}
            actions={
              <>
                <div className="hidden sm:flex items-center space-x-1 mr-2">
                  <IconButton onClick={() => handleFormat(true)} icon={<MagicIcon />} text="Pretty" compact />
                  <IconButton onClick={() => handleFormat(false)} icon={<ZapIcon />} text="Minify" compact />
                </div>
                <IconButton onClick={triggerFileUpload} icon={<UploadIcon />} text="Upload" />
                <IconButton onClick={copyJson} icon={isJsonCopied ? <CheckIcon /> : <ClipboardIcon />} text={isJsonCopied ? "Copied" : "Copy"} variant="primary" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".json"
                />
              </>
            }
            footer={
              <div className="flex justify-between items-center w-full">
                 <span className={`text-xs px-2 py-1 rounded ${error ? 'bg-red-500/10 text-red-400' : 'text-slate-500'}`}>
                   {error ? error : "Valid JSON"}
                 </span>
                 <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-500">{jsonInput.length} chars</span>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                      {jsonTokens} Tokens
                    </span>
                 </div>
              </div>
            }
          />
          
          <EditorPane
            title="TOON Output"
            value={toonOutput}
            readOnly
            placeholder="TOON output will appear here..."
            actions={
              <>
                <IconButton onClick={copyToon} icon={isToonCopied ? <CheckIcon /> : <ClipboardIcon />} text={isToonCopied ? "Copied" : "Copy"} variant="primary" />
                <IconButton onClick={handleDownload} icon={<DownloadIcon />} text="Download" disabled={!toonOutput} />
              </>
            }
            footer={
              <div className="flex justify-between items-center w-full">
                 <span className="text-xs text-green-400">
                    {jsonTokens > 0 ? `${Math.max(0, jsonTokens - toonTokens)} tokens saved` : ''}
                 </span>
                 <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-500">{toonOutput.length} chars</span>
                    <span className="text-xs font-mono bg-indigo-900/30 border border-indigo-500/20 px-2 py-1 rounded text-indigo-300">
                      {toonTokens} Tokens
                    </span>
                 </div>
              </div>
            }
          />
        </main>
        
        <div className="space-y-8">
          <FAQ />
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 mb-2">Made with ❤️ by <a target="_blank" rel="noopener noreferrer" href="https://x.com/ebiedev" className="text-indigo-400 hover:text-indigo-300 transition-colors">Ebraheem</a></p>
          <p className="text-xs text-slate-600">
            Benchmarks based on standard tokenization across GPT-4 and Gemini models.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;