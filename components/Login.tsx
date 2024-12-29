'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/services/authService';
import Link from 'next/link';
//import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await login(username, password);
            const expirationDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
            console.log(response.token, expirationDate);
            //Cookies.set('token', response.token, { expires: expirationDate });
            router.push('/');

            
            //Cookies.set('token', response.token, { expires: 1 }); // Store token in a cookie for 7 days
            //router.push('/');
        } catch (err: any) {
            console.log(err);
            if (err.response.status === 401) {
                setError(err.response.data.message);
            } else {
                setError('Login failed. Please try again.');
            }
            
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full p-2 bg-blue-500 text-white rounded" type="submit">Login</button>
                <span className="text-center block mt-4">Don't have an account? <Link href="/register" className=" mt-4 text-blue-500">Register</Link></span>
                
            </form>
        </div>
    );
};

export default Login;