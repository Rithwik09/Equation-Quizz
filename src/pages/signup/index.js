'use client';

import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { auth } from '../../lib/firebase'; 
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError('');

    //     try {
    //         const response = await fetch('/auth/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //                 name,
    //                 action: 'signup'
    //             }),
    //         });
    //         // Check if the response is not OK
    //         if (!response.ok) {
    //             const errorMessage = `Error: ${response.status} ${response.statusText}`;
    //             console.log(errorMessage);
    //             console.error(errorMessage);
    //             setError('Signup failed: ' + errorMessage);
    //             return;
    //         }
    //         // Ensure the response is JSON
    //         const data = await response.json();

    //         if (data.success) {
    //             router.push('/');
    //         } else {
    //             setError(data.message || 'Signup failed');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         console.error('Signup error:', error);
    //         setError('An error occurred during signup');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Firebase auth signup
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // You can optionally set displayName after the user is created
            // await user.updateProfile({ displayName: name });

            // Navigate to the desired page after successful signup
            router.push('/');
        } catch (error) {
            console.error('Signup error:', error.message);
            setError(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                        <i
                            className="absolute inset-y-10 right-0 pr-3 pt-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </i>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-600 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
