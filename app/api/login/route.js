import { connectionStr } from '@/lib/db';
import User from '@/lib/models/user';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

mongoose.connect(connectionStr)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

export async function POST(req, res) {
  const { email, password } = await req.json();
  console.log("from the api: ", email, password);

  if (!email || !password) {
    return NextResponse.json({ error: 'Please provide email and password' });
  }

  const user = await User.findOne({ email })
  console.log("user from API", user)
  if (!user|| !(password == user.password))
  {
    // alert("Invalid email or password");
    return NextResponse.json({ error: 'Invalid email or password' })
  }
  console.log("user from API down", user)
  console.log(user)
  return NextResponse.json({user,  message: 'User logged in successfully'});
}
