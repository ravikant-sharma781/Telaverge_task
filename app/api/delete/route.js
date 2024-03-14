import mongoose from 'mongoose';
import { connectionStr } from "@/lib/db";
import Mapping from "@/lib/models/mapping";
import { NextRequest, NextResponse } from 'next/server';

mongoose.connect(connectionStr)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

export async function DELETE(req, res) {
    try {
        const { _id } = req.query;
        console.log("from delete ID: ", _id)
        const deletedMapping = await Mapping.findByIdAndDelete(_id);
        if (!deletedMapping) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }
        console.log("Deleted record from MongoDB:", deletedMapping);
        return NextResponse.json({ message: "Record deleted successfully" });
    }
    catch (error) {
        console.log(error);
    }
}