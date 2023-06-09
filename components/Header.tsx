import Image from "next/image";
import Link from "next/link";
import Account from "./Accounts";
import { Session } from "@supabase/supabase-js";
import Popup from 'reactjs-popup';
import React, { useState } from 'react';


export default function Header({ session }: { session: Session }) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClosePopup = () => {
    setIsOpen(false);
  };


  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/patient.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          REMA
        </h1>
      </Link>
      <a
        target="_blank"
        rel="noreferrer"
      >
        <button className="clear-button" onClick={() => setIsOpen(true)}>
          <Image
            alt="Profile Icon"
            src="/profile.png"
            width={55}
            height={50}
          />      </button>
        <Popup className="popup-container" open={isOpen} onClose={() => setIsOpen(false)} >
          <div>
            <Account session={session} onClose={handleClosePopup}/>
          </div>
        </Popup>
      </a>
    </header>
  );
}
