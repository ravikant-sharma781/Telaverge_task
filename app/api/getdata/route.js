import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { connectionStr } from "@/lib/db"; 
import Mapping from "@/lib/models/mapping";

mongoose.connect(connectionStr)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

export async function GET() {
    try {
        const data = await Mapping.find();
        console.log("Retrieved data from MongoDB Atlas:", data);
        return NextResponse.json({ result: data });
    
    } catch (error) {
        return NextResponse.error("Error connecting to MongoDB Atlas", 500);
    }
}