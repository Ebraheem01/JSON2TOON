import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './icons';

const faqData = [
  {
    question: "What is TOON?",
    answer: () => (
      <p className="text-slate-300 leading-relaxed">
        <strong className="text-white">TOON (Token-Oriented Object Notation)</strong> is a compact, human-readable data serialization format designed specifically to optimize data exchange with Large Language Models (LLMs). It strips away redundant syntax to save tokens without losing meaning.
      </p>
    )
  },
  {
    question: "Key features of TOON?",
    answer: () => (
      <ul className="list-none space-y-3 text-slate-300">
        <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> <span><strong className="text-white">Token Efficient:</strong> 30-60% fewer tokens compared to JSON.</span></li>
        <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> <span><strong className="text-white">LLM Optimized:</strong> Designed to be easily parsed by AI models.</span></li>
        <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> <span><strong className="text-white">Indentation-Based:</strong> Uses structure like YAML instead of heavy braces.</span></li>
        <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> <span><strong className="text-white">Tabular Arrays:</strong> Declares keys once, streams data as CSV-like rows.</span></li>
      </ul>
    )
  },
  {
    question: "Why use TOON vs JSON?",
    answer: () => (
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">The Problem: JSON Verbosity</h4>
          <div className="bg-slate-950 rounded border border-slate-800 p-3 font-mono text-xs text-slate-400 overflow-x-auto">
{`{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"}
  ]
}`}
          </div>
          <p className="text-xs text-red-400 mt-1 font-medium">~51 tokens</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">The Solution: TOON Efficiency</h4>
          <div className="bg-slate-950 rounded border border-indigo-500/30 p-3 font-mono text-xs text-indigo-300 overflow-x-auto">
{`users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`}
          </div>
          <p className="text-xs text-green-400 mt-1 font-medium">~24 tokens (53% reduction!)</p>
        </div>
      </div>
    )
  },
  {
    question: "When to Use TOON",
    answer: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-900/10 border border-green-900/30 rounded-lg p-4">
          <h4 className="flex items-center font-bold text-green-400 mb-3">
            <span className="w-5 h-5 mr-2"><CheckCircleIcon /></span>
            Best Use Cases
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Database Query Results</li>
            <li>API Responses to LLMs</li>
            <li>RAG (Retrieval Augmented Generation)</li>
            <li>Chatbot Context History</li>
            <li>Cost-Sensitive Bulk Processing</li>
          </ul>
        </div>
        <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-4">
           <h4 className="flex items-center font-bold text-red-400 mb-3">
            <span className="w-5 h-5 mr-2"><XCircleIcon /></span>
            When NOT to Use
          </h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Deeply Nested, Irregular Structures</li>
            <li>Client-side config files (use JSON)</li>
            <li>Pure tabular number data (use CSV)</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    question: "Benchmarks & Comparison",
    answer: () => (
      <div className="space-y-4">
        <p className="text-slate-300 text-sm">
          TOON achieves <strong className="text-white">73.9% accuracy</strong> while using <strong className="text-green-400">39.6% fewer tokens</strong> across GPT-4, Claude, and Gemini.
        </p>
        <div className="overflow-x-auto border border-slate-700 rounded-lg">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-3 font-semibold text-slate-200">Format</th>
                <th className="p-3 font-semibold text-slate-200">Tokens</th>
                <th className="p-3 font-semibold text-slate-200 whitespace-nowrap">Accuracy</th>
                <th className="p-3 font-semibold text-slate-200 whitespace-nowrap">Efficiency Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              <tr className="bg-indigo-900/20">
                <td className="p-3 font-bold text-indigo-300">TOON</td>
                <td className="p-3 text-slate-300">2,744</td>
                <td className="p-3 text-slate-300">73.9%</td>
                <td className="p-3 text-indigo-300 font-bold">26.9</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-slate-400">JSON Compact</td>
                <td className="p-3 text-slate-400">3,081</td>
                <td className="p-3 text-slate-400">70.7%</td>
                <td className="p-3 text-slate-400">22.9</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-slate-400">YAML</td>
                <td className="p-3 text-slate-400">3,719</td>
                <td className="p-3 text-slate-400">69.0%</td>
                <td className="p-3 text-slate-400">18.6</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-slate-400">JSON</td>
                <td className="p-3 text-slate-400">4,545</td>
                <td className="p-3 text-slate-400">69.7%</td>
                <td className="p-3 text-slate-400">15.3</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="p-3 text-slate-400">XML</td>
                <td className="p-3 text-slate-400">5,167</td>
                <td className="p-3 text-slate-400">67.1%</td>
                <td className="p-3 text-slate-400">13.0</td>
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
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <details key={index} className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden transition-all hover:border-indigo-500/30 open:bg-slate-900 open:border-slate-700 shadow-lg" name="faq" open={index === 0}>
            <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
              <h3 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors">{item.question}</h3>
              <span className="ml-4 flex-shrink-0 text-slate-500 group-open:text-indigo-400 transform transition-transform duration-300 group-open:rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <div className="px-4 pb-5 border-t border-slate-800/50 pt-4 animate-in slide-in-from-top-2 fade-in duration-200">
              {item.answer()}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;