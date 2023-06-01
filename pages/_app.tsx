import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/icd-codes.css";
import "../styles/custom-styles.css";
import '../styles/supabase-globals.css'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
      <Analytics />
    </SessionContextProvider>
  );
}

export default MyApp;