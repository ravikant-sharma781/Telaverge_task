import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const { longUrl } = await req.json();

        if (!longUrl || longUrl.length <= 0) {
            return NextResponse.json({ error: "Error: URL not set." }, { status: 400 });
        }
        else {
            const shortUrl = makeShortUrl();
            console.log("Shortened Url:", shortUrl);
            return NextResponse.json({ shortUrl }, { status: 200 })
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

const makeShortUrl = () => {
    var length = 6;
    var result = "";
    var charactors = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactorsLength = charactors.length;
    for (var i = 0; i < length; i++) {
        result += charactors.charAt(Math.floor(Math.random() * charactorsLength))
    }

    return result;
}