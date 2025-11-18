
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
      setError('Invalid JSON format. Please check your input.');
      setToonOutput('');
      setJsonTokens(0);
      setToonTokens(0);
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
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">JSON to TOON Converter</h1>
          <p className="mt-2 text-lg text-gray-400">Instantly convert your JSON data into the clean and minimal TOON format for <b>FREE</b>.</p>
        </header>

        <div className="flex justify-center items-center gap-2 my-4">
          <IconButton onClick={() => handleLoadExample(BASIC_EXAMPLE)} icon={<CodeBracketIcon />} text="Basic" />
          <IconButton onClick={() => handleLoadExample(NESTED_EXAMPLE)} icon={<CodeBracketIcon />} text="Nested" />
          <IconButton onClick={() => handleLoadExample(COMPLEX_EXAMPLE)} icon={<CodeBracketIcon />} text="Complex" />
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditorPane
            title="JSON"
            value={jsonInput}
            onChange={setJsonInput}
            placeholder="Paste your JSON here..."
            error={!!error}
            actions={
              <>
                <IconButton onClick={() => handleFormat(true)} icon={<MagicIcon />} text="Pretty" />
                <IconButton onClick={() => handleFormat(false)} icon={<ZapIcon />} text="Minify" />
                <IconButton onClick={copyJson} icon={isJsonCopied ? <CheckIcon /> : <ClipboardIcon />} text={isJsonCopied ? "Copied" : "Copy"} />
                <IconButton onClick={triggerFileUpload} icon={<UploadIcon />} text="Upload" />
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
              <span className="text-sm text-gray-400">Tokens: {jsonTokens}</span>
            }
          />
          <EditorPane
            title="TOON"
            value={toonOutput}
            readOnly
            placeholder="TOON output will appear here..."
            actions={
              <>
                <IconButton onClick={copyToon} icon={isToonCopied ? <CheckIcon /> : <ClipboardIcon />} text={isToonCopied ? "Copied" : "Copy"} />
                <IconButton onClick={handleDownload} icon={<DownloadIcon />} text="Download" disabled={!toonOutput} />
              </>
            }
            footer={
              <span className="text-sm text-gray-400">Tokens: {toonTokens}</span>
            }
          />
        </main>
        
        <div className="mt-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}

          <FAQ />
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>Made with ❤️ by <a target="_blank" href="https://x.com/ebiedev">Ebraheem</a></p>
        </footer>
      </div>
    </div>
  );
};

export default App;