import { connectionStr } from '@/lib/db';
import User from '@/lib/models/user';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

mongoose.connect(connectionStr)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

export async function POST(req, res) {
    try {
        const { email, username, password } = await req.json();
        console.log("I'm from signup api: ", email, username, password)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" });
        }
        const newUser = new User({
            username: username,
            email: email,
            password: password
        });

        const savedUser = await newUser.save();

        return NextResponse.json({savedUser, message: "User signed up successfully" });
    } catch (error) {
        console.error("Error in user signup:", error);
        return NextResponse.json({ error: "Internal server error" });
    }

}
