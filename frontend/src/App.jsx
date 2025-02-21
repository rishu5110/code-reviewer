import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Documentation from './pages/Documentation'
import About from './pages/About'
import Contact from './pages/Contact'

const App = () => {
  const [value, setvalue] = useState("");
  const [msg, setmsg] = useState("plz click on send button");
  const [isLoading, setIsLoading] = useState(false);

  const send_data = () => {
    setIsLoading(true);

    fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setmsg(data.msg);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="text-xl font-bold text-white">Code Review AI</span>
    </div>
  );

  const Navbar = () => (
    <nav className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex space-x-4">
          <Link to="/docs" className="text-gray-300 hover:text-white transition">Documentation</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
        </div>
      </div>
    </nav>
  );

  const MainContent = () => (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-1/2 p-6 border-r border-gray-700">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">Input Code</h2>
          <p className="text-gray-400 text-sm">Enter your code for review</p>
        </div>
        <textarea
          disabled={isLoading}
          onChange={(e) => setvalue(e.target.value)}
          className="w-full h-64 p-4 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg 
          focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Enter your text here..."
        ></textarea>
        <br />
        <button
          onClick={send_data}
          disabled={isLoading}
          className={`mt-4 px-6 py-2 text-white rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isLoading ? 'Processing...' : 'Send'}
        </button>
      </div>

      <div className="w-1/2 p-6 bg-gray-800 overflow-hidden flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">Review Results</h2>
          <p className="text-gray-400 text-sm">AI-powered code analysis</p>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex-1 overflow-auto">
            <pre className="text-wrap text-gray-100 whitespace-pre-wrap font-mono 
              bg-gray-900 p-4 rounded-lg min-h-full">{msg}</pre>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
