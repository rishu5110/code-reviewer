import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaListOl, FaCog, FaLightbulb, FaQuestionCircle, FaSearch, FaChevronUp, FaCopy, FaCheck } from 'react-icons/fa';

const sections = [
    {
        title: "Getting Started",
        icon: FaBook,
        content: "The Code Review AI tool helps you analyze and improve your code quality with advanced AI-powered suggestions."
    },
    {
        title: "How to Use",
        icon: FaListOl,
        steps: [
            "Paste your code in the input section",
            "Click the Send button",
            "Wait for the AI to analyze your code",
            "Review the suggestions and improvements"
        ]
    },
    {
        title: "Features",
        icon: FaCog,
        content: "Advanced code analysis, real-time suggestions, multiple language support, and detailed explanations."
    },
    {
        title: "Best Practices",
        icon: FaLightbulb,
        content: "Learn about coding standards, common pitfalls to avoid, and ways to improve your code quality."
    }
];

const Documentation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [copiedSection, setCopiedSection] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredSections = sections.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (section.content && section.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(index);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        >
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                >
                    Documentation
                </motion.h1>

                {/* Search Bar */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="mb-8"
                >
                    <div className="relative max-w-xl mx-auto">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
                        />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredSections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-xl group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                            <section.icon size={24} />
                                        </div>
                                        <h2 className="text-2xl font-semibold text-white">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => copyToClipboard(section.content || section.steps?.join('\n'), index)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {copiedSection === index ?
                                            <FaCheck className="text-green-400" /> :
                                            <FaCopy className="text-gray-400 hover:text-blue-400" />
                                        }
                                    </motion.button>
                                </div>

                                <motion.div
                                    initial={false}
                                    animate={{ height: expandedSection === index ? 'auto' : '100px' }}
                                    className="overflow-hidden"
                                >
                                    {section.steps ? (
                                        <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                            {section.steps.map((step, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    whileHover={{ x: 5 }}
                                                    className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
                                                >
                                                    {step}
                                                </motion.li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <p className="text-gray-300 leading-relaxed">
                                            {section.content}
                                        </p>
                                    )}
                                </motion.div>

                                {(section.content?.length > 100 || (section.steps && section.steps.length > 2)) && (
                                    <button
                                        onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                                        className="text-blue-400 hover:text-blue-300 text-sm mt-2"
                                    >
                                        {expandedSection === index ? 'Show less' : 'Show more'}
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center"
                >
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <FaQuestionCircle className="text-blue-400" />
                        <p>Need help? Check our FAQ section or contact support.</p>
                    </div>
                </motion.div>

                {/* Back to Top Button */}
                <AnimatePresence>
                    {showBackToTop && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            onClick={scrollToTop}
                            className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                        >
                            <FaChevronUp />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Documentation;
