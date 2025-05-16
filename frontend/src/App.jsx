import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import CodeReview from './pages/CodeReview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LeetDaily from './pages/LeetDaily';

const App = () => {
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

  const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
      <nav className="bg-gray-800 border-b border-gray-700 p-4 relative">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo />
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-300 hover:text-white p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between flex-1 pl-12">
              <div className="flex space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
                <Link to="/code-review" className="text-gray-300 hover:text-white transition">Code Review</Link>
                <Link to="/docs" className="text-gray-300 hover:text-white transition">Documentation</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
                <Link to="/leetdaily" className="text-gray-300 hover:text-white transition">LeetDaily</Link>
              </div>
              <div className="space-x-2 flex items-center">
                {user ? (
                  <>
                    <span className="text-gray-300">{user.username || user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
                    <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:hidden fixed inset-x-0 top-[73px] bg-gray-800 border-b border-gray-700 z-50`}>
            <div className="flex flex-col w-full p-4 space-y-4">
              <Link to="/" className="text-gray-300 hover:text-white transition py-2" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition py-2" onClick={toggleMenu}>About</Link>
              <Link to="/code-review" className="text-gray-300 hover:text-white transition py-2" onClick={toggleMenu}>Code Review</Link>
              <Link to="/docs" className="text-gray-300 hover:text-white transition py-2" onClick={toggleMenu}>Documentation</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition py-2" onClick={toggleMenu}>Contact</Link>
              <Link to="/leetdaily" className="text-gray-300 hover:text-white transition py-2" onClick={toggleMenu}>LeetDaily</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                {user ? (
                  <>
                    <span className="text-gray-300 text-center">{user.username || user.email}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={toggleMenu}>Login</Link>
                    <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center" onClick={toggleMenu}>Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col h-full min-h-screen w-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code-review" element={<CodeReview />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/leetdaily" element={<LeetDaily />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
