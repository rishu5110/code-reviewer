import React, { useState } from 'react';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
);

const Home = () => {
    const [ss, setss] = useState(`int main()
{
printf("hello");
}`);
    const [msg, setmsg] = useState("Please enter some code and click send.");
    const [isLoading, setIsLoading] = useState(false);

    const handleTextareaChange = (e) => {
        setss(e.target.value);
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
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    };

    return (
        <div className="flex flex-1 overflow-hidden">
            <div className="w-1/2 p-6 border-r border-gray-700">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">Input Code</h2>
                    <p className="text-gray-400 text-sm">Enter your code for review</p>
                </div>
                <textarea
                    value={ss}
                    onChange={handleTextareaChange}
                    className="w-full h-64 p-4 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg 
        focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
                    placeholder="Enter your code here..."
                ></textarea>
                <br />
                <button
                    onClick={send_data}
                    disabled={isLoading}
                    className={`mt-4 px-6 py-2 text-white rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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
};

export default Home;
