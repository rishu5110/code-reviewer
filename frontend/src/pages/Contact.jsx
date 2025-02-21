import React from 'react'

const Contact = () => {
    return (
        <div className="container mx-auto p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <div className="space-y-4 text-gray-300">
                        <p>
                            <span className="font-semibold">Email: </span>
                            <a href="mailto:rishugoyal290404@gmail.com"
                                className="text-blue-400 hover:text-blue-300">
                                rishugoyal290404@gmail.com
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold">Address: </span>
                            <address className="inline">
                                Chitkara University
                            </address>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
