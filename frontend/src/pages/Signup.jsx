import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/signup', { // Replace '/api/signup' with your actual API endpoint
                username: username,
                email: email,
                password: password
            });

            console.log(response.data); // Handle success response
            alert('Signup successful!');
        } catch (error) {
            console.error("Signup failed:", error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl shadow-md w-96 transition duration-300 transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign Up</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-500"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-500"
                            id="email"
                            type="email"
                            placeholder="Email"
                            name = "email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-500"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-500"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-300" type="button" onClick={handleSignup}>
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300">
                        Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
