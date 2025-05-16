import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (!email || !password) {
            alert("Empty Fields");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    username: response.data.username
                }));
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert('Login failed. Please try again.');
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl shadow-md w-96 transition duration-300 transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-500"
                            id="email"
                            type="email"
                            placeholder="Username"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 focus:ring-2 focus:ring-blue-500"
                            id="password"
                            type="password"
                            name='password'
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline transition duration-300" type="button" onClick={submitHandler}>
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
