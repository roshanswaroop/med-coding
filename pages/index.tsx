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
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  /* Router to navigate between pages*/
  const router = useRouter();

  const promptBeginning = `You are a medical coder. You must identify all correct ICD-10 codes for the following patient record. Be as specific as possible. 
  Return your answer in the following format: T81.530, E09.52, L89.213`;

  // general function to handle code inference
  const generateCodes = async (e: any) => {
    e.preventDefault();
    setIsFileUploaded(false);
    setLoading(true);
    let icdResults = "";
    
    // function to process the note
    const processNote = async (note: string) => {
      const prompt = promptBeginning + "\n" + note;
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error(response.statusText);
  
      const data = await response.text();
      return data;
    };
    
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        if (!evt.target || !evt.target.result) {
          console.error('No file content found');
          return;
        }
        setIsFileUploaded(true); 
        const note = evt.target.result as string;
        icdResults = await processNote(note);
        if (icdResults) {
          router.push({
            pathname: '/[codes]',
            query: { codes: icdResults, note },
          });
        } else {
          throw new Error("NO CODES FOUND");
        }
        setLoading(false);
      };
      reader.readAsText(file);
    } else {
      icdResults = await processNote(clinicalNote);
      if (icdResults) {
        router.push({
          pathname: '/[codes]',
          query: { codes: icdResults, note: clinicalNote },
        });
      } else {
        throw new Error("NO CODES FOUND");
      }
      setLoading(false);
    }
  };
  
  // const generateCodes = async (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   var icdResults = "";

  //   const prompt = promptBeginning + "\n" + clinicalNote;
  //   const response = await fetch("/api/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       prompt,
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }

  //   // This data is a ReadableStream
  //   const data = response.body;
  //   if (!data) {
  //     return;
  //   }

  //   const reader = data.getReader();
  //   const decoder = new TextDecoder();
  //   let done = false;

  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read();
  //     done = doneReading;
  //     const chunkValue = decoder.decode(value);
  //     icdResults = icdResults + chunkValue;
  //   }

  //   setLoading(false);
  //   if (icdResults == "") {
  //     throw new Error("NO CODES FOUND");
  //   }
  //   else {
  //     router.push({
  //       pathname: '/[codes]',
  //       query: {
  //         codes: icdResults,
  //         note: clinicalNote
  //       }
  //     });
  //   }
  // };
  //   const handleFileUpload = (e) => {
  //     const files = e.target.files;
  //     console.log(files);
      
  //   // Process the uploaded files here
  //   // For example, you can read the content of the files or send them to your API
  // };

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
              Upload your clinical note {" "}
              <span className="text-slate-500">
                (.txt)
              </span>
              .
            </p>
          </div>
          <div className="mt-4">
            <input
              type="file"
              id="fileInput"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                  setIsFileUploaded(true);
                }

              }}
              multiple
              accept=".txt"
              hidden
            />
            <button
              onClick={() => document.getElementById("fileInput")?.click()}
              className="bg-black rounded-xl text-white font-medium px-4 py-3 hover:bg-black/80 w-1/2"
            >
              Upload
            </button>
            {isFileUploaded && ( 
            <div className="alert alert-success mt-4">
              <p style={{ color: '#32CD32' }}>File has been successfully uploaded!</p>
            </div>
          )}
          </div>
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/2-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Alternatively, input a clinical note {" "}
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