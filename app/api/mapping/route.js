import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import Mapping from "@/lib/models/mapping";
import { connectionStr } from "@/lib/db"; 

mongoose.connect(connectionStr)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

export async function POST(req, res) {
    try {
        const { longUrl, shortUrl } = await req.json();
        console.log("from mapping: ", longUrl, shortUrl);
        const map1 = new Mapping(
            {
            longUrl: longUrl,
            shortUrl: shortUrl
        });

        const result = await map1.save();
        return NextResponse.json({ result, success: true });
    } 
    catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.error(error);
    }
}
