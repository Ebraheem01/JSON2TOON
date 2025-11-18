import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './icons';

const faqData = [
  {
    question: "What is TOON?",
    answer: () => (
      <p>
        TOON (Token-Oriented Object Notation) is a compact, human-readable data serialization format designed specifically to optimize data exchange with Large Language Models (LLMs).
      </p>
    )
  },
  {
    question: "Key features of TOON?",
    answer: () => (
      <ul className="list-disc list-inside space-y-2">
        <li><strong className="text-white">Token Efficient:</strong> 30-60% fewer tokens compared to JSON</li>
        <li><strong className="text-white">LLM Optimized:</strong> Designed for AI comprehension</li>
        <li><strong className="text-white">Indentation-Based:</strong> Uses whitespace instead of braces (like YAML)</li>
        <li><strong className="text-white">Tabular Arrays:</strong> Declares keys once, streams data as rows</li>
        <li><strong className="text-white">Human Readable:</strong> Clean, easy to debug</li>
      </ul>
    )
  },
  {
    question: "Why use TOON?",
    answer: () => (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-white">JSON</h4>
          <p>JSON is verbose. Every object in an array repeats all key names:</p>
          <pre className="bg-gray-800 p-3 rounded-md mt-2 text-sm font-mono overflow-x-auto">
            <code>
{`{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"}
  ]
}`}
            </code>
          </pre>
          <p className="text-xs text-gray-500 mt-1">Token Count: ~51 tokens</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">The TOON Solution</h4>
          <p>TOON declares keys once and streams values:</p>
          <pre className="bg-gray-800 p-3 rounded-md mt-2 text-sm font-mono overflow-x-auto">
            <code>
{`users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`}
            </code>
          </pre>
          <p className="text-xs text-gray-500 mt-1">Token Count: ~24 tokens (53% reduction!)</p>
        </div>
      </div>
    )
  },
  {
    question: "When to Use TOON",
    answer: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center font-semibold text-white mb-2">
            <span className="w-5 h-5 mr-2 text-green-400"><CheckCircleIcon /></span>
            Best Use Cases
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Database Query Results</li>
            <li>API Responses</li>
            <li>Analytics Data</li>
            <li>Chatbot Contexts</li>
            <li>RAG Systems</li>
            <li>Cost-Sensitive Applications</li>
          </ul>
        </div>
        <div>
           <h4 className="flex items-center font-semibold text-white mb-2">
            <span className="w-5 h-5 mr-2 text-red-400"><XCircleIcon /></span>
            When NOT to Use TOON
          </h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Deeply Nested Structures</li>
            <li>Non-Uniform Data</li>
            <li>Existing JSON Pipelines</li>
            <li>Pure Tabular Data (use CSV)</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    question: "Benchmarks & Comparison",
    answer: () => (
      <div className="space-y-4">
        <p>
          TOON achieves <strong className="text-white">73.9% accuracy</strong> (vs JSON's 69.7%) while using <strong className="text-white">39.6% fewer tokens</strong> across multiple LLM models including GPT-4, Claude, and Gemini.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-600/50">
              <tr>
                <th className="p-3 font-semibold text-white">Format</th>
                <th className="p-3 font-semibold text-white">Tokens</th>
                <th className="p-3 font-semibold text-white">Accuracy</th>
                <th className="p-3 font-semibold text-white">Efficiency Score</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700 bg-sky-900/50 font-semibold text-sky-300">
                <td className="p-3">TOON</td>
                <td className="p-3">2,744</td>
                <td className="p-3">73.9%</td>
                <td className="p-3">26.9</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3">JSON Compact</td>
                <td className="p-3">3,081</td>
                <td className="p-3">70.7%</td>
                <td className="p-3">22.9</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3">YAML</td>
                <td className="p-3">3,719</td>
                <td className="p-3">69.0%</td>
                <td className="p-3">18.6</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3">JSON</td>
                <td className="p-3">4,545</td>
                <td className="p-3">69.7%</td>
                <td className="p-3">15.3</td>
              </tr>
              <tr className="">
                <td className="p-3">XML</td>
                <td className="p-3">5,167</td>
                <td className="p-3">67.1%</td>
                <td className="p-3">13.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <details key={index} className="bg-gray-700/50 rounded-lg p-4 cursor-pointer group" name="faq" open={index === 0}>
            <summary className="font-semibold text-white list-none flex justify-between items-center">
              {item.question}
              <span className="transform transition-transform duration-200 group-open:rotate-90">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </summary>
            <div className="mt-4 text-gray-300">
              {item.answer()}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
