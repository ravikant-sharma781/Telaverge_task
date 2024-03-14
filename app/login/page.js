'use client'

import { useRouter } from "next/navigation"
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({email: '', password: '', });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('/api/login', JSON.stringify(formData));
            setMessage(response.data.message)
            console.log("setMessage", setMessage.data);
            if(response.data.message == "User logged in successfully")
            {
                router.push('/');
            }
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <main className='px-12 flex justify-center items-center h-screen'>
            <div className='w-full'>
                <div className='w-1/3 mx-auto p-5'>
                    <h1 className='text-3xl font-bold text-center mb-20'>Login to your Account</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col item-center gap-3'>
                        <div className='flex flex-col p-2'>
                            <label className="mb-1 text-md" htmlFor="email">Email:</label>
                            <input className='p-2 w-full text-white bg-white/5 ' type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col p-2'>
                            <label className="mb-1 text-md" htmlFor="password">Password:</label>
                            <input className='p-2 w-full text-white bg-white/5 ' type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className='mt-3 bg-white/5 w-1/3 mx-auto py-2 hover:bg-white/10 hover:transition duration-500 rounded-3xl'>Login</button>
                    </form>
                    <div className="flex justify-around w-1/3 mx-auto mt-3">
                        <p className="text-sm">New user: </p><button className="text-sm underline" type="button" onClick={() => router.push('/signup')}>SignUp</button>

                    </div>
                    {message && <p>{message}</p>}
                </div>
            </div>

        </main>
    );
};

export default Login;
