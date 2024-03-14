'use client'
import { useRouter } from "next/navigation"
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({ username: '', email: '', password: '', });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData.email);
            const response = await axios.post("/api/signup", JSON.stringify(formData));
            setMessage(response.data.message);
            if(response.data.message == "User signed up successfully")
            {
                router.push('/login');
            }
        } catch (error) {
            console.error("Error in user signup:", error);
        }
    };


    return (
        <main className='px-12 flex justify-center items-center h-screen'>
            <div className='w-full'>
                <div className='w-1/3 mx-auto p-5'>
                    <h1 className='text-3xl font-bold text-center mb-20'>Create new Account</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col item-center gap-3'>
                        <div className='flex flex-col p-2'>
                            <label className="mb-1 text-md" htmlFor="username">Username:</label>
                            <input className='p-2 w-full text-white bg-white/5 ' type="text" id="username" name="username" value={formData.username} onChange={handleChange}
                            />
                        </div>
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
                        <button type="submit" className='mt-3 bg-white/5 w-1/3 mx-auto py-2 hover:bg-white/10 hover:transition duration-500 rounded-3xl'>Sign Up</button>
                    </form>
                    <div className="flex justify-between w-1/3 mx-auto mt-3">
                        <p className="text-sm">Registered user: </p><button className="text-sm underline" type="button" onClick={() => router.push('/login')}>Login</button>

                    </div>
                    {message && <p>{message}</p>}
                </div>
            </div>

        </main>
    );
};

export default Signup;
