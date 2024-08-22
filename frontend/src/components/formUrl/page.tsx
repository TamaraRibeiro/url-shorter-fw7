"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpLeft, ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

export function FormURL() {
  const [shortUrl, setShortUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const copylink = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert('Copied to clipboard!');
    });
  };
  async function submitUrl(url: string) {
    try {
      const res = await fetch("http://localhost:3333/createUrl", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      setShortUrl(data.shortURL);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  function goToHome() {
    window.location.reload();
    setNewUrl("");
  }

  return (
    <div className="w-screen border border-zinc-600/20 rounded-xl shadow-lg shadow-zinc-800 text-center py-8 px-10 max-w-screen-md max-h-screen">
      <div className="py-3 mb-8">
        <Image
          className="mx-auto shadow-md rounded-md p-2 border border-zinc-950/30"
          src={"logo.svg"}
          alt="logo"
          width={300}
          height={300}
        />
      </div>

      <div className="border border-zinc-700 rounded-2xl shadow-lg py-10 px-4 flex flex-col gap-8">
        {!shortUrl ? (
          <>
            <div>
              <h1 className="font-semibold md:text-lg">
                Simply shorten a long URL by typing it below!
              </h1>
            </div>
            <div>
              <h1 className="md:text-lg mb-3 font-semibold">
                Paste your URL here:
              </h1>
              <input
                className="border border-zinc-700 rounded-md shadow-zinc-800 p-2 bg-zinc-500/15 outline-none max-w-56 md:max-w-60"
                type="text"
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
            <button
              onClick={() => submitUrl(newUrl)}
              className="bg-violet-500/60 hover:bg-violet-600/60 mx-auto py-2 px-6 text-center text-zinc-800 border border-zinc-800/80 font-bold md:text-lg rounded-lg transition-all ease-in-out duration-300 flex gap-1 items-center justify-center"
            >
              Shorten <ArrowUpRight className="size-4 md:size-5" />{" "}
            </button>
          </>
        ) : (
          <>
            <h1 className="font-semibold md:text-lg">
              Here is your shortened URL!
            </h1>
            <div className="border border-zinc-700 rounded-md shadow-zinc-800 p-2 bg-zinc-500/15 mx-auto flex items-center justify-between px-4 gap-5 max-w-60 md:max-w-72">
              <p id="urlInputText" className="md:text-lg">
                {shortUrl}
              </p>
              <button onClick={copylink}>
                <Copy
                  className="hover:text-violet-600 transition ease-in-out duration-200 size-4 md:size-5"
                />
              </button>
            </div>
            <button
              onClick={() => goToHome()}
              className="bg-violet-500/60 hover:bg-violet-600/60 mx-auto py-2 px-6 text-center text-zinc-800 border border-zinc-800/80 font-bold md:text-lg rounded-lg transition-all ease-in-out duration-300 flex gap-1 items-center justify-center"
            >
              <ArrowLeft className="size-4 md:size-5" /> Shorten a new URL
            </button>
          </>
        )}
      </div>
    </div>
  );
}
