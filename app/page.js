'use client'
import React, { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import Analysis from '../app/analysis/page'
import { RxCross1 } from "react-icons/rx";
import { TbChartInfographic } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  const [longUrl, setLongUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  console.log(shortUrls);
  // window.localStorage.setItem('isLoggedin', false);
  // console.log("value aagai", localStorage.getItem("isLoggedin"));

  useEffect(() => {
    fetchData();
    const isLoggedIn = localStorage.getItem("isLoggedin");
    if (!isLoggedIn || isLoggedIn !== "true") {
      router.push('/login');
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/getdata');
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
      const res = await axios.post("/api/mapping", { longUrl, shortUrl });
      setShortUrls([...shortUrls, { longUrl, shortUrl }]);
    } catch (error) {
      console.error("Error in creating short URL:", error);
    }
  };

  const onDelete = async (_id) => {
    try {
      console.log(_id);
      const response = await axios.delete("/api/delete", { data: { _id } });
      fetchData();
      {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


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
          <h1 className="text-5xl font-bold mt-32">URL Shortener</h1>
          <div className="flex justify-center lg:pl-32 pr-10 w-full mt-32">
            <input type="url" className="w-1/2 text-black p-3 mr-8" placeholder="Enter long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
            <button className="w-1/6 bg-[#ff7c00] hover:transition duration-500 hover:bg-[#ffa000] font-bold" onClick={onCreate}> Make it short </button>
          </div>
          <ul className="w-full lg:pl-24 flex flex-col-reverse">
            {shortUrls ? shortUrls.map((item) => (
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
            )) : null}
          </ul>
        </div>
      </section>
    </main>
  );
}
