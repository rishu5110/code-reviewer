import React from 'react';

const CodeReview = () => {
    return (
        <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Code Review Guidelines</h1>
            <div className="prose prose-invert">
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>Make sure your code is properly formatted</li>
                    <li>Include necessary headers and imports</li>
                    <li>Add appropriate comments for complex logic</li>
                    <li>Follow standard naming conventions</li>
                    <li>Check for memory leaks and optimize performance</li>
                    <li>Handle errors and edge cases appropriately</li>
                </ul>
            </div>
        </div>
    );
};

export default CodeReview;
