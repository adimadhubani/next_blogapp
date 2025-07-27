'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { FiCopy, FiHome, FiSend, FiEdit2, FiBookOpen, FiSun, FiMoon } from 'react-icons/fi';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check user's preferred color scheme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = { text: data.output, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const botMessage: Message = { text: `Error: ${data.error}`, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Failed to fetch from API:", error);
      const errorMessage: Message = { text: "Error: Could not connect to the chatbot.", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`p-4 shadow-sm relative z-10 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto flex justify-between items-center max-w-5xl">
          <div className="flex items-center space-x-4">
            <img 
              src={darkMode ? 
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" : 
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"} 
              alt="Blog Assistant" 
              className="w-12 h-12 rounded-full object-cover border-2 shadow-md" 
              style={{ borderColor: darkMode ? '#4B5563' : '#BFDBFE' }}
            />
            <div>
              <h1 className="text-2xl font-bold">BlogCraft AI</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your personal blogging assistant</p>
            </div>
          </div>
          <div className="flex space-x-3 items-center">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link href="/" className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
              <FiHome className="mr-2" />
              Home
            </Link>
            <Link href='/dashboard/articles/create'>
            <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-purple-300 hover:bg-gray-600' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}>
              <FiEdit2 className="mr-2" />
              New Post
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col p-4 overflow-hidden container mx-auto max-w-5xl">
        {/* Suggested Prompts */}
        {messages.length === 0 && !loading && (
          <div className="mb-6">
            <h2 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>How can I help you today?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Generate a blog post outline about sustainable living",
                "Suggest catchy titles for a tech startup article",
                "Help me improve this paragraph: [your text]",
                "Give me ideas for a personal development blog"
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className={`p-3 rounded-lg text-left transition-colors shadow-sm ${darkMode ? 
                    'bg-gray-800 border-gray-700 hover:bg-gray-700' : 
                    'bg-white border-gray-200 hover:bg-blue-50'}`}
                >
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{prompt}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto rounded-xl mb-4 shadow-sm flex flex-col ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {messages.length === 0 && !loading ? (
            <div className={`flex flex-col items-center justify-center h-full p-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <img 
                src={darkMode ? 
                  "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" : 
                  "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"} 
                alt="Writing Assistant" 
                className="w-32 h-32 mb-6 rounded-full object-cover"
              />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Welcome to BlogCraft AI</h2>
              <p className="max-w-md">
                I can help you brainstorm ideas, draft content, edit your writing, and optimize your blog posts for better engagement.
              </p>
              <div className={`mt-6 flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <FiBookOpen className="mr-2" />
                <span>Start by asking a question or using a prompt above</span>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl p-4 rounded-xl ${message.sender === 'user'
                      ? darkMode 
                        ? 'bg-blue-700 text-white rounded-br-none' 
                        : 'bg-blue-600 text-white rounded-br-none'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-100 rounded-bl-none group' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none group'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-sm">
                        {message.sender === 'user' ? 'You' : 'Blog Assistant'}
                      </p>
                      {message.sender === 'bot' && (
                        <button
                          onClick={() => copyToClipboard(message.text)}
                          className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                          title="Copy to clipboard"
                        >
                          <FiCopy className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </button>
                      )}
                    </div>
                    <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className={`max-w-2xl p-4 rounded-xl rounded-bl-none ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="font-semibold text-sm mb-2">Blog Assistant</p>
                    <div className="flex space-x-2">
                      <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0ms' }}></div>
                      <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '150ms' }}></div>
                      <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about blogging, writing, or content creation..."
            className={`flex-grow border rounded-lg p-4 focus:outline-none focus:ring-2 shadow-sm ${darkMode ? 
              'bg-gray-700 border-gray-600 focus:ring-blue-500 text-white placeholder-gray-400' : 
              'border-gray-300 focus:ring-blue-400 text-gray-700'}`}
            disabled={loading}
          />
          <button
            type="submit"
            className={`flex items-center justify-center p-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${darkMode ? 
              'bg-blue-600 text-white hover:bg-blue-700' : 
              'bg-blue-600 text-white hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <FiSend className="mr-2" />
                Send
              </>
            )}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className={`py-4 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
        <div className="container mx-auto max-w-5xl text-center text-sm">
          <p>BlogCraft AI Assistant - Helping you create amazing content since 2023</p>
        </div>
      </footer>
    </div>
  );
}