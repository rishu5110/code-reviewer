import React from 'react'

const About = () => {
    return (
        <div className="container mx-auto p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <div className="space-y-6 text-gray-300">
                <p>Code Review AI is an intelligent code analysis tool that helps developers write better code.</p>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p>To provide developers with instant, intelligent feedback on their code to improve code quality and maintainability.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Features</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Instant code analysis</li>
                        <li>Best practices suggestions</li>
                        <li>Performance optimization tips</li>
                        <li>Security vulnerability detection</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default About
