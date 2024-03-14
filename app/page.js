'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Analysis from '../app/analysis/page'
import { RxCross1 } from "react-icons/rx";
import { TbChartInfographic } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation"
import Signup from "./signup/page";

export default function Home() {

  const router = useRouter();
  
  useEffect(() => {
    router.push('/login');
    fetchData();
  }, []);
  
  const [longUrl, setLongUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/getdata', { cache: 'force-cache' });
      setShortUrls(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };


  const onCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shorten", { longUrl });
      const shortUrl = response.data.shortUrl;
      setShortUrls([...shortUrls, { longUrl, shortUrl }]);
    } catch (error) {
      console.error("Error in creating short URL:", error);
    }
  };

  const onDelete = async (_id) => {
    const response = await axios.delete(`/api/delete/${_id}`)
    console.log(_id)
    const data = await response.json();
    console.log(data);
    fetchData();
  }



  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  return (
    <main className="min-h-screen">
      <section className="px-12 mx-auto">
        <div className="pl-[50px] flex gap-[35px] flex-col flex-center items-center">
          <h1 className="text-5xl font-bold mt-36">URL Shortener</h1>
          <div className="flex justify-center lg:pl-32 pr-10 w-full mt-32">
            <input className="w-1/2 text-black p-3 mr-8" type="text" placeholder="Enter long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
            <button className="w-1/6 bg-[#ff7c00] hover:transition duration-500 hover:bg-[#ffa000] font-bold" onClick={onCreate}> Make it short </button>
          </div>
          <ul className="w-full lg:pl-24">
            {shortUrls.map((item) => (
              <li key={item._id}>
                <div className="flex flex-row justify-center items-center text-white w-full mb-2">
                  <div className="flex flex-row justify-between w-1/2 bg-white/5 p-5">
                    <div className="w-1/2">
                      <a className="text-white" target="_blank" href={item.longUrl}> rs.{item.shortUrl} </a>
                    </div>
                    <div className="flex justify-around items-center w-1/5">
                      <div>
                        <button onClick={() => copyText(`rs.${item.shortUrl}`)}><MdOutlineContentCopy className="w-[24px] h-[24px]" /> </button>
                      </div>
                      <div className="flex items-center">
                        <Link href="/analysis"><TbChartInfographic className="w-[24px] h-[24px]" /></Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <button onClick={() => onDelete(item._id)}><RxCross1 className="text-white font-bold w-[24px] h-[24px]" /> </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}