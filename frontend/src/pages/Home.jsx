import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaSpinner, FaPlay } from 'react-icons/fa';

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            <FaSpinner className="h-12 w-12 text-blue-500" />
        </motion.div>
        <p className="text-blue-400">Analyzing your code...</p>
    </div>
);

const languageConfigs = {
    c: {
        language: "c",
        version: "10.2.0",
        defaultCode: `int main()
{
    printf("hello");
    return 0;
}`
    },
    cpp: {
        language: "cpp",
        version: "10.2.0",
        defaultCode: `#include <iostream>
using namespace std;

int main() {
    cout << "hello" << endl;
    return 0;
}`
    },
    java: {
        language: "java",
        version: "15.0.2",
        defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("hello");
    }
}`
    },
    javascript: {
        language: "javascript",
        version: "browser",
        defaultCode: `console.log("hello");`
    }
};

const Home = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('c');
    const [ss, setss] = useState(languageConfigs.c.defaultCode);
    const [msg, setmsg] = useState("Please enter some code and click send.");
    const [isLoading, setIsLoading] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [output, setOutput] = useState("");
    const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' or 'output'

    const handleTextareaChange = (e) => {
        setss(e.target.value);
    };

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        setss(languageConfigs[newLang].defaultCode);
    };

    const send_data = () => {
        setIsLoading(true);
        fetch('http://localhost:3000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ss }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setmsg(data.msg);
                setIsLoading(false);
                setActiveTab('analysis');
            })
            .catch((error) => {
                console.error('Error:', error.message);
                setIsLoading(false);
            });
    };

    const executeCode = () => {
        setIsExecuting(true);
        setOutput("");

        // Special handling for JavaScript - run in browser
        if (selectedLanguage === 'javascript') {
            try {
                // Create a new Function to run the code in a sandbox
                const result = new Function(ss)();
                // Capture console.log output
                const oldLog = console.log;
                let output = '';
                console.log = (...args) => {
                    output += args.join(' ') + '\n';
                    oldLog.apply(console, args);
                };
                // Execute the code
                eval(ss);
                // Restore console.log
                console.log = oldLog;
                setOutput(output || 'Code executed successfully (no output)');
                setIsExecuting(false);
                setActiveTab('output');
            } catch (error) {
                setOutput(`Error: ${error.message}`);
                setIsExecuting(false);
            }
            return;
        }

        console.log('ss:', ss);
        console.log('selectedLanguage:', selectedLanguage);
        console.log('languageConfigs[selectedLanguage]:', languageConfigs[selectedLanguage]);
        console.log('languageConfigs[selectedLanguage].language:', languageConfigs[selectedLanguage].language);

        fetch('https://codeflixlabs.site/compile-sockets/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: languageConfigs[selectedLanguage].language,
                version: languageConfigs[selectedLanguage].version,
                files: [{ content: ss }]
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Execution Result:', data);
                setOutput(data.run?.output || data.compile?.output || "No output");
                setIsExecuting(false);
                setActiveTab('output');
            })
            .catch((error) => {
                console.error('Error:', error.message);
                setOutput("Error executing code");
                setIsExecuting(false);
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col lg:flex-row flex-1 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 md:p-6 gap-4 md:gap-6"
        >
            <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="w-full lg:w-1/2 bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/50 p-4 md:p-6"
            >
                <div className="mb-4 md:mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <FaCode className="text-blue-400 text-xl" />
                        <h2 className="text-xl md:text-2xl font-semibold text-white">Input Code</h2>
                    </div>
                    <p className="text-gray-400 text-sm">Paste your code below for AI-powered review</p>
                    <div className="flex items-center mt-4">
                        <select
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                            className="w-full max-w-[200px] bg-gray-900/50 text-gray-100 border border-gray-600 rounded-lg px-3 py-1.5
                                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                        >
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                            <option value="javascript">JavaScript (Browser)</option>
                        </select>
                    </div>
                </div>

                <textarea
                    value={ss}
                    onChange={handleTextareaChange}
                    className="w-full h-[300px] lg:h-[calc(100%-160px)] p-4 bg-gray-900/50 text-gray-100 border border-gray-600 rounded-lg 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    font-mono text-sm resize-none transition-colors"
                    placeholder="Enter your code here..."
                    spellCheck="false"
                ></textarea>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <motion.button
                        onClick={send_data}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-8 py-3 text-white rounded-lg transition-all duration-200 
                        flex-1 flex items-center justify-center space-x-2
                        ${isLoading
                                ? 'bg-blue-500/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg'}`}
                    >
                        {isLoading ? (
                            <span className="flex items-center space-x-2">
                                <FaSpinner className="animate-spin" />
                                <span>Processing...</span>
                            </span>
                        ) : 'Analyze Code'}
                    </motion.button>

                    <motion.button
                        onClick={executeCode}
                        disabled={isExecuting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-8 py-3 text-white rounded-lg transition-all duration-200 
                        flex-1 flex items-center justify-center space-x-2
                        ${isExecuting
                                ? 'bg-green-500/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg'}`}
                    >
                        {isExecuting ? (
                            <span className="flex items-center space-x-2">
                                <FaSpinner className="animate-spin" />
                                <span>Running...</span>
                            </span>
                        ) : (
                            <span className="flex items-center space-x-2">
                                <FaPlay />
                                <span>Run Code</span>
                            </span>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                className="w-full lg:w-1/2 bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/50 p-4 md:p-6 flex flex-col"
            >
                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Results</h2>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`text-sm px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'analysis'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('analysis')}
                        >
                            Analysis
                        </button>
                        <button
                            className={`text-sm px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap ${activeTab === 'output'
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('output')}
                        >
                            Output
                        </button>
                    </div>
                </div>

                {isLoading || isExecuting ? (
                    <LoadingSpinner />
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 overflow-auto rounded-lg bg-gray-900/50 p-3 md:p-4 min-h-[300px]"
                    >
                        <pre className="text-wrap text-gray-100 whitespace-pre-wrap font-mono text-sm">
                            {activeTab === 'analysis' ? msg : output}
                        </pre>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Home;
