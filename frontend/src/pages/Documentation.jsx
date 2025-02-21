import React from 'react'

const Documentation = () => {
    return (
        <div className="container mx-auto p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Documentation</h1>
            <div className="space-y-6 text-gray-300">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                    <p>The Code Review AI tool helps you analyze and improve your code quality.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Paste your code in the input section</li>
                        <li>Click the Send button</li>
                        <li>Wait for the AI to analyze your code</li>
                        <li>Review the suggestions and improvements</li>
                    </ol>
                </section>
            </div>
        </div>
    )
}

export default Documentation
