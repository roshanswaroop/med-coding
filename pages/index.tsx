import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Link from 'next/link';
import { useRouter } from "next/router";

const Home: NextPage = () => {
  /* State variables that store user input and GPT-3 results */ 
  const [loading, setLoading] = useState(false);
  const [clinicalNote, setClinicalNote] = useState("");
  const [apiKey, setApiKey] = useState("");

  /* Router to navigate between pages*/
  const router = useRouter();

  const promptBeginning = `You are a medical coder. Your job is to translate the following diagnosis note into the correct ICD-10 billing codes. 
  You must also provide an explanation as to why each code is correct based on the provided diagnosis.
  Return your answer in the following format: 
  Code: T81.530A
  Explanation: this patient visit is an initial encounter for perforation due to foreign body accidentally left in body following surgical operation.
  Code: H66.92
  Explanation: the patient was treated for otitis media in the left ear.
  Here is the diagnosis you should analyze: `


  const generateCodes = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    var icdResults = "";

    const prompt = promptBeginning + "\n" + clinicalNote;
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      icdResults = icdResults + chunkValue;
    }

    setLoading(false);
    if (icdResults == "") {
      throw new Error("NO CODES FOUND");
    }
    else {
      router.push({
        pathname: '/[codes]',
        query: {
          codes: icdResults,
          note: clinicalNote
        }
      });
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>AI for Medical Coding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Automate medical coding using GPT
        </h1>
        <p className="text-slate-500 mt-5">Works with the latest ICD-10 codes.</p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Enter your clinical notes {" "}
              <span className="text-slate-500">
                (no special formatting necessary)
              </span>
              .
            </p>
          </div>
          <textarea
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "Copy and paste the clinical note here. Please limit notes to 2000 characters."
            }
          />
          {!loading && (
              <button onClick={(e) => generateCodes(e)} className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full">
                Generate ICD-10 codes &rarr;
              </button>
          )}
          {loading && (
            <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled>
              <LoadingDots color="white" style="large" />
              </button>
          )}
        </div>
      </main>
    </div> 
  );
};

export default Home;