'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/app/services/authService';
import Link from 'next/link';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await register(name, password, email);
            
            router.push('/login');
        } catch (err: any) {
            console.log(err?.response);
            if (err.response.status === 422) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">Register</button>
                <span className="text-center block mt-4">Already have an account? <Link href="/login" className=" mt-4 text-blue-500">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;